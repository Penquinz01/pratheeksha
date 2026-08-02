// Small status pill. `tone` only carries meaning where the data genuinely has
// it (approved yes/no); categories stay neutral so the styling doesn't imply a
// ranking the data doesn't define.
export default function Badge({ children, tone = "neutral" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function approvalTone(value) {
  if (!value) return "neutral";
  return value.trim().toLowerCase() === "yes" ? "good" : "warn";
}
