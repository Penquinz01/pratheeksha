import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import { DEPENDENT_TABS, DEPENDENT_MASTER, TRACKERS } from "../config/tables";
import ProfileCard from "../components/ProfileCard";
import Tabs from "../components/Tabs";
import RelatedRecordsPanel from "../components/RelatedRecordsPanel";

export default function DependentProfilePage() {
  const { prfmlId, dpid } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setRecord(await api(`${DEPENDENT_MASTER.path}${dpid}`));
    } catch (err) {
      setError(err.message);
    }
  }, [dpid]);

  useEffect(() => { load(); }, [load]);

  const save = async (payload) => {
    setRecord(await api(`${DEPENDENT_MASTER.path}${dpid}`, { method: "PATCH", body: payload }));
  };

  const remove = async () => {
    if (!window.confirm(`Delete dependent "${record?.fullname ?? dpid}"? Any tracking records for them will remain but become unlinked.`)) return;
    await api(`${DEPENDENT_MASTER.path}${dpid}`, { method: "DELETE" });
    navigate(`/families/${prfmlId}`);
  };

  if (error) return <p className="error">{error}</p>;
  if (!record) return <p className="center-note">Loading…</p>;

  return (
    <div>
      <Link to={`/families/${prfmlId}`} className="back-link">← Back to family</Link>

      <ProfileCard
        table={DEPENDENT_MASTER}
        record={record}
        isNew={false}
        title={record.fullname}
        subtitle={[record.relation, record.inst_name].filter(Boolean).join(" · ")}
        meta={[
          { label: "Dependent ID", value: record.prfml_dpid },
          { label: "Grade", value: record.inst_grade },
          { label: "Edu. Status", value: record.edu_status, tone: "neutral" },
          { label: "Academic Yr", value: record.inst_academic_yr },
          { label: "Madrasa", value: record.madrasa_name },
        ]}
        avatarSource={record.fullname}
        onSave={save}
        onDelete={remove}
      />

      <Tabs
        tabs={DEPENDENT_TABS}
        renderPanel={(key) => <RelatedRecordsPanel table={TRACKERS[key]} filterValue={Number(dpid)} />}
      />
    </div>
  );
}
