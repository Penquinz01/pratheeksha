"""Read-only query functions exposed to the assistant.

These are the *only* way the assistant reaches the database. There is no
generated SQL: the model chooses a function and its arguments, and the SQL
below is fixed. That is deliberate — see grades.py for the concrete failure
this avoids (a query for '%12%' matches zero rows because 12th is recorded as
"+2", so a text-to-SQL bot answers "none" with total confidence).

Every function:
  * reads only — no INSERT/UPDATE/DELETE anywhere in this module;
  * caps how many rows it returns;
  * omits identity and banking columns entirely (see REDACTED);
  * records what it did in ToolContext.calls, so the answer can be shown with
    the filter that produced it.
"""
from dataclasses import dataclass, field
from typing import Any, Callable

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.grades import (
    GRADE_GROUPS,
    OTHER_KEY,
    OTHER_LABEL,
    STUDYING_STATUSES,
    grade_group_key,
    group_label,
    resolve_group_key,
)
from app.features.contact_master.models import ContactMaster
from app.features.dependent_master.models import DependentMaster

# Never returned to the model, and therefore never to the chat window. These
# identify a person to a bank or a government office; nothing the assistant is
# for requires them, and a chat transcript is a poor place for them to live.
REDACTED = {
    "aadhar_no", "election_id", "ration_card", "bank_ac", "bank_name",
    "bank_branch", "gpay", "salary",
}

MAX_ROWS = 50
DEFAULT_ROWS = 20


@dataclass
class ToolContext:
    """Per-request record of what the assistant actually looked at."""

    db: Session
    calls: list[dict[str, Any]] = field(default_factory=list)

    def record(self, name: str, filters: dict[str, Any], result_count: int | None) -> None:
        self.calls.append({"tool": name, "filters": filters, "results": result_count})


def _family_summary(row: ContactMaster) -> dict[str, Any]:
    """The shape used in list results: enough to identify a family, no more."""
    return {
        "prfml_id": row.prfml_id,
        "pid": row.idx_id,
        "name": row.fullname,
        "place": row.address,
        "panchayath": row.panchayath,
        "category": row.pr_category,
        "approved": row.approved,
    }


