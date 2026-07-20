from app.core.crud_router import build_crud_router
from app.features.communication_tracking.models import CommunicationTracking

router = build_crud_router(CommunicationTracking, prefix="/communication-tracking", tags=["Family Communication Tracking"])
