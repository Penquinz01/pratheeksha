"""Mirror of Access table PR_Family_Noorul_Quran_Tracking."""
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class NoorulQuranTracking(Base):
    __tablename__ = "pr_family_noorul_quran_tracking"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    prfml_id: Mapped[int | None] = mapped_column(Integer, index=True)
    batch: Mapped[str | None] = mapped_column(String(255))
    exam1: Mapped[int | None] = mapped_column(Integer)
    exam2: Mapped[int | None] = mapped_column(Integer)
    exam3: Mapped[int | None] = mapped_column(Integer)
    exam4: Mapped[int | None] = mapped_column(Integer)
    exam5: Mapped[int | None] = mapped_column(Integer)
    exam6: Mapped[int | None] = mapped_column(Integer)
    exam7: Mapped[int | None] = mapped_column(Integer)
    final: Mapped[int | None] = mapped_column(Integer)
