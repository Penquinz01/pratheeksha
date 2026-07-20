"""Mirror of Access table PR_Family_Dependent_Edu_Tracking."""
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

S = String(255)


class DependentEduTracking(Base):
    __tablename__ = "pr_family_dependent_edu_tracking"

    eduid: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    dpid: Mapped[int | None] = mapped_column(Integer, index=True)
    prfml_dpid: Mapped[str | None] = mapped_column(S)
    prfml_id: Mapped[int | None] = mapped_column(Integer, index=True)
    fullname: Mapped[str | None] = mapped_column(S)
    inst_grade: Mapped[str | None] = mapped_column(S)
    inst_name: Mapped[str | None] = mapped_column(S)
    inst_type: Mapped[str | None] = mapped_column(S)
    inst_syllabus: Mapped[str | None] = mapped_column(S)
    inst_medium: Mapped[str | None] = mapped_column(S)
    inst_academic_yr: Mapped[str | None] = mapped_column(S)
    madrasa_grade: Mapped[str | None] = mapped_column(S)
    madrasa_name: Mapped[str | None] = mapped_column(S)
    madrasa_syllabus: Mapped[str | None] = mapped_column(S)
    madrasa_academic_yr: Mapped[str | None] = mapped_column(S)
