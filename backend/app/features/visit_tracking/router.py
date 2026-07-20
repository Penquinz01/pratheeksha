from app.core.crud_router import build_crud_router
from app.features.visit_tracking.models import VisitTracking

router = build_crud_router(VisitTracking, prefix="/visit-tracking", tags=["Family Visit Tracking"])
