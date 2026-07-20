from app.core.crud_router import build_crud_router
from app.features.dependent_activity_tracking.models import DependentActivityTracking

router = build_crud_router(DependentActivityTracking, prefix="/dependent-activity-tracking", tags=["Dependent Activity Tracking"])
