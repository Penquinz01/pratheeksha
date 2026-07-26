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
};
