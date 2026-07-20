from app.core.crud_router import build_crud_router
from app.features.dependent_edu_tracking.models import DependentEduTracking

router = build_crud_router(DependentEduTracking, prefix="/dependent-edu-tracking", tags=["Dependent Education Tracking"])
