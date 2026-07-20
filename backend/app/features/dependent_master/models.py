"""Mirror of Access table PR_Family_Dependent_Master."""
from datetime import date

from sqlalchemy import Date, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

S = String(255)


class DependentMaster(Base):
    __tablename__ = "pr_family_dependent_master"

    dpid: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    prfml_dpid: Mapped[str | None] = mapped_column(S)
    # Declared NOT NULL in Access, but the real data contains nulls.
    prfml_id: Mapped[int | None] = mapped_column(Integer, index=True)
    fullname: Mapped[str | None] = mapped_column(S)
    gender: Mapped[str | None] = mapped_column(S)
    dob: Mapped[date | None] = mapped_column(Date)
    relation: Mapped[str | None] = mapped_column(S)
    ambition: Mapped[str | None] = mapped_column(S)
    hobbies: Mapped[str | None] = mapped_column(S)
    edu_status: Mapped[str | None] = mapped_column(S)
    inst_grade: Mapped[str | None] = mapped_column(S)
    inst_name: Mapped[str | None] = mapped_column(S)
    inst_type: Mapped[str | None] = mapped_column(S)
    inst_syllabus: Mapped[str | None] = mapped_column(S)
    inst_medium: Mapped[str | None] = mapped_column(S)
    inst_academic_yr: Mapped[str | None] = mapped_column(S)
    trnsp_fee: Mapped[int | None] = mapped_column(Integer)
    inst_division: Mapped[str | None] = mapped_column(S)
    fav_subject: Mapped[str | None] = mapped_column(S)
    dif_subject: Mapped[str | None] = mapped_column(S)
    madrasa_grade: Mapped[str | None] = mapped_column(S)
    madrasa_name: Mapped[str | None] = mapped_column(S)
    madrasa_syllabus: Mapped[str | None] = mapped_column(S)
    madrasa_academic_yr: Mapped[str | None] = mapped_column(S)
    mobile: Mapped[str | None] = mapped_column(S)
    whatsapp: Mapped[str | None] = mapped_column(S)
    occupation: Mapped[str | None] = mapped_column(S)
    salary: Mapped[str | None] = mapped_column(S)
    blood_group: Mapped[str | None] = mapped_column(S)
    aadhar_no: Mapped[str | None] = mapped_column(S)
    election_id: Mapped[str | None] = mapped_column(S)
    marital_status: Mapped[str | None] = mapped_column(S)
    spouse_name: Mapped[str | None] = mapped_column(S)
    marital_status_discr: Mapped[str | None] = mapped_column(S)
    health_condition: Mapped[str | None] = mapped_column(S)
