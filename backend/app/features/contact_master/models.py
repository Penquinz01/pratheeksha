"""Mirror of Access table PR_Family_Contact_Master."""
from datetime import date

from sqlalchemy import Date, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

S = String(255)


class ContactMaster(Base):
    __tablename__ = "pr_family_contact_master"

    prfml_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    idx_id: Mapped[int | None] = mapped_column(Integer)
    oldid: Mapped[str | None] = mapped_column(S)
    fullname: Mapped[str | None] = mapped_column(S)
    known_as: Mapped[str | None] = mapped_column(S)
    gender: Mapped[str | None] = mapped_column(S)
    address: Mapped[str | None] = mapped_column(S)
    panchayath: Mapped[str | None] = mapped_column(S)
    ward: Mapped[str | None] = mapped_column(S)
    house_no: Mapped[str | None] = mapped_column(S)
    taluk: Mapped[str | None] = mapped_column(S)
    mahallu: Mapped[str | None] = mapped_column(S)
    post: Mapped[str | None] = mapped_column(S)
    pin: Mapped[str | None] = mapped_column(S)
    district: Mapped[str | None] = mapped_column(S)
    area: Mapped[str | None] = mapped_column(S)
    mobile: Mapped[str | None] = mapped_column(S)
    whatsapp: Mapped[str | None] = mapped_column(S)
    gpay: Mapped[str | None] = mapped_column(S)
    occupation: Mapped[str | None] = mapped_column(S)
    salary: Mapped[str | None] = mapped_column(S)
    dob: Mapped[date | None] = mapped_column(Date)
    religion: Mapped[str | None] = mapped_column(S)
    qualification: Mapped[str | None] = mapped_column(S)
    blood_group: Mapped[str | None] = mapped_column(S)
    aadhar_no: Mapped[str | None] = mapped_column(S)
    election_id: Mapped[str | None] = mapped_column(S)
    ration_card: Mapped[str | None] = mapped_column(S)
    bank_name: Mapped[str | None] = mapped_column(S)
    bank_branch: Mapped[str | None] = mapped_column(S)
    bank_ac: Mapped[str | None] = mapped_column(S)
    father_name: Mapped[str | None] = mapped_column(S)
    father_mobile: Mapped[str | None] = mapped_column(S)
    mother_name: Mapped[str | None] = mapped_column(S)
    mother_mobile: Mapped[str | None] = mapped_column(S)
    marital_status: Mapped[str | None] = mapped_column(S)
    spouse_name: Mapped[str | None] = mapped_column(S)
    marital_status_discr: Mapped[str | None] = mapped_column(S)
    guard_name: Mapped[str | None] = mapped_column(S)
    guard_mobile: Mapped[str | None] = mapped_column(S)
    srl_no: Mapped[int | None] = mapped_column(Integer)
    pr_category_old: Mapped[str | None] = mapped_column(S)
    pr_category: Mapped[str | None] = mapped_column(S)
    exclusion_reason: Mapped[str | None] = mapped_column(S)
    health_condition: Mapped[str | None] = mapped_column(S)
    approved: Mapped[str | None] = mapped_column(S)
    joined_year: Mapped[str | None] = mapped_column(S)
    remark: Mapped[str | None] = mapped_column(S)
    ration: Mapped[int | None] = mapped_column(Integer)
    social_status: Mapped[str | None] = mapped_column(S)
    health_status: Mapped[str | None] = mapped_column(S)
    old_srl: Mapped[int | None] = mapped_column(Integer)
