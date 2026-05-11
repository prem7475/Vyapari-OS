# Backend Setup (Node.js + Express)

Location:
- `services/api`

Entry:
- `services/api/server/server.js`

Core modules:
- Config: `services/api/server/src/config/env.js`
- HTTP app: `services/api/server/src/app.js`
- DB pool: `services/api/server/src/db/pool.js`
- Auth (Firebase → JWT): `services/api/server/src/modules/auth/*`

Endpoints (current):
- `GET /health`
- `POST /v1/auth/otp/verify` (expects `firebase_id_token`)

