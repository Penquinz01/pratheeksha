from app.core.crud_router import build_crud_router
from app.features.noorul_quran_tracking.models import NoorulQuranTracking

router = build_crud_router(NoorulQuranTracking, prefix="/noorul-quran-tracking", tags=["Noorul Quran Tracking"])
