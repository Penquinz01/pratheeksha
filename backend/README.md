# Pratheeksha Backend

Lightweight, modular REST API built with **FastAPI + PostgreSQL**, mirroring the
tables of the original Access database (`Web_DB (1).accdb`). JWT authentication
protects every data endpoint.

## Architecture

```
app/
├── main.py                  # App factory; auto-discovers feature routers
├── core/                    # Shared infrastructure (no business logic)
│   ├── config.py            # Env-based settings
│   ├── database.py          # Engine / session / Base
│   ├── security.py          # bcrypt hashing + JWT
│   ├── schema_factory.py    # Pydantic schemas generated from models
│   └── crud_router.py       # Generic authenticated CRUD router factory
├── auth/                    # Authentication feature (register/login/me)
└── features/                # One folder per data feature
    └── <feature>/
        ├── models.py        # SQLAlchemy model (single source of truth)
        └── router.py        # One line: build_crud_router(Model, ...)
```

**Adding a new feature requires zero changes to existing code**: create
`app/features/my_feature/` with a `models.py` and a two-line `router.py`.
It is discovered and mounted automatically, its table is created on startup,
and its Create/Read/Update schemas are derived from the model.

## Endpoints

- `POST /auth/register` — create a user (disable with `ALLOW_REGISTRATION=false` after setup)
- `POST /auth/login` — OAuth2 password form → JWT bearer token
- `GET /auth/me` — current user
- For each feature (all require `Authorization: Bearer <token>`):
  - `GET /<feature>/` — list, with `skip`/`limit` pagination and exact-match
    filtering on any column, e.g. `GET /dependent-master/?prfml_id=12`
  - `GET /<feature>/{id}` · `POST /<feature>/` · `PATCH /<feature>/{id}` · `DELETE /<feature>/{id}`
- Interactive docs: `http://localhost:8000/docs`

Feature prefixes: `/contact-master`, `/dependent-master`, `/academic-tracking`,
`/attendance-tracking`, `/communication-tracking`, `/dependent-activity-tracking`,
`/dependent-communication-tracking`, `/dependent-edu-tracking`,
`/dependent-feedback-tracking`, `/health-issue-tracking`,
`/noorul-quran-tracking`, `/visit-tracking`.

## Run (production, Docker)

```bash
cp .env.example .env    # then set real SECRET_KEY + passwords
docker compose up -d --build
```

API on `http://localhost:8000`, Postgres on `localhost:5432` (data persisted in
the `pgdata` volume). Generate a secret: `openssl rand -hex 32`.

## Run (local development)

```bash
python -m venv .venv && .venv/Scripts/activate
pip install -r requirements.txt
docker compose up -d db
uvicorn app.main:app --reload
```

## Import the Access data

Windows host only (needs the Microsoft Access ODBC driver). The script copies
the original `.accdb` to `Web_DB_copy.accdb` first — the original is never
opened or modified — and skips tables that already contain data.

```bash
pip install pyodbc
python scripts/import_access.py "Web_DB (1).accdb"
```

## Security notes

- Set a strong `SECRET_KEY` and DB password in `.env` (never committed).
- Set `ALLOW_REGISTRATION=false` once your users are created.
- Restrict `CORS_ORIGINS` to your real frontend origin in production.
- Put a TLS-terminating reverse proxy (Caddy/Nginx/Traefik) in front of port 8000.
