import { OPTIONS } from "../config/options";

export function humanize(name) {
  return name
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Renders the right control for one field descriptor: text / number / date /
// a text input backed by a <datalist> of suggestions (never a hard <select>,
// since these columns accept any value server-side).
export default function FieldInput({ field, value, onChange, disabled }) {
  const label = field.label ?? humanize(field.name);
  const listId = field.type === "select" ? `dl-${field.name}` : undefined;

  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
        value={value ?? ""}
        disabled={disabled}
        list={listId}
        onChange={(e) => onChange(e.target.value)}
      />
      {listId && (
        <datalist id={listId}>
          {(OPTIONS[field.optionsKey] ?? []).map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
      )}
    </label>
  );
}
