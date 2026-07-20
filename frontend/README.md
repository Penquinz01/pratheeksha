# Pratheeksha Frontend

Minimalist React (Vite) admin panel for the backend API. No UI library — a
single small stylesheet.

## How it stays zero-maintenance

On login the app fetches the backend's `/openapi.json` and builds the whole UI
from it: every CRUD feature module in the backend becomes a sidebar section
with a paginated, filterable table and auto-generated add/edit forms. Adding a
new backend feature requires **no frontend changes at all**.

```
src/
├── api/client.js      # fetch wrapper: base URL, JWT header, 401 handling
├── api/openapi.js     # discovers resources + field types from /openapi.json
├── auth/              # AuthContext (token state, login/logout)
├── pages/             # LoginPage, ResourcePage (table + pagination + filter)
└── components/        # ResourceForm (form generated from the schema)
```

## Development

```bash
npm install
npm run dev            # http://localhost:5173 (backend must run on :8000)
```

The dev build talks to `http://localhost:8000` directly (override with
`VITE_API_URL`); that origin is already in the backend's CORS list.

## Production (Docker)

Built and served by the compose stack in `../backend`:

```bash
cd ../backend
docker compose up -d --build
```

Frontend on `http://localhost:3000`. nginx serves the static build and proxies
`/api/*` to the backend container, so no CORS configuration is needed.
