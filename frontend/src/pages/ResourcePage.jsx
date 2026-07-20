import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client";
import ResourceForm from "../components/ResourceForm";

const PAGE_SIZE = 25;
const MAX_TABLE_COLUMNS = 8;

export default function ResourcePage({ resource }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [editing, setEditing] = useState(null); // null | "new" | row object
  const [error, setError] = useState(null);

  const columns = resource.columns.slice(0, MAX_TABLE_COLUMNS);

  const load = useCallback(async () => {
    setError(null);
    try {
      const params = { skip: page * PAGE_SIZE, limit: PAGE_SIZE };
      if (filterColumn && filterValue !== "") params[filterColumn] = filterValue;
      setItems(await api(resource.path, { params }));
    } catch (err) {
      setError(err.message);
    }
  }, [resource.path, page, filterColumn, filterValue]);

  useEffect(() => {
    setPage(0);
    setEditing(null);
    setFilterColumn("");
    setFilterValue("");
  }, [resource.key]);

  useEffect(() => { load(); }, [load]);

  const save = async (payload) => {
    if (editing === "new") {
      await api(resource.path, { method: "POST", body: payload });
    } else {
      await api(`${resource.path}${editing[resource.pk]}`, { method: "PATCH", body: payload });
    }
    setEditing(null);
    await load();
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete ${resource.title} #${row[resource.pk]}?`)) return;
    try {
      await api(`${resource.path}${row[resource.pk]}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (editing) {
    return (
      <ResourceForm
        resource={resource}
        initial={editing === "new" ? null : editing}
        onSubmit={save}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>{resource.title}</h2>
        <button onClick={() => setEditing("new")}>+ Add</button>
      </div>

      <div className="filter-bar">
        <select value={filterColumn} onChange={(e) => setFilterColumn(e.target.value)}>
          <option value="">Filter by…</option>
          {resource.columns.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          placeholder="exact value"
          value={filterValue}
          disabled={!filterColumn}
          onChange={(e) => { setFilterValue(e.target.value); setPage(0); }}
        />
        {filterColumn && (
          <button className="secondary" onClick={() => { setFilterColumn(""); setFilterValue(""); }}>Clear</button>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((c) => <th key={c}>{c}</th>)}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row[resource.pk]}>
                {columns.map((c) => <td key={c}>{row[c] ?? ""}</td>)}
                <td className="row-actions">
                  <button className="link" onClick={() => setEditing(row)}>edit</button>
                  <button className="link danger" onClick={() => remove(row)}>delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="empty">No records</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pager">
        <button className="secondary" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>‹ Prev</button>
        <span>Page {page + 1}</span>
        <button className="secondary" disabled={items.length < PAGE_SIZE} onClick={() => setPage((p) => p + 1)}>Next ›</button>
      </div>
    </div>
  );
}
