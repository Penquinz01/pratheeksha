// Field-level validation. Every column in the database is nullable, so blank is
// always allowed -- these rules only constrain values that were actually
// entered.
const TEN_DIGITS = /^\d{10}$/;

export function fieldError(field, rawValue) {
  if (field.type !== "tel") return null;
  const raw = (rawValue ?? "").toString();
  if (!raw.trim()) return null;
  if (TEN_DIGITS.test(raw)) return null;

  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) {
    // e.g. "9946563 241", or a stray U+200E that is impossible to see.
    return "Remove the spaces or hidden characters — digits only";
  }
  if (digits.length > 10) {
    return `${digits.length} digits — looks like more than one number, keep a single 10-digit one`;
  }
  return `Must be 10 digits (currently ${digits.length})`;
}

export function collectErrors(fields, values) {
  const errors = {};
  for (const field of fields) {
    const message = fieldError(field, values[field.name]);
    if (message) errors[field.name] = message;
  }
  return errors;
}

// Phone inputs strip anything non-numeric as you type, so pasting a formatted
// number cleans itself. Length is not truncated -- an over-long value has to be
// resolved by a human rather than silently cut.
export function sanitize(field, value) {
  return field.type === "tel" ? value.replace(/\D/g, "") : value;
}
