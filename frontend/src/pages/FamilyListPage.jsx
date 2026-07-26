import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { CONTACT_MASTER } from "../config/tables";

// The backend only supports exact-match filtering, so search across
// name/mobile/address/PID is done client-side over the full contact list
// (187 rows today, well under the router's 500-row cap).
export default function FamilyListPage() {
  const navigate = useNavigate();
  const [families, setFamilies] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      setFamilies(await api(CONTACT_MASTER.path, { params: { limit: 500 } }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? families.filter((fam) =>
        [fam.fullname, fam.mobile, fam.address, fam.idx_id]
          .some((v) => v != null && String(v).toLowerCase().includes(q))
      )
    : families;

  return (
    <div>
      <div className="page-header">
        <h2>Families</h2>
        <button onClick={() => navigate("/families/new")}>+ Add Family</button>
      </div>

      <div className="filter-bar">
        <input
          placeholder="Search by name, mobile, address, or PID…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="center-note">Loading…</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Category</th>
                <th>Approved</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((fam) => (
                <tr key={fam.prfml_id} className="clickable" onClick={() => navigate(`/families/${fam.prfml_id}`)}>
                  <td>{fam.fullname}</td>
                  <td>{fam.mobile}</td>
                  <td>{fam.address}</td>
                  <td>{fam.pr_category}</td>
                  <td>{fam.approved}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="empty">No families found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
