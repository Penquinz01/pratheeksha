// Suggestion lists for datalist-backed fields. These columns are plain
// varchar server-side (no enum constraint), so values here are suggestions
// only -- typing anything else is still accepted.
export const OPTIONS = {
  gender: ["Male", "Female"],
  bloodGroup: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
  maritalStatus: ["Single", "Married", "Divorced", "Widowed", "Abandoned"],
  religion: ["Muslim", "Hindu", "Christian"],
  prCategory: ["A", "B", "C"],
  approved: ["Yes", "No"],
  socialStatus: ["Miskeen", "Yatheem"],
  healthStatus: ["Patient"],
  relation: [
    "Son", "Daughter", "Father", "Mother", "Husband", "Wife",
    "Brother", "Sister", "Grand Mother", "Grand Daughter",
  ],
  eduStatus: [
    "Student", "Kid", "Not Studying", "Working", "Married",
    "Completed", "SSLC", "10th Completed", "+2 Failed", "Old", "Patient",
  ],
  instType: ["School", "College", "Coaching Centre", "Others"],
  instMedium: ["Malayalam", "English", "Arabic", "Hindi"],

  // Suggestions rather than a fixed list: grades legitimately include course
  // names the list cannot enumerate. Offering the canonical spellings nudges
  // new entries towards consistency, which is what the grade grouping in
  // config/grades.js exists to paper over for the historical data.
  instGrade: [
    "LKG", "UKG",
    "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
    "+1", "+2",
    "Diploma", "Degree 1st", "Degree 2nd", "Degree 3rd", "PG 1st", "PG 2nd",
  ],
};
