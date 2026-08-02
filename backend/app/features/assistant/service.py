"""Gemini call layer for the read-only database assistant.

The model never sees SQL and never writes any. It picks one of the functions in
tools.py; the SDK executes it and feeds the result back, looping until the model
has an answer. What it actually queried is captured in ToolContext.calls and
returned alongside the answer so the UI can show the filter behind a number.
"""
import logging

from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.grades import STUDYING_STATUSES, all_group_labels
from app.features.assistant.tools import ToolContext, build_tools

logger = logging.getLogger("uvicorn.error")

SYSTEM_INSTRUCTION = f"""
You answer questions about the Pratheeksha Foundation's beneficiary database for
the foundation's own staff, inside their admin panel.

You have read-only access through a fixed set of functions. You cannot create,
change, approve, or delete anything. If asked to, say plainly that you can only
read, and suggest the admin does it on the family's page.

Rules that matter more than fluency:

1. Never answer a factual question about the data from memory or inference. Call
   a function. If no function can answer it, say so rather than estimating.
2. Never guess how a value is spelled in the database. The data was typed by
   hand over many years. Call distinct_values first when unsure.
3. Grades are the sharpest trap. 11th and 12th are recorded as "+1" and "+2",
   and 10th is often "SSLC" -- a search for "12th" matches nothing. Always use
   count_students_by_grade, list_students_in_grade or grade_breakdown, passing
   the user's own words. Never filter grades yourself.
   Grade groups: {", ".join(all_group_labels())}.
4. "Studying" means edu_status is one of {STUDYING_STATUSES}. The grade functions
   default to this. If the user asks about everyone with a grade on record
   regardless of whether they still study, pass studying_only=False.
5. Report what the function returned. If a result says truncated, say the list is
   partial and give the total. Never pad a list from your own knowledge.
6. Identity and banking details (Aadhaar, election ID, ration card, bank account,
   GPay, salary) are not available to you. If asked, say they are not accessible
   here rather than implying they don't exist.

These are real families in Wayanad. Be plain and concrete. Give the number
first, then the detail. Keep answers short unless asked to expand.
""".strip()


class AssistantUnavailable(RuntimeError):
    """Raised when the assistant cannot run (missing key or SDK)."""


def _client():
    settings = get_settings()
    if not settings.gemini_api_key:
        raise AssistantUnavailable(
            "GEMINI_API_KEY is not set. Add it to backend/.env to enable the assistant."
        )
    try:
        from google import genai
    except ImportError as exc:  # pragma: no cover - depends on install
        raise AssistantUnavailable(
            "The google-genai package is not installed. Run: pip install -r requirements.txt"
        ) from exc
    return genai.Client(api_key=settings.gemini_api_key)


def _to_contents(history: list[dict], question: str) -> list[dict]:
    """Build the Gemini contents list.

    Sent as plain dicts rather than constructed types: the SDK validates them
    into the right models, and there is one less API surface to track.
    """
    contents: list[dict] = []
    for turn in history:
        role = "model" if turn.get("role") == "assistant" else "user"
        text = (turn.get("content") or "").strip()
        if text:
            contents.append({"role": role, "parts": [{"text": text}]})
    contents.append({"role": "user", "parts": [{"text": question}]})
    return contents


def ask(db: Session, question: str, history: list[dict] | None = None) -> dict:
    """Answer one question. Returns the text plus the queries that produced it."""
    settings = get_settings()
    # _client() first: it turns a missing key or a missing package into a clear
    # AssistantUnavailable, which the router reports as 503 rather than a
    # bare ImportError from the line below.
    client = _client()
    from google.genai import types

    ctx = ToolContext(db=db)

    response = client.models.generate_content(
        model=settings.gemini_model,
        contents=_to_contents(history or [], question),
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION,
            tools=build_tools(ctx),
            automatic_function_calling=types.AutomaticFunctionCallingConfig(
                maximum_remote_calls=settings.assistant_max_tool_calls,
            ),
            temperature=0,
        ),
    )

    answer = (response.text or "").strip()
    if not answer:
        # A tool-call loop that ends without text, or a safety stop.
        answer = (
            "I couldn't produce an answer for that. Try rephrasing, or ask for a "
            "narrower slice of the data."
        )

    return {"answer": answer, "queries": ctx.calls}
