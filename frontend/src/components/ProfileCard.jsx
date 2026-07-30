import { useState } from "react";
import FieldInput from "./FieldInput";
import Badge from "./Badge";
import { initials } from "../lib/text";

// Edit/Save profile form shared by the family and dependent pages. Renders a
// hero header (avatar, title, at-a-glance meta) followed by one card per field
// group from `table.sections`. `record` is the existing row, or null for a new
// one, which starts in edit mode.
export default function ProfileCard({
  table,
  record,
  isNew,
  title,
  subtitle,
  meta = [],
  avatarSource,
  onSave,
  onDelete,
}) {
  const [editing, setEditing] = useState(isNew);
  const [values, setValues] = useState(() => {
    const v = {};
    for (const section of table.sections) {
      for (const fld of section.fields) v[fld.name] = record?.[fld.name] ?? "";
    }
    return v;
  });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const payload = {};
    for (const section of table.sections) {
      for (const fld of section.fields) {
        const raw = values[fld.name];
        payload[fld.name] = raw === "" || raw == null
          ? null
          : fld.type === "number" ? Number(raw) : raw;
      }
    }
    try {
      await onSave(payload);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const shownMeta = meta.filter((m) => m.value != null && m.value !== "");

  return (
    <form className="profile" onSubmit={submit}>
      <header className="profile-hero">
        {avatarSource !== undefined && (
          <div className="avatar-placeholder lg">{initials(avatarSource)}</div>
        )}
        <div className="profile-hero-main">
          <h2>{title || "—"}</h2>
          {subtitle && <p className="profile-subtitle">{subtitle}</p>}
          {shownMeta.length > 0 && (
            <dl className="profile-meta">
              {shownMeta.map((m) => (
                <div className="meta-item" key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.tone ? <Badge tone={m.tone}>{m.value}</Badge> : m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="profile-card-actions">
          {!isNew && !editing && (
            <button type="button" onClick={() => setEditing(true)}>Edit</button>
          )}
          {editing && (
            <>
              <button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</button>
              {!isNew && (
                <button type="button" className="secondary" onClick={() => setEditing(false)}>Cancel</button>
              )}
            </>
          )}
          {!isNew && onDelete && (
            <button type="button" className="secondary danger" onClick={onDelete}>Delete</button>
          )}
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      <div className="section-stack">
        {table.sections.map((section) => (
          <section className="section-card" key={section.title}>
            <h3>{section.title}</h3>
            <div className="form-grid">
              {section.fields.map((fld) => (
                <FieldInput
                  key={fld.name}
                  field={fld}
                  value={values[fld.name]}
                  disabled={!editing}
                  onChange={(v) => setValues((prev) => ({ ...prev, [fld.name]: v }))}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Long forms: keep Save reachable without scrolling back to the hero. */}
      {editing && (
        <div className="sticky-actions">
          <button type="submit" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button>
          {!isNew && (
            <button type="button" className="secondary" onClick={() => setEditing(false)}>Cancel</button>
          )}
        </div>
      )}
    </form>
  );
}
