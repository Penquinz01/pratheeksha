from app.core.crud_router import build_crud_router
from app.features.dependent_master.models import DependentMaster

router = build_crud_router(DependentMaster, prefix="/dependent-master", tags=["Family Dependent Master"])
