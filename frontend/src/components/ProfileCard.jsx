import { useEffect, useState } from "react";
import FieldInput from "./FieldInput";
import Badge from "./Badge";
import { initials } from "../lib/text";
import { collectErrors } from "../lib/validate";

function valuesFrom(table, record) {
  const v = {};
  for (const section of table.sections) {
    for (const fld of section.fields) v[fld.name] = record?.[fld.name] ?? "";
  }
  return v;
}

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
  extraActions,
  onSave,
  onDelete,
}) {
  const [editing, setEditing] = useState(isNew);
  const [values, setValues] = useState(() => valuesFrom(table, record));
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const allFields = table.sections.flatMap((s) => s.fields);

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's complaint as soon as it is touched, rather than nagging
    // while the user is still typing.
    setFieldErrors((prev) => (name in prev ? { ...prev, [name]: undefined } : prev));
  };

  // Re-seed from the record whenever it changes while not editing. Without
  // this, a field changed outside the form (the Approve button) would keep its
  // stale mount-time value here and get written back on the next Save. It also
  // makes Cancel genuinely discard edits rather than leave them staged.
  useEffect(() => {
    if (editing) return;
    setValues(valuesFrom(table, record));
  }, [record, table, editing]);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const invalid = collectErrors(allFields, values);
    if (Object.keys(invalid).length > 0) {
      setFieldErrors(invalid);
      const n = Object.keys(invalid).length;
      setError(`Fix ${n} field${n > 1 ? "s" : ""} before saving.`);
      return;
    }
    setFieldErrors({});

    setBusy(true);
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
          {!editing && extraActions}
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
                  error={editing ? fieldErrors[fld.name] : undefined}
                  onChange={(v) => setField(fld.name, v)}
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
