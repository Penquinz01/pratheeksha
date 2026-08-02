"""Read-only assistant endpoint.

Mounted automatically by discover_feature_routers() in main.py. Sits behind the
same JWT dependency as every other router, so an unauthenticated caller cannot
reach the data through the chat window either.
"""
import logging

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.auth.deps import get_current_user
from app.core.database import get_db
from app.features.assistant.service import AssistantUnavailable, ask

logger = logging.getLogger("uvicorn.error")

router = APIRouter(
    prefix="/assistant",
    tags=["Assistant"],
    dependencies=[Depends(get_current_user)],
)


class Turn(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str


class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=2000)
    # Trimmed client-side; capped here so a crafted payload can't blow up cost.
    history: list[Turn] = Field(default_factory=list, max_length=20)


class QueryRecord(BaseModel):
    tool: str
    filters: dict
    results: int | None = None


class ChatResponse(BaseModel):
    answer: str
    queries: list[QueryRecord]


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest, db: Session = Depends(get_db)):
    try:
        result = ask(
            db,
            payload.question,
            [turn.model_dump() for turn in payload.history],
        )
    except AssistantUnavailable as exc:
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, str(exc)) from exc
    except Exception as exc:  # noqa: BLE001 - surface a usable message, log the rest
        logger.exception("Assistant request failed")
        raise HTTPException(
            status.HTTP_502_BAD_GATEWAY,
            f"The assistant could not complete that request: {type(exc).__name__}",
        ) from exc
    return result


@router.get("/status")
def assistant_status():
    """Whether the assistant is configured, so the UI can hide the panel."""
    from app.core.config import get_settings

    return {"enabled": bool(get_settings().gemini_api_key)}
