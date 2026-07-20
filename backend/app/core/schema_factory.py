"""Generate Pydantic Create/Read/Update schemas from a SQLAlchemy model.

Feature modules only declare the SQLAlchemy model; their API schemas are
derived automatically so adding a column never requires touching schema code.
"""
from typing import Optional

from pydantic import BaseModel, ConfigDict, create_model
from sqlalchemy import inspect
from sqlalchemy.orm import DeclarativeBase


def build_schemas(model: type[DeclarativeBase]) -> tuple[type[BaseModel], type[BaseModel], type[BaseModel]]:
    """Return (CreateSchema, ReadSchema, UpdateSchema) for the given model."""
    write_fields: dict = {}
    read_fields: dict = {}

    for column in inspect(model).columns:
        py_type = column.type.python_type
        if column.primary_key and column.autoincrement is True:
            # Auto-generated key: exposed on read, never accepted on write.
            read_fields[column.name] = (py_type, ...)
            continue
        if column.nullable:
            write_fields[column.name] = (Optional[py_type], None)
            read_fields[column.name] = (Optional[py_type], None)
        else:
            write_fields[column.name] = (py_type, ...)
            read_fields[column.name] = (py_type, ...)

    name = model.__name__
    create_schema = create_model(f"{name}Create", **write_fields)
    update_schema = create_model(
        f"{name}Update",
        **{k: (Optional[t[0]], None) for k, t in write_fields.items()},
    )
    read_schema = create_model(
        f"{name}Read",
        __config__=ConfigDict(from_attributes=True),
        **read_fields,
    )
    return create_schema, read_schema, update_schema
