from app.core.crud_router import build_crud_router
from app.features.attendance_tracking.models import AttendanceTracking

router = build_crud_router(AttendanceTracking, prefix="/attendance-tracking", tags=["Attendance Tracking"])
