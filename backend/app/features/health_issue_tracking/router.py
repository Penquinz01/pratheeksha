from app.core.crud_router import build_crud_router
from app.features.health_issue_tracking.models import HealthIssueTracking

router = build_crud_router(HealthIssueTracking, prefix="/health-issue-tracking", tags=["Health Issue Tracking"])
