from app.core.crud_router import build_crud_router
from app.features.academic_tracking.models import AcademicTracking

router = build_crud_router(AcademicTracking, prefix="/academic-tracking", tags=["Academic Tracking"])
