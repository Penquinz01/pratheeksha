import { useState } from "react";
import FieldInput from "./FieldInput";

function initials(name) {
  if (!name) return "?";
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}

// Sectioned Edit/Save profile form shared by the family and dependent profile
// pages. `table` provides `.sections` (groups of fields); `record` is the
// existing row or null for a brand-new one (which starts in edit mode).
export default function ProfileCard({ table, record, isNew, avatarSource, onSave, onDelete }) {
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

  return (
    <form className="profile-card" onSubmit={submit}>
      <div className="profile-card-top">
        {avatarSource !== undefined && (
          <div className="avatar-placeholder">{initials(avatarSource)}</div>
        )}
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
      </div>

      {error && <p className="error">{error}</p>}

      {table.sections.map((section) => (
        <div className="section" key={section.title}>
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
        </div>
      ))}
    </form>
  );
}
