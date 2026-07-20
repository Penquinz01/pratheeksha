from app.core.crud_router import build_crud_router
from app.features.contact_master.models import ContactMaster

router = build_crud_router(ContactMaster, prefix="/contact-master", tags=["Family Contact Master"])
