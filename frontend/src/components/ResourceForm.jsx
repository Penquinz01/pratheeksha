import { useState } from "react";

function inputType(field) {
  if (field.format === "date") return "date";
  if (field.type === "integer" || field.type === "number") return "number";
  return "text";
}

// One form for both create and edit, generated from the resource's fields.
export default function ResourceForm({ resource, initial, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => {
    const v = {};
    for (const f of resource.fields) v[f.name] = initial?.[f.name] ?? "";
    return v;
  });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const payload = {};
    for (const f of resource.fields) {
      const raw = values[f.name];
      if (raw === "" || raw == null) {
        payload[f.name] = null;
      } else if (f.type === "integer") {
        payload[f.name] = parseInt(raw, 10);
      } else if (f.type === "number") {
        payload[f.name] = parseFloat(raw);
      } else {
        payload[f.name] = raw;
      }
    }
    try {
      await onSubmit(payload);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <form className="resource-form" onSubmit={submit}>
      <h2>{initial ? `Edit ${resource.title} #${initial[resource.pk]}` : `New ${resource.title}`}</h2>
      <div className="form-grid">
        {resource.fields.map((f) => (
          <label key={f.name}>
            {f.name}{f.required ? " *" : ""}
            <input
              type={inputType(f)}
              value={values[f.name] ?? ""}
              required={f.required}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
            />
          </label>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      <div className="form-actions">
        <button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</button>
        <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
