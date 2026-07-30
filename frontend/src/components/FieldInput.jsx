import { OPTIONS } from "../config/options";
import { sanitize } from "../lib/validate";

export function humanize(name) {
  return name
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Renders the control for one field descriptor:
//   enum   -> real <select>, for closed sets
//   select -> text input with <datalist> suggestions, where new values are
//             legitimate (institute names, syllabuses, grades)
//   tel    -> numeric text input, digits enforced on entry
//   date / number / text
export default function FieldInput({ field, value, onChange, disabled, error }) {
  const label = field.label ?? humanize(field.name);
  const current = value ?? "";

  if (field.type === "enum") {
    const options = OPTIONS[field.optionsKey] ?? [];
    // Years of free-text entry left values the list does not cover ("Nikah
    // Only", "5th"). Offer the stored value as an option so opening a record in
    // a dropdown can never silently rewrite it.
    const isUnlisted = current !== "" && !options.includes(current);
    return (
      <label className="field">
        <span>{label}</span>
        <select
          value={current}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">—</option>
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          {isUnlisted && <option value={current}>{current} (existing value)</option>}
        </select>
      </label>
    );
  }

  const isTel = field.type === "tel";
  const inputType = field.type === "date" ? "date" : field.type === "number" ? "number" : "text";

  return (
    <label className={`field${error ? " has-error" : ""}`}>
      <span>{label}</span>
      <input
        type={inputType}
        value={current}
        disabled={disabled}
        list={field.type === "select" ? `dl-${field.name}` : undefined}
        inputMode={isTel ? "numeric" : undefined}
        autoComplete={isTel ? "off" : undefined}
        aria-invalid={error ? "true" : undefined}
        onChange={(e) => onChange(sanitize(field, e.target.value))}
      />
      {field.type === "select" && (
        <datalist id={`dl-${field.name}`}>
          {(OPTIONS[field.optionsKey] ?? []).map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
      )}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}
