"""Mirror of Access table PR_Family_Dependent_Communication_Tracking."""
from datetime import date

from sqlalchemy import Date, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

S = String(255)


class DependentCommunicationTracking(Base):
    __tablename__ = "pr_family_dependent_communication_tracking"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    dpid: Mapped[int | None] = mapped_column(Integer, index=True)
    prfml_id: Mapped[int | None] = mapped_column(Integer, index=True)
    prfml_dpid: Mapped[str | None] = mapped_column(S)
    comm_date: Mapped[date | None] = mapped_column(Date)
    comm_time: Mapped[str | None] = mapped_column(S)
    comm_executive: Mapped[str | None] = mapped_column(S)
    comm_person: Mapped[str | None] = mapped_column(S)
    comm_person_mobile: Mapped[str | None] = mapped_column(S)
    comm_reason: Mapped[str | None] = mapped_column(S)
    comm_outcome: Mapped[str | None] = mapped_column(S)
    comm_type: Mapped[str | None] = mapped_column(S)
    comm_method: Mapped[str | None] = mapped_column(S)
