"""Mirror of Access table PR_Family_Academic_Tracking."""
from datetime import date

from sqlalchemy import Date, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

S = String(255)


class AcademicTracking(Base):
    __tablename__ = "pr_family_academic_tracking"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    dpid: Mapped[int | None] = mapped_column(Integer, index=True)
    prfml_id: Mapped[int | None] = mapped_column(Integer, index=True)
    prfml_dpid: Mapped[str | None] = mapped_column(S)
    academic_yr: Mapped[str | None] = mapped_column(S)
    exam_period: Mapped[str | None] = mapped_column(S)
    exam_date: Mapped[date | None] = mapped_column(Date)
    first_lang_type: Mapped[str | None] = mapped_column(S)
    first_lang: Mapped[str | None] = mapped_column(S)
    malayalam2: Mapped[str | None] = mapped_column(S)
    english: Mapped[str | None] = mapped_column(S)
    hindi: Mapped[str | None] = mapped_column(S)
    social_science: Mapped[str | None] = mapped_column(S)
    basic_science: Mapped[str | None] = mapped_column(S)
    physics: Mapped[str | None] = mapped_column(S)
    chemistry: Mapped[str | None] = mapped_column(S)
    biology: Mapped[str | None] = mapped_column(S)
    maths: Mapped[str | None] = mapped_column(S)
    overall: Mapped[str | None] = mapped_column(S)
    total_marks: Mapped[int | None] = mapped_column(Integer)
