"""Generic authenticated CRUD router factory.

A feature module gets a full REST API (list/get/create/update/delete) from a
single call:

    router = build_crud_router(MyModel, prefix="/my-feature", tags=["My Feature"])

Endpoints support pagination (skip/limit) and exact-match filtering on any
column via query parameters, e.g. GET /contact-master/?prfml_id=12
"""
import datetime
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy import inspect, select
from sqlalchemy.orm import DeclarativeBase, Session

from app.auth.deps import get_current_user
from app.core.database import get_db
from app.core.schema_factory import build_schemas

MAX_PAGE_SIZE = 500


def _coerce(value: str, py_type: type) -> Any:
    """Convert a query-string value to the column's Python type."""
    if py_type is str:
        return value
    if py_type is datetime.date:
        return datetime.date.fromisoformat(value)
    if py_type is datetime.datetime:
        return datetime.datetime.fromisoformat(value)
    return py_type(value)


def build_crud_router(model: type[DeclarativeBase], *, prefix: str, tags: list[str]) -> APIRouter:
    create_schema, read_schema, update_schema = build_schemas(model)
    pk_column = inspect(model).primary_key[0]
    column_types = {c.name: c.type.python_type for c in inspect(model).columns}

    router = APIRouter(prefix=prefix, tags=tags, dependencies=[Depends(get_current_user)])

    def get_or_404(db: Session, item_id: int) -> Any:
        item = db.get(model, item_id)
        if item is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f"{model.__name__} {item_id} not found")
        return item

    @router.get("/", response_model=list[read_schema])
    def list_items(
        request: Request,
        skip: int = Query(0, ge=0),
        limit: int = Query(100, ge=1, le=MAX_PAGE_SIZE),
        db: Session = Depends(get_db),
    ):
        stmt = select(model)
        for key, value in request.query_params.items():
            if key in ("skip", "limit"):
                continue
            if key not in column_types:
                raise HTTPException(status.HTTP_400_BAD_REQUEST, f"Unknown filter column: {key}")
            try:
                typed_value = _coerce(value, column_types[key])
            except (ValueError, TypeError):
                raise HTTPException(status.HTTP_400_BAD_REQUEST, f"Invalid value for {key}: {value}")
            stmt = stmt.where(getattr(model, key) == typed_value)
        stmt = stmt.order_by(pk_column).offset(skip).limit(limit)
        return db.scalars(stmt).all()

    @router.get("/{item_id}", response_model=read_schema)
    def get_item(item_id: int, db: Session = Depends(get_db)):
        return get_or_404(db, item_id)

    @router.post("/", response_model=read_schema, status_code=status.HTTP_201_CREATED)
    def create_item(payload: create_schema, db: Session = Depends(get_db)):  # type: ignore[valid-type]
        item = model(**payload.model_dump())
        db.add(item)
        db.commit()
        db.refresh(item)
        return item

    @router.patch("/{item_id}", response_model=read_schema)
    def update_item(item_id: int, payload: update_schema, db: Session = Depends(get_db)):  # type: ignore[valid-type]
        item = get_or_404(db, item_id)
        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(item, field, value)
        db.commit()
        db.refresh(item)
        return item

    @router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
    def delete_item(item_id: int, db: Session = Depends(get_db)):
        item = get_or_404(db, item_id)
        db.delete(item)
        db.commit()

    return router
