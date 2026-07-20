"""One-time import of the Access database into PostgreSQL.

Runs on the Windows host (needs the Microsoft Access ODBC driver + pyodbc).
Per the project rules the original .accdb is never touched: the script works
on a fresh copy of it.

Usage (from the backend/ directory, with the dockerized Postgres running):
    pip install pyodbc
    python scripts/import_access.py "Web_DB (1).accdb"

Set DATABASE_URL (or .env) to point at Postgres, e.g.
    postgresql+psycopg://pratheeksha:...@localhost:5432/pratheeksha
"""
import datetime
import shutil
import sys
from pathlib import Path

import pyodbc
from sqlalchemy import func, select, text

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.core.database import Base, SessionLocal, engine  # noqa: E402
from app.main import discover_feature_routers  # noqa: E402

ACCESS_TABLES = [
    "PR_Family_Contact_Master",
    "PR_Family_Dependent_Master",
    "PR_Family_Academic_Tracking",
    "PR_Family_Attendence_Tracking",
    "PR_Family_Communication_Tracking",
    "PR_Family_Dependent_Activity_Tracking",
    "PR_Family_Dependent_Communication_Tracking",
    "PR_Family_Dependent_Edu_Tracking",
    "PR_Family_Dependent_Feedback_Tracking",
    "PR_Family_Health_Issue_Tracking",
    "PR_Family_Noorul_Quran_Tracking",
    "PR_Family_Visit_Tracking",
]


def convert(value, column):
    if value is None:
        return None
    if isinstance(value, datetime.datetime) and column.type.python_type is datetime.date:
        return value.date()
    if column.type.python_type is str:
        return str(value).strip() or None
    if column.type.python_type is int and isinstance(value, str):
        stripped = value.strip()
        return int(stripped) if stripped else None
    return value


def main() -> None:
    source = Path(sys.argv[1] if len(sys.argv) > 1 else "Web_DB (1).accdb")
    if not source.exists():
        sys.exit(f"Access file not found: {source}")

    working_copy = source.with_name("Web_DB_copy.accdb")
    shutil.copyfile(source, working_copy)
    print(f"Working on copy: {working_copy}")

    # Importing the routers registers every feature model on Base.metadata.
    list(discover_feature_routers())
    tables_by_name = {t.name: t for t in Base.metadata.sorted_tables}

    Base.metadata.create_all(engine)

    access = pyodbc.connect(
        r"Driver={Microsoft Access Driver (*.mdb, *.accdb)};" f"Dbq={working_copy.resolve()};"
    )
    cursor = access.cursor()

    with SessionLocal() as db:
        for access_name in ACCESS_TABLES:
            table = tables_by_name[access_name.lower()]
            existing = db.execute(select(func.count()).select_from(table)).scalar()
            if existing:
                print(f"SKIP {access_name}: table already has {existing} rows")
                continue

            cursor.execute(f"SELECT * FROM [{access_name}]")
            source_cols = [d[0].lower() for d in cursor.description]
            rows = [
                {
                    col: convert(val, table.c[col])
                    for col, val in zip(source_cols, row)
                    if col in table.c
                }
                for row in cursor.fetchall()
            ]
            if rows:
                db.execute(table.insert(), rows)
            db.commit()
            print(f"OK   {access_name}: imported {len(rows)} rows")

            # Re-sync the identity sequence after inserting explicit key values.
            pk = table.primary_key.columns.values()[0]
            db.execute(
                text(
                    "SELECT setval(pg_get_serial_sequence(:tbl, :col), "
                    "COALESCE((SELECT MAX(" + pk.name + ") FROM " + table.name + "), 1))"
                ),
                {"tbl": table.name, "col": pk.name},
            )
            db.commit()

    access.close()
    print("Import complete.")


if __name__ == "__main__":
    main()
