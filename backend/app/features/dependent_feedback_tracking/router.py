from app.core.crud_router import build_crud_router
from app.features.dependent_feedback_tracking.models import DependentFeedbackTracking

router = build_crud_router(DependentFeedbackTracking, prefix="/dependent-feedback-tracking", tags=["Dependent Feedback Tracking"])
