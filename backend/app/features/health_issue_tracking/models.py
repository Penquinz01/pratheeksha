"""Mirror of Access table PR_Family_Health_Issue_Tracking."""
from datetime import date

from sqlalchemy import Date, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

S = String(255)


class HealthIssueTracking(Base):
    __tablename__ = "pr_family_health_issue_tracking"

    prfml_hi_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    prfml_id: Mapped[int | None] = mapped_column(Integer, index=True)
    prfml_dpid: Mapped[int | None] = mapped_column(Integer)
    hi_type: Mapped[str | None] = mapped_column(S)
    hi_descr: Mapped[str | None] = mapped_column(S)
    hi_date: Mapped[date | None] = mapped_column(Date)
    hi_clinic: Mapped[str | None] = mapped_column(S)
    hi_clinic_type: Mapped[str | None] = mapped_column(S)
    hi_clinic_stream: Mapped[str | None] = mapped_column(S)
    hi_executive: Mapped[str | None] = mapped_column(S)
    hi_amount: Mapped[int | None] = mapped_column(Integer)
    hi_update: Mapped[str | None] = mapped_column(S)
