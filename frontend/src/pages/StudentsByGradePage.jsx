import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAll } from "../api/client";
import { CONTACT_MASTER, DEPENDENT_MASTER } from "../config/tables";
import { GRADE_GROUPS, OTHER_GROUP, STUDYING_STATUSES, gradeGroupKey } from "../config/grades";

// "Which families have a child in 10th / +2?" -- the API only does exact-match
// filtering on a single column, which can't fold "+2" together with
// "+2 Science" or count families. So both tables are fetched once and the
// grouping happens here; filtering afterwards is instant.
export default function StudentsByGradePage() {
  const navigate = useNavigate();
  const [dependents, setDependents] = useState(null);
  const [familiesById, setFamiliesById] = useState(new Map());
  const [selected, setSelected] = useState(null);
  const [studyingOnly, setStudyingOnly] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [deps, fams] = await Promise.all([
          fetchAll(DEPENDENT_MASTER.path),
          fetchAll(CONTACT_MASTER.path),
        ]);
        if (cancelled) return;
        setFamiliesById(new Map(fams.map((f) => [f.prfml_id, f])));
        setDependents(deps);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // One pass: keep only records that carry a grade (and, by default, only
  // people still studying), tagging each with its grade group.
  const tagged = useMemo(() => {
    if (!dependents) return [];
    return dependents
      .filter((d) => !studyingOnly || STUDYING_STATUSES.includes(d.edu_status))
      .map((d) => ({ ...d, groupKey: gradeGroupKey(d.inst_grade) }))
      .filter((d) => d.groupKey !== null);
  }, [dependents, studyingOnly]);

  const counts = useMemo(() => {
    const byGroup = new Map();
    for (const d of tagged) {
      if (!byGroup.has(d.groupKey)) byGroup.set(d.groupKey, { students: 0, families: new Set() });
      const entry = byGroup.get(d.groupKey);
      entry.students += 1;
      if (d.prfml_id != null) entry.families.add(d.prfml_id);
    }
    return byGroup;
  }, [tagged]);

  const rows = useMemo(() => {
    if (!selected) return [];
    return tagged
      .filter((d) => d.groupKey === selected)
      .map((d) => ({ ...d, family: familiesById.get(d.prfml_id) }))
      .sort((a, b) => (a.family?.fullname ?? "").localeCompare(b.family?.fullname ?? ""));
  }, [tagged, selected, familiesById]);

  if (error) return <p className="error">{error}</p>;
  if (!dependents) return <p className="center-note">Loading…</p>;

  const groups = [...GRADE_GROUPS, OTHER_GROUP].filter((g) => counts.has(g.key));
  const selectedGroup = groups.find((g) => g.key === selected);
  const selectedCount = selected ? counts.get(selected) : null;

  return (
    <div>
      <div className="page-header">
        <h2>Students by Grade</h2>
        <label className="inline-check">
          <input
            type="checkbox"
            checked={studyingOnly}
            onChange={(e) => setStudyingOnly(e.target.checked)}
          />
          Only currently studying
        </label>
      </div>

      <p className="hint">
        Counts below are families, not students. Note that 11th and 12th are recorded
        locally as “+1” and “+2”. Pick a grade to list the families.
      </p>

      <div className="grade-chips">
        {groups.map((g) => {
          const c = counts.get(g.key);
          return (
            <button
              type="button"
              key={g.key}
              className={`grade-chip${g.key === selected ? " active" : ""}`}
              onClick={() => setSelected(g.key === selected ? null : g.key)}
            >
              <span className="grade-chip-label">{g.label}</span>
              <span className="grade-chip-count">{c.families.size} families</span>
            </button>
          );
        })}
      </div>

      {selectedGroup && (
        <>
          <h3 className="result-heading">
            {selectedGroup.label} — {selectedCount.families.size} families, {selectedCount.students} students
          </h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Family</th>
                  <th>Student</th>
                  <th>Relation</th>
                  <th>Grade (as recorded)</th>
                  <th>Institute</th>
                  <th>Mobile</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => (
                  <tr
                    key={d.dpid}
                    className="clickable"
                    onClick={() => navigate(`/families/${d.prfml_id}/dependents/${d.dpid}`)}
                  >
                    <td>{d.family?.fullname ?? <span className="muted-cell">unlinked (#{d.prfml_id ?? "—"})</span>}</td>
                    <td>{d.fullname}</td>
                    <td>{d.relation}</td>
                    <td>{d.inst_grade}</td>
                    <td>{d.inst_name}</td>
                    <td>{d.family?.mobile ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