def build_tools(ctx: ToolContext) -> list[Callable[..., Any]]:
    """Bind the query functions to a request's DB session and audit log.

    Returned as plain callables: the SDK derives each tool's schema from the
    signature and docstring, so the docstrings below are part of the interface
    and are written for the model to read.
    """
    db = ctx.db

    def count_students_by_grade(grade: str, studying_only: bool = True) -> dict:
        """Count students in one school grade.

        Accepts how a person would say it -- "12th", "+2", "plus two", "10th",
        "SSLC", "degree", "PG" -- and resolves it to the right stored spelling.
        Never guess the stored value yourself; always call this with the user's
        own words.

        Args:
            grade: The grade as the user said it, e.g. "12th" or "+2".
            studying_only: Count only people currently studying (edu_status
                Student or Kid). Set False to include those who have a grade
                recorded but are no longer studying.
        """
        key = resolve_group_key(grade)
        if key is None:
            ctx.record("count_students_by_grade", {"grade": grade}, None)
            return {
                "error": f"Could not resolve {grade!r} to a known grade.",
                "known_grades": [g.label for g in GRADE_GROUPS] + [OTHER_LABEL],
            }

        rows = db.scalars(select(DependentMaster)).all()
        matched = [
            r for r in rows
            if grade_group_key(r.inst_grade) == key
            and (not studying_only or (r.edu_status or "") in STUDYING_STATUSES)
        ]
        family_ids = {r.prfml_id for r in matched if r.prfml_id is not None}
        filters = {
            "grade_group": group_label(key),
            "studying_only": studying_only,
            "edu_status_in": STUDYING_STATUSES if studying_only else "any",
        }
        ctx.record("count_students_by_grade", filters, len(matched))
        return {
            "grade_group": group_label(key),
            "student_count": len(matched),
            "family_count": len(family_ids),
            "filters_applied": filters,
        }

    def list_students_in_grade(
        grade: str, studying_only: bool = True, limit: int = DEFAULT_ROWS
    ) -> dict:
        """List the students in one grade, with the family each belongs to.

        Use after count_students_by_grade when the user wants to know *who*, or
        which families. Accepts the same spoken grade forms.

        Args:
            grade: The grade as the user said it, e.g. "10th" or "+1".
            studying_only: Restrict to people currently studying.
            limit: Maximum students to return (capped at 50).
        """
        key = resolve_group_key(grade)
        if key is None:
            ctx.record("list_students_in_grade", {"grade": grade}, None)
            return {"error": f"Could not resolve {grade!r} to a known grade."}

        limit = max(1, min(limit, MAX_ROWS))
        rows = db.scalars(select(DependentMaster).order_by(DependentMaster.dpid)).all()
        matched = [
            r for r in rows
            if grade_group_key(r.inst_grade) == key
            and (not studying_only or (r.edu_status or "") in STUDYING_STATUSES)
        ]

        family_ids = {r.prfml_id for r in matched[:limit] if r.prfml_id is not None}
        families = {}
        if family_ids:
            for fam in db.scalars(
                select(ContactMaster).where(ContactMaster.prfml_id.in_(family_ids))
            ).all():
                families[fam.prfml_id] = fam

        students = []
        for r in matched[:limit]:
            fam = families.get(r.prfml_id)
            students.append({
                "name": r.fullname,
                "grade_as_recorded": r.inst_grade,
                "edu_status": r.edu_status,
                "institution": r.inst_name,
                "prfml_id": r.prfml_id,
                "family_name": fam.fullname if fam else None,
                "place": fam.address if fam else None,
            })

        filters = {"grade_group": group_label(key), "studying_only": studying_only}
        ctx.record("list_students_in_grade", filters, len(matched))
        return {
            "grade_group": group_label(key),
            "total_matching": len(matched),
            "returned": len(students),
            "truncated": len(matched) > len(students),
            "students": students,
            "filters_applied": filters,
        }

    def grade_breakdown(studying_only: bool = True) -> dict:
        """Count students across every grade at once.

        Use for "how many students in each class", "break it down by grade", or
        any question that spans more than one grade. One call is much cheaper
        than calling count_students_by_grade repeatedly.

        Args:
            studying_only: Restrict to people currently studying.
        """
        rows = db.scalars(select(DependentMaster)).all()
        counts: dict[str, int] = {}
        for r in rows:
            if studying_only and (r.edu_status or "") not in STUDYING_STATUSES:
                continue
            key = grade_group_key(r.inst_grade)
            if key is None:
                continue
            counts[key] = counts.get(key, 0) + 1

        ordered = [
            {"grade_group": g.label, "student_count": counts.get(g.key, 0)}
            for g in GRADE_GROUPS
            if counts.get(g.key)
        ]
        if counts.get(OTHER_KEY):
            ordered.append({"grade_group": OTHER_LABEL, "student_count": counts[OTHER_KEY]})

        filters = {"studying_only": studying_only}
        ctx.record("grade_breakdown", filters, sum(counts.values()))
        return {
            "total_students": sum(counts.values()),
            "by_grade": ordered,
            "filters_applied": filters,
        }

    def find_families(
        name: str = "",
        place: str = "",
        category: str = "",
        approved: str = "",
        limit: int = DEFAULT_ROWS,
    ) -> dict:
        """Search families by name, place, category or approval state.

        All arguments are optional and combine with AND. Name and place match
        anywhere in the field, case-insensitively. Leave an argument out rather
        than passing a guess.

        Args:
            name: Part of the head-of-family name.
            place: Part of the address or panchayath.
            category: Exact category code, typically "A", "B" or "C".
            approved: Approval state as stored, e.g. "Yes" or "No". Call
                distinct_values("approved") first if unsure.
            limit: Maximum families to return (capped at 50).
        """
        limit = max(1, min(limit, MAX_ROWS))
        stmt = select(ContactMaster)
        filters: dict[str, Any] = {}

        if name.strip():
            stmt = stmt.where(ContactMaster.fullname.ilike(f"%{name.strip()}%"))
            filters["name_contains"] = name.strip()
        if place.strip():
            p = f"%{place.strip()}%"
            stmt = stmt.where(
                ContactMaster.address.ilike(p) | ContactMaster.panchayath.ilike(p)
            )
            filters["place_contains"] = place.strip()
        if category.strip():
            stmt = stmt.where(ContactMaster.pr_category == category.strip())
            filters["category"] = category.strip()
        if approved.strip():
            stmt = stmt.where(ContactMaster.approved == approved.strip())
            filters["approved"] = approved.strip()

        total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0
        rows = db.scalars(stmt.order_by(ContactMaster.prfml_id).limit(limit)).all()

        ctx.record("find_families", filters or {"filter": "none (all families)"}, total)
        return {
            "total_matching": total,
            "returned": len(rows),
            "truncated": total > len(rows),
            "families": [_family_summary(r) for r in rows],
            "filters_applied": filters or {"filter": "none (all families)"},
        }

    def get_family(prfml_id: int) -> dict:
        """Full record for one family, including its dependents.

        Use after find_families, with the prfml_id from those results. Identity
        and banking fields are not available.

        Args:
            prfml_id: The family's internal id.
        """
        fam = db.get(ContactMaster, prfml_id)
        if fam is None:
            ctx.record("get_family", {"prfml_id": prfml_id}, 0)
            return {"error": f"No family with prfml_id {prfml_id}."}

        deps = db.scalars(
            select(DependentMaster)
            .where(DependentMaster.prfml_id == prfml_id)
            .order_by(DependentMaster.dpid)
        ).all()

        profile = {
            col: getattr(fam, col)
            for col in (
                "prfml_id", "idx_id", "fullname", "known_as", "gender", "address",
                "panchayath", "ward", "house_no", "taluk", "post", "district",
                "mobile", "occupation", "religion", "qualification", "blood_group",
                "marital_status", "spouse_name", "father_name", "mother_name",
                "pr_category", "approved", "joined_year", "health_condition",
                "health_status", "social_status", "remark",
            )
        }
        if profile.get("dob"):
            profile["dob"] = str(profile["dob"])

        ctx.record("get_family", {"prfml_id": prfml_id}, 1)
        return {
            "family": profile,
            "dependent_count": len(deps),
            "dependents": [
                {
                    "dpid": d.dpid,
                    "name": d.fullname,
                    "relation": d.relation,
                    "gender": d.gender,
                    "edu_status": d.edu_status,
                    "grade_as_recorded": d.inst_grade,
                    "grade_group": (
                        group_label(k) if (k := grade_group_key(d.inst_grade)) else None
                    ),
                    "institution": d.inst_name,
                    "occupation": d.occupation,
                    "health_condition": d.health_condition,
                }
                for d in deps
            ],
        }

    def count_families(category: str = "", approved: str = "", place: str = "") -> dict:
        """Count families matching a filter, without listing them.

        Use for "how many families ..." questions. All arguments optional.

        Args:
            category: Exact category code, e.g. "A".
            approved: Approval state as stored.
            place: Part of the address or panchayath.
        """
        stmt = select(func.count()).select_from(ContactMaster)
        filters: dict[str, Any] = {}
        if category.strip():
            stmt = stmt.where(ContactMaster.pr_category == category.strip())
            filters["category"] = category.strip()
        if approved.strip():
            stmt = stmt.where(ContactMaster.approved == approved.strip())
            filters["approved"] = approved.strip()
        if place.strip():
            p = f"%{place.strip()}%"
            stmt = stmt.where(
                ContactMaster.address.ilike(p) | ContactMaster.panchayath.ilike(p)
            )
            filters["place_contains"] = place.strip()

        total = db.scalar(stmt) or 0
        ctx.record("count_families", filters or {"filter": "none (all families)"}, total)
        return {"family_count": total, "filters_applied": filters or {"filter": "all"}}

    # Columns the assistant may summarise. Free-text and identity columns are
    # excluded: a breakdown of "remark" is meaningless and one of "aadhar_no"
    # would be a leak.
    _BREAKDOWN_COLUMNS = {
        "approved": (ContactMaster, ContactMaster.approved),
        "pr_category": (ContactMaster, ContactMaster.pr_category),
        "religion": (ContactMaster, ContactMaster.religion),
        "marital_status": (ContactMaster, ContactMaster.marital_status),
        "blood_group": (ContactMaster, ContactMaster.blood_group),
        "panchayath": (ContactMaster, ContactMaster.panchayath),
        "district": (ContactMaster, ContactMaster.district),
        "gender": (ContactMaster, ContactMaster.gender),
        "social_status": (ContactMaster, ContactMaster.social_status),
        "health_status": (ContactMaster, ContactMaster.health_status),
        "joined_year": (ContactMaster, ContactMaster.joined_year),
        "edu_status": (DependentMaster, DependentMaster.edu_status),
        "relation": (DependentMaster, DependentMaster.relation),
        "inst_type": (DependentMaster, DependentMaster.inst_type),
        "inst_medium": (DependentMaster, DependentMaster.inst_medium),
        "occupation": (DependentMaster, DependentMaster.occupation),
    }

    def distinct_values(column: str) -> dict:
        """List the values actually stored in a column, with how often each occurs.

        Call this before filtering on a value you are unsure about -- stored
        values are free text and rarely match what a person would type (approval
        is not "approved", categories are single letters). Do not use it for
        grades: use grade_breakdown instead.

        Args:
            column: One of approved, pr_category, religion, marital_status,
                blood_group, panchayath, district, gender, social_status,
                health_status, joined_year, edu_status, relation, inst_type,
                inst_medium, occupation.
        """
        entry = _BREAKDOWN_COLUMNS.get(column.strip().lower())
        if entry is None:
            ctx.record("distinct_values", {"column": column}, None)
            return {
                "error": f"{column!r} is not available for breakdown.",
                "available_columns": sorted(_BREAKDOWN_COLUMNS),
            }
        model, col = entry
        rows = db.execute(
            select(col, func.count())
            .select_from(model)
            .group_by(col)
            .order_by(func.count().desc())
            .limit(MAX_ROWS)
        ).all()

        ctx.record("distinct_values", {"column": column}, len(rows))
        return {
            "column": column,
            "values": [
                {"value": v if v is not None else "(blank)", "count": c} for v, c in rows
            ],
        }

    return [
        count_students_by_grade,
        list_students_in_grade,
        grade_breakdown,
        find_families,
        get_family,
        count_families,
        distinct_values,
    ]
