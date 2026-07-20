"""Mirror of Access table PR_Family_Attendence_Tracking."""
from datetime import date

from sqlalchemy import Date, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

S = String(255)


class AttendanceTracking(Base):
    __tablename__ = "pr_family_attendence_tracking"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    event_id: Mapped[int | None] = mapped_column(Integer)
    prfml_id: Mapped[str | None] = mapped_column(S, index=True)
    prfml_dpid: Mapped[str | None] = mapped_column(S)
    attend_date: Mapped[date | None] = mapped_column(Date)
    attend_time: Mapped[str | None] = mapped_column(S)
