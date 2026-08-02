"""Grade normalization, shared by the admin UI and the assistant.

`inst_grade` is free text entered over many years, so one standard appears under
several spellings ("+2", "+2 Science", "+2, PPTC"). These groups fold the
variants together; the first matching pattern wins.

The local convention is the trap here: **11th and 12th are recorded as "+1" and
"+2", never as "11th"/"12th"**, and 10th is often recorded as its board exam,
"SSLC". A query for '%12%' matches nothing at all, so anything that answers
"how many students are in 12th" must go through this module rather than
matching the user's words against the column.

This is a port of frontend/src/config/grades.js. The two must agree: if you edit
the groups here, edit them there. Verified against the live database.
"""
import re
from dataclasses import dataclass


@dataclass(frozen=True)
class GradeGroup:
    key: str
    label: str
    pattern: re.Pattern[str]


GRADE_GROUPS: list[GradeGroup] = [
    GradeGroup("lkg", "LKG", re.compile(r"^lkg", re.I)),
    GradeGroup("ukg", "UKG", re.compile(r"^ukg", re.I)),
    GradeGroup("1", "1st", re.compile(r"^1st", re.I)),
    GradeGroup("2", "2nd", re.compile(r"^2nd", re.I)),
    GradeGroup("3", "3rd", re.compile(r"^3rd", re.I)),
    GradeGroup("4", "4th", re.compile(r"^4th", re.I)),
    GradeGroup("5", "5th", re.compile(r"^5th", re.I)),
    GradeGroup("6", "6th", re.compile(r"^6th", re.I)),
    GradeGroup("7", "7th", re.compile(r"^7th", re.I)),
    GradeGroup("8", "8th", re.compile(r"^8th", re.I)),
    GradeGroup("9", "9th", re.compile(r"^9th", re.I)),
    GradeGroup("10", "10th", re.compile(r"^(10th|sslc)", re.I)),
    GradeGroup("11", "11th (+1)", re.compile(r"^\+\s*1")),
    GradeGroup("12", "12th (+2)", re.compile(r"^\+\s*2")),
    GradeGroup("diploma", "Diploma", re.compile(r"^(diploma|difa)", re.I)),
    GradeGroup(
        "degree",
        "Degree",
        re.compile(r"^(degree|b\.?a\b|b\.?com|b\.?sc|bsc|b\.?ed|bba|bca|b\.?tech|b\.?voc)", re.I),
    ),
    GradeGroup("pg", "Post Graduate", re.compile(r"^(pg\b|m\.?a\b|m\.?sc|msc)", re.I)),
    GradeGroup(
        "training",
        "Training / Coaching",
        re.compile(
            r"^(training|coaching|mlt|pharmacy|data science|preliminary|cma"
            r"|company secretary|photo|mobile)",
            re.I,
        ),
    ),
]

OTHER_KEY = "other"
OTHER_LABEL = "Other / Unclassified"

# edu_status values meaning "currently studying". A grade can linger on a record
# after the person left school, so counts of "who is studying in 10th" filter on
# this as well as on the grade.
STUDYING_STATUSES = ["Student", "Kid"]

_BY_KEY = {g.key: g for g in GRADE_GROUPS}

# Words a person might type, mapped to the group key. Deliberately generous:
# the assistant passes through whatever the user said, and a miss here means a
# wrong answer rather than an error.
_ALIASES: dict[str, str] = {
    "lkg": "lkg", "ukg": "ukg", "kg": "lkg", "kindergarten": "lkg",
    "1": "1", "1st": "1", "first": "1",
    "2": "2", "2nd": "2", "second": "2",
    "3": "3", "3rd": "3", "third": "3",
    "4": "4", "4th": "4", "fourth": "4",
    "5": "5", "5th": "5", "fifth": "5",
    "6": "6", "6th": "6", "sixth": "6",
    "7": "7", "7th": "7", "seventh": "7",
    "8": "8", "8th": "8", "eighth": "8",
    "9": "9", "9th": "9", "ninth": "9",
    "10": "10", "10th": "10", "tenth": "10", "sslc": "10", "matric": "10",
    "11": "11", "11th": "11", "eleventh": "11", "+1": "11", "plus one": "11",
    "plus 1": "11", "plusone": "11",
    "12": "12", "12th": "12", "twelfth": "12", "twelth": "12", "+2": "12",
    "plus two": "12", "plus 2": "12", "plustwo": "12", "hss": "12",
    "higher secondary": "12",
    "diploma": "diploma",
    "degree": "degree", "ug": "degree", "undergraduate": "degree",
    "graduation": "degree", "bachelors": "degree",
    "pg": "pg", "post graduate": "pg", "postgraduate": "pg", "masters": "pg",
    "training": "training", "coaching": "training",
    "other": OTHER_KEY,
}


def grade_group_key(raw_grade: str | None) -> str | None:
    """Group key for a raw inst_grade value, or "other" when nothing matches.

    Returns None for blank values so they can be excluded rather than counted as
    a group. Unmatched spellings become "other" so new variants surface in the
    counts instead of vanishing.
    """
    if raw_grade is None or not raw_grade.strip():
        return None
    value = raw_grade.strip()
    for group in GRADE_GROUPS:
        if group.pattern.search(value):
            return group.key
    return OTHER_KEY


def group_label(key: str) -> str:
    group = _BY_KEY.get(key)
    return group.label if group else OTHER_LABEL


def resolve_group_key(spoken: str) -> str | None:
    """Map what a person typed ("12th", "+2", "plus two") to a group key.

    Returns None when it can't be resolved, so the caller can say so rather than
    silently searching for something else.
    """
    if not spoken or not spoken.strip():
        return None
    needle = re.sub(r"\s+", " ", spoken.strip().lower())
    needle = needle.removeprefix("class ").removeprefix("grade ").removeprefix("std ")
    needle = needle.strip().rstrip(".")
    if needle in _ALIASES:
        return _ALIASES[needle]
    if needle in _BY_KEY:
        return needle
    # "12th standard", "+2 science" and similar
    for alias, key in sorted(_ALIASES.items(), key=lambda kv: -len(kv[0])):
        if needle.startswith(alias):
            return key
    return None


def all_group_labels() -> list[str]:
    """Every label the assistant may report, for the system instruction."""
    return [g.label for g in GRADE_GROUPS] + [OTHER_LABEL]
