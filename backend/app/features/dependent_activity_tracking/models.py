"""Mirror of Access table PR_Family_Dependent_Activity_Tracking."""
from datetime import date

from sqlalchemy import Date, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

S = String(255)


class DependentActivityTracking(Base):
    __tablename__ = "pr_family_dependent_activity_tracking"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    dpid: Mapped[int | None] = mapped_column(Integer, index=True)
    prfml_id: Mapped[str | None] = mapped_column(S)
    prfml_dpid: Mapped[str | None] = mapped_column(S)
    act_date: Mapped[date | None] = mapped_column(Date)
    act_feedback: Mapped[str | None] = mapped_column(S)
    act_type: Mapped[str | None] = mapped_column(S)
    act_description: Mapped[str | None] = mapped_column(S)
    act_person: Mapped[str | None] = mapped_column(S)
