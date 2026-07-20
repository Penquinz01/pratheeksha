from app.core.crud_router import build_crud_router
from app.features.dependent_communication_tracking.models import DependentCommunicationTracking

router = build_crud_router(DependentCommunicationTracking, prefix="/dependent-communication-tracking", tags=["Dependent Communication Tracking"])
