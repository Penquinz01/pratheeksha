import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client";
import FieldInput, { humanize } from "./FieldInput";

const LIST_COLUMN_LIMIT = 6;

// Generic list+form for a tracking table scoped to one foreign key value
// (a family's prfml_id or a dependent's dpid). The filter column is injected
// into every create payload and hidden from the form -- callers never see it.
export default function RelatedRecordsPanel({ table, filterValue }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null | "new" | row
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const params = { [table.filterColumn]: filterValue, limit: 500 };
      setItems(await api(table.path, { params }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [table, filterValue]);

  useEffect(() => { load(); }, [load]);

  const save = async (values) => {
    const payload = { ...values, [table.filterColumn]: filterValue };
    if (editing === "new") {
      await api(table.path, { method: "POST", body: payload });
    } else {
      await api(`${table.path}${editing[table.pk]}`, { method: "PATCH", body: payload });
    }
    setEditing(null);
    await load();
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete this ${table.title.toLowerCase()} record?`)) return;
    try {
      await api(`${table.path}${row[table.pk]}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (editing) {
    return (
      <RecordForm
        table={table}
        initial={editing === "new" ? null : editing}
        onSubmit={save}
        onCancel={() => setEditing(null)}
      />
    );
  }

  const listFields = table.fields.slice(0, LIST_COLUMN_LIMIT);

  return (
    <div>
      <div className="panel-header">
        <button type="button" onClick={() => setEditing("new")}>+ Add {table.title}</button>
      </div>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="center-note">Loading…</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {listFields.map((fld) => <th key={fld.name}>{fld.label ?? humanize(fld.name)}</th>)}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row[table.pk]}>
                  {listFields.map((fld) => <td key={fld.name}>{row[fld.name] ?? ""}</td>)}
                  <td className="row-actions">
                    <button type="button" className="link" onClick={() => setEditing(row)}>edit</button>
                    <button type="button" className="link danger" onClick={() => remove(row)}>delete</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={listFields.length + 1} className="empty">No records yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RecordForm({ table, initial, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => {
    const v = {};
    for (const fld of table.fields) v[fld.name] = initial?.[fld.name] ?? "";
    return v;
  });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const payload = {};
    for (const fld of table.fields) {
      const raw = values[fld.name];
      if (raw === "" || raw == null) {
        payload[fld.name] = null;
      } else if (fld.type === "number") {
        payload[fld.name] = Number(raw);
      } else {
        payload[fld.name] = raw;
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
    <form className="record-form" onSubmit={submit}>
      <h3>{initial ? `Edit ${table.title}` : `New ${table.title}`}</h3>
      <div className="form-grid">
        {table.fields.map((fld) => (
          <FieldInput
            key={fld.name}
            field={fld}
            value={values[fld.name]}
            onChange={(v) => setValues((prev) => ({ ...prev, [fld.name]: v }))}
          />
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
