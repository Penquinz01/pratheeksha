import { useEffect, useRef, useState } from "react";
import { api } from "../api/client";

// Turns kept client-side and sent back with each question. The endpoint caps
// history at 20, so trim here rather than have the server reject the request.
const MAX_HISTORY = 20;

const SUGGESTIONS = [
  "How many students are in 12th?",
  "Break down students by grade",
  "Which families are in Meppadi?",
  "How many families are not approved?",
];

// The assistant reports the filter behind every number. Showing it is the point:
// an admin can check "grade group 12th (+2), studying only" against what they
// asked; they cannot check a sentence.
function QueryTrace({ queries }) {
  if (!queries?.length) return null;
  return (
    <ul className="assistant-trace">
      {queries.map((q, i) => (
        <li key={i}>
          <code>{q.tool}</code>
          {Object.entries(q.filters || {}).map(([k, v]) => (
            <span key={k} className="assistant-filter">
              {k}: {String(v)}
            </span>
          ))}
          {q.results != null && (
            <span className="assistant-filter results">{q.results} row(s)</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function AssistantPanel({ open, onClose }) {
  const [enabled, setEnabled] = useState(null); // null = not checked yet
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open || enabled !== null) return;
    api("/assistant/status")
      .then((r) => setEnabled(Boolean(r.enabled)))
      .catch(() => setEnabled(false));
  }, [open, enabled]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, busy]);

  // Escape closes, matching the rest of the admin's dismissable surfaces.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function send(text) {
    const q = (text ?? question).trim();
    if (!q || busy) return;
    setError("");
    setQuestion("");
    const history = messages
      .slice(-MAX_HISTORY)
      .map(({ role, content }) => ({ role, content }));
    setMessages((m) => [...m, { role: "user", content: q }]);
    setBusy(true);
    try {
      const res = await api("/assistant/chat", {
        method: "POST",
        body: { question: q, history },
      });
      setMessages((m) => [
        ...m,
        { role: "assistant", content: res.answer, queries: res.queries },
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <>
      <div className="assistant-scrim" onClick={onClose} />
      <aside className="assistant-panel" aria-label="Database assistant">
        <header className="assistant-head">
          <div>
            <strong>Ask the database</strong>
            <span className="assistant-sub">Read-only &middot; cannot change records</span>
          </div>
          <button className="link" onClick={onClose} aria-label="Close assistant">
            Close
          </button>
        </header>

        <div className="assistant-log">
          {enabled === false && (
            <p className="assistant-empty">
              The assistant is not configured. Add <code>GEMINI_API_KEY</code> to
              the backend environment to enable it.
            </p>
          )}

          {enabled && messages.length === 0 && (
            <div className="assistant-empty">
              <p>Ask about families, students, or grades. Answers come from the
                live database, with the filter used shown underneath.</p>
              <div className="assistant-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="secondary" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`assistant-msg ${m.role}`}>
              <div className="assistant-bubble">{m.content}</div>
              {m.role === "assistant" && <QueryTrace queries={m.queries} />}
            </div>
          ))}

          {busy && (
            <div className="assistant-msg assistant">
              <div className="assistant-bubble thinking">Checking the database…</div>
            </div>
          )}
          {error && <p className="assistant-error">{error}</p>}
          <div ref={endRef} />
        </div>

        <form
          className="assistant-input"
          onSubmit={(e) => { e.preventDefault(); send(); }}
        >
          <input
            ref={inputRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the data…"
            disabled={busy || enabled === false}
            aria-label="Question"
          />
          <button type="submit" disabled={busy || !question.trim() || enabled === false}>
            Ask
          </button>
        </form>
      </aside>
    </>
  );
}
