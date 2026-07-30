import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { DEPENDENT_MASTER } from "../config/tables";
import FieldInput from "./FieldInput";

const QUICK_FIELDS = [
  { name: "fullname", label: "Full Name" },
  { name: "gender", type: "enum", optionsKey: "gender" },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "relation", type: "enum", optionsKey: "relation" },
  { name: "edu_status", label: "Edu. Status", type: "enum", optionsKey: "eduStatus" },
];

// The Dependents tab on a family's profile: a list of that family's
// dependents (clicking one opens its own profile page) plus a quick-add form
// that pre-fills prfml_id and a suggested prfml_dpid before handing off to
// the dependent's full profile for further editing.
export default function DependentsTab({ prfmlId, idxId }) {
  const navigate = useNavigate();
  const [dependents, setDependents] = useState([]);
  const [adding, setAdding] = useState(false);
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setDependents(await api(DEPENDENT_MASTER.path, { params: { prfml_id: prfmlId, limit: 500 } }));
  }, [prfmlId]);

  useEffect(() => { load(); }, [load]);

  const startAdding = () => {
    const nextN = dependents.length + 1;
    setValues({ prfml_dpid: `${idxId ?? prfmlId}_DP${nextN}` });
    setAdding(true);
    setError(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const payload = { ...values, prfml_id: prfmlId };
      for (const fld of QUICK_FIELDS) if (!(fld.name in payload)) payload[fld.name] = values[fld.name] || null;
      const created = await api(DEPENDENT_MASTER.path, { method: "POST", body: payload });
      navigate(`/families/${prfmlId}/dependents/${created.dpid}`);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const remove = async (dep) => {
    if (!window.confirm(`Delete dependent "${dep.fullname ?? dep.dpid}"?`)) return;
    await api(`${DEPENDENT_MASTER.path}${dep.dpid}`, { method: "DELETE" });
    await load();
  };

  if (adding) {
    return (
      <form className="record-form" onSubmit={submit}>
        <h3>New Dependent</h3>
        <div className="form-grid">
          {QUICK_FIELDS.map((fld) => (
            <FieldInput
              key={fld.name}
              field={fld}
              value={values[fld.name]}
              onChange={(v) => setValues((prev) => ({ ...prev, [fld.name]: v }))}
            />
          ))}
          <FieldInput
            field={{ name: "prfml_dpid", label: "Dependent ID" }}
            value={values.prfml_dpid}
            onChange={(v) => setValues((prev) => ({ ...prev, prfml_dpid: v }))}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="submit" disabled={busy}>{busy ? "Saving…" : "Save & Continue"}</button>
          <button type="button" className="secondary" onClick={() => setAdding(false)}>Cancel</button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="panel-header">
        <button type="button" onClick={startAdding}>+ Add Dependent</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Relation</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Edu. Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dependents.map((dep) => (
              <tr key={dep.dpid} className="clickable" onClick={() => navigate(`/families/${prfmlId}/dependents/${dep.dpid}`)}>
                <td>{dep.relation}</td>
                <td>{dep.fullname}</td>
                <td>{dep.gender}</td>
                <td>{dep.dob}</td>
                <td>{dep.edu_status}</td>
                <td className="row-actions">
                  <button
                    type="button"
                    className="link danger"
                    onClick={(e) => { e.stopPropagation(); remove(dep); }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
            {dependents.length === 0 && (
              <tr><td colSpan={6} className="empty">No dependents yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
