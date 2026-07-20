"""Mirror of Access table PR_Family_Visit_Tracking."""
from datetime import date

from sqlalchemy import Date, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

S = String(255)


class VisitTracking(Base):
    __tablename__ = "pr_family_visit_tracking"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    prfml_id: Mapped[int | None] = mapped_column(Integer, index=True)
    visit_date: Mapped[date | None] = mapped_column(Date)
    visit_time: Mapped[str | None] = mapped_column(S)
    visit_purpose: Mapped[str | None] = mapped_column(S)
    visit_executive: Mapped[str | None] = mapped_column(S)
    visit_outcome: Mapped[str | None] = mapped_column(S)
