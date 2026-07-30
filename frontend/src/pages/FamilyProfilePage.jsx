import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import { CONTACT_MASTER, FAMILY_TABS, TRACKERS } from "../config/tables";
import ProfileCard from "../components/ProfileCard";
import { approvalTone } from "../components/Badge";
import Tabs from "../components/Tabs";
import DependentsTab from "../components/DependentsTab";
import RelatedRecordsPanel from "../components/RelatedRecordsPanel";

export default function FamilyProfilePage() {
  const { prfmlId } = useParams();
  const isNew = prfmlId === "new";
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (isNew) { setRecord(null); return; }
    setError(null);
    try {
      setRecord(await api(`${CONTACT_MASTER.path}${prfmlId}`));
    } catch (err) {
      setError(err.message);
    }
  }, [prfmlId, isNew]);

  useEffect(() => { load(); }, [load]);

  const save = async (payload) => {
    if (isNew) {
      const created = await api(CONTACT_MASTER.path, { method: "POST", body: payload });
      navigate(`/families/${created.prfml_id}`);
    } else {
      setRecord(await api(`${CONTACT_MASTER.path}${prfmlId}`, { method: "PATCH", body: payload }));
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete family "${record?.fullname ?? prfmlId}"? Any dependents/tracking records for this family will remain but become unlinked.`)) return;
    await api(`${CONTACT_MASTER.path}${prfmlId}`, { method: "DELETE" });
    navigate("/families");
  };

  if (error) return <p className="error">{error}</p>;
  if (!isNew && !record) return <p className="center-note">Loading…</p>;

  const meta = isNew ? [] : [
    { label: "PID", value: record.idx_id },
    { label: "Srl. No.", value: record.srl_no },
    { label: "Category", value: record.pr_category, tone: "neutral" },
    { label: "Approved", value: record.approved, tone: approvalTone(record.approved) },
    { label: "Mobile", value: record.mobile },
    { label: "Panchayath", value: record.panchayath },
  ];

  return (
    <div>
      <Link to="/families" className="back-link">← Back to families</Link>

      <ProfileCard
        table={CONTACT_MASTER}
        record={record}
        isNew={isNew}
        title={isNew ? "New Family" : record.fullname}
        subtitle={isNew ? null : [record.known_as, record.address].filter(Boolean).join(" · ")}
        meta={meta}
        avatarSource={isNew ? "" : record.fullname}
        onSave={save}
        onDelete={isNew ? null : remove}
      />

      {!isNew && (
        <Tabs
          tabs={FAMILY_TABS}
          renderPanel={(key) =>
            key === "dependents"
              ? <DependentsTab prfmlId={Number(prfmlId)} idxId={record.idx_id} />
              : <RelatedRecordsPanel table={TRACKERS[key]} filterValue={Number(prfmlId)} />
          }
        />
      )}
    </div>
  );
}
