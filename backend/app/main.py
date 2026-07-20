"""Application entrypoint.

Feature routers are discovered automatically: any package under app/features
that exposes a module-level `router` in its router.py gets mounted. Adding a
new feature therefore never requires editing this file.
"""
import importlib
import logging
import pkgutil
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError

from app import features
from app.auth.router import router as auth_router
from app.core.config import get_settings
from app.core.database import Base, engine

logger = logging.getLogger("uvicorn.error")


def discover_feature_routers():
    for module_info in pkgutil.iter_modules(features.__path__):
        if not module_info.ispkg:
            continue
        module = importlib.import_module(f"{features.__name__}.{module_info.name}.router")
        yield module.router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Wait for the database (relevant on container start), then create tables.
    for attempt in range(10):
        try:
            Base.metadata.create_all(engine)
            break
        except OperationalError:
            logger.warning("Database not ready (attempt %d/10), retrying...", attempt + 1)
            time.sleep(2)
    else:
        raise RuntimeError("Could not connect to the database")
    yield


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title=settings.app_name, lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_router)
    for router in discover_feature_routers():
        app.include_router(router)

    @app.get("/health", tags=["Health"])
    def health():
        return {"status": "ok"}

    return app


app = create_app()
