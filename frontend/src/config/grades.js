// Grade values are free text entered over years, so the same standard appears
// under several spellings ("+2", "+2 Science", "+2, PPTC"). These groups fold
// the variants together; the first matching pattern wins. Edit this list to
// change how grades are bucketed -- nothing else needs to change.
//
// Note the local convention: 11th/12th are recorded as "+1"/"+2", never as
// "11th"/"12th", and 10th is sometimes recorded as its board exam, "SSLC".
export const GRADE_GROUPS = [
  { key: "lkg", label: "LKG", pattern: /^lkg/i },
  { key: "ukg", label: "UKG", pattern: /^ukg/i },
  { key: "1", label: "1st", pattern: /^1st/i },
  { key: "2", label: "2nd", pattern: /^2nd/i },
  { key: "3", label: "3rd", pattern: /^3rd/i },
  { key: "4", label: "4th", pattern: /^4th/i },
  { key: "5", label: "5th", pattern: /^5th/i },
  { key: "6", label: "6th", pattern: /^6th/i },
  { key: "7", label: "7th", pattern: /^7th/i },
  { key: "8", label: "8th", pattern: /^8th/i },
  { key: "9", label: "9th", pattern: /^9th/i },
  { key: "10", label: "10th", pattern: /^(10th|sslc)/i },
  { key: "11", label: "11th (+1)", pattern: /^\+\s*1/ },
  { key: "12", label: "12th (+2)", pattern: /^\+\s*2/ },
  { key: "diploma", label: "Diploma", pattern: /^(diploma|difa)/i },
  { key: "degree", label: "Degree", pattern: /^(degree|b\.?a\b|b\.?com|b\.?sc|bsc|b\.?ed|bba|bca|b\.?tech|b\.?voc)/i },
  { key: "pg", label: "Post Graduate", pattern: /^(pg\b|m\.?a\b|m\.?sc|msc)/i },
  { key: "training", label: "Training / Coaching", pattern: /^(training|coaching|mlt|pharmacy|data science|preliminary|cma|company secretary|photo|mobile)/i },
];

export const OTHER_GROUP = { key: "other", label: "Other / Unclassified" };

// Returns the group key for a raw inst_grade value, or "other" when nothing
// matches (so new spellings surface instead of vanishing from the counts).
export function gradeGroupKey(rawGrade) {
  if (!rawGrade || !rawGrade.trim()) return null;
  const value = rawGrade.trim();
  const hit = GRADE_GROUPS.find((g) => g.pattern.test(value));
  return hit ? hit.key : OTHER_GROUP.key;
}

// edu_status values that mean "currently studying". A grade can linger on a
// record after the person finished or left school, so the page filters on this
// by default when asking "who is studying in 10th".
export const STUDYING_STATUSES = ["Student", "Kid"];
