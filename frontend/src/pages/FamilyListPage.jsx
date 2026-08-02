import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAll } from "../api/client";
import { CONTACT_MASTER } from "../config/tables";
import Badge, { approvalTone } from "../components/Badge";
import { initials } from "../lib/text";

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
      setFamilies(await fetchAll(CONTACT_MASTER.path));
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
        {query && (
          <button type="button" className="secondary" onClick={() => setQuery("")}>Clear</button>
        )}
      </div>

      {!loading && (
        <p className="list-count">
          {filtered.length === families.length
            ? `${families.length} families`
            : `${filtered.length} of ${families.length} families`}
        </p>
      )}

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="center-note">Loading…</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Family</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Category</th>
                <th>Approved</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((fam) => (
                <tr key={fam.prfml_id} className="clickable" onClick={() => navigate(`/families/${fam.prfml_id}`)}>
                  <td className="cell-td">
                    <div className="cell-primary">
                      <span className="avatar-placeholder sm">{initials(fam.fullname)}</span>
                      <span className="cell-text">
                        <span className="cell-name">{fam.fullname}</span>
                        {fam.known_as && <span className="cell-sub">{fam.known_as}</span>}
                      </span>
                    </div>
                  </td>
                  <td>{fam.mobile}</td>
                  <td>{fam.address}</td>
                  <td>{fam.pr_category ? <Badge>{fam.pr_category}</Badge> : ""}</td>
                  <td>{fam.approved ? <Badge tone={approvalTone(fam.approved)}>{fam.approved}</Badge> : ""}</td>
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
