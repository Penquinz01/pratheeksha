"""Mirror of Access table PR_Family_Dependent_Feedback_Tracking."""
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

S = String(255)


class DependentFeedbackTracking(Base):
    __tablename__ = "pr_family_dependent_feedback_tracking"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    dpid: Mapped[int | None] = mapped_column(Integer, index=True)
    prfml_dpid: Mapped[str | None] = mapped_column(S)
    fml_support: Mapped[str | None] = mapped_column(S)
    fml_fdb_study_time: Mapped[str | None] = mapped_column(S)
    fml_fdb_social_media_time: Mapped[str | None] = mapped_column(S)
    fml_fdb_friends_time: Mapped[str | None] = mapped_column(S)
    fml_fdb_mobile_game_time: Mapped[str | None] = mapped_column(S)
    fml_fdb_physical_game_time: Mapped[str | None] = mapped_column(S)
    fml_fdb_relegious_time: Mapped[str | None] = mapped_column(S)
    fml_fdb_behaviour_to_parent: Mapped[str | None] = mapped_column(S)
    fml_fdb_behaviour_to_sibling: Mapped[str | None] = mapped_column(S)
    fml_fdb_health_issues: Mapped[str | None] = mapped_column(S)
    schl_fdb_character: Mapped[str | None] = mapped_column(S)
    schl_fdb_study_quality: Mapped[str | None] = mapped_column(S)
    schl_fdb_friends_time: Mapped[str | None] = mapped_column(S)
    schl_fdb_attendace: Mapped[str | None] = mapped_column(S)
    schl_fdb_extra_activities: Mapped[str | None] = mapped_column(S)
