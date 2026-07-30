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
  const [approving, setApproving] = useState(false);
  const [actionError, setActionError] = useState(null);

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

  // Approval is a one-field, frequently-used action, so it saves immediately
  // instead of requiring a trip through the full 51-field edit form. The
  // `approved` field stays in the Status section for bulk edits.
  const setApproval = async (value) => {
    setApproving(true);
    setActionError(null);
    try {
      setRecord(await api(`${CONTACT_MASTER.path}${prfmlId}`, { method: "PATCH", body: { approved: value } }));
    } catch (err) {
      setActionError(err.message);
    } finally {
      setApproving(false);
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

  const isApproved = (record?.approved ?? "").trim().toLowerCase() === "yes";
  const approveAction = isNew ? null : isApproved ? (
    <button type="button" className="secondary" disabled={approving} onClick={() => setApproval("No")}>
      {approving ? "Saving…" : "Revoke approval"}
    </button>
  ) : (
    <button type="button" className="approve" disabled={approving} onClick={() => setApproval("Yes")}>
      {approving ? "Saving…" : "Approve family"}
    </button>
  );

  return (
    <div>
      <Link to="/families" className="back-link">← Back to families</Link>

      {actionError && <p className="error">{actionError}</p>}

      <ProfileCard
        table={CONTACT_MASTER}
        record={record}
        isNew={isNew}
        title={isNew ? "New Family" : record.fullname}
        subtitle={isNew ? null : [record.known_as, record.address].filter(Boolean).join(" · ")}
        meta={meta}
        avatarSource={isNew ? "" : record.fullname}
        extraActions={approveAction}
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
