# Phase 1 — Folder Structures (Monorepo)

Top-level layout (created as real folders in this repo):

```
.
├─ apps/
│  ├─ mobile/        # Flutter app (Riverpod/Dio/Firebase/Hive/GoRouter)
│  ├─ web/           # Next.js marketing website (Tailwind/Framer Motion)
│  └─ admin/         # Next.js admin dashboard (Ops + RBAC)
├─ services/
│  ├─ api/           # Node.js + Express API (Postgres/S3/Razorpay/Firebase/JWT)
│  └─ ai/            # Python + FastAPI AI service
├─ packages/
│  └─ shared/        # Shared TypeScript types/utilities (web/admin/api)
├─ infra/
│  ├─ db/            # migrations, seeds, schema
│  ├─ docker/        # local dev compose, images
│  └─ scripts/       # automation scripts
└─ docs/             # architecture, API, runbooks
```

Component-level structures are scaffolded next in Phase 2/3/4/5/6 work.

