# Phase 1 — System Architecture (Vyapari OS)

## 1) Mobile App Architecture (Flutter)

**Principles**
- Feature-first + Clean Architecture boundaries
- Offline-first for forms and drafts (Hive)
- API-first with OpenAPI-driven contracts
- Auth: Firebase OTP → backend JWT (access/refresh)

**Layers (within each feature)**
- `presentation/` (screens, widgets, controllers)
- `application/` (use-cases, orchestration)
- `domain/` (entities, value objects, interfaces)
- `data/` (DTOs, mappers, repositories, remote/local sources)

**State + Networking**
- Riverpod: `StateNotifier`/`AsyncNotifier` per feature controller
- Dio: single configured client in `core/network/`
- Global interceptors:
  - attach JWT
  - refresh token flow
  - structured error mapping → `AppFailure`
- Firebase Auth used only for OTP verification; backend is source of truth for user profile/business state

**Offline**
- Hive boxes:
  - `auth_tokens`
  - `user_cache`
  - `draft_requests` (service flows, KYC drafts, documents pending upload)

**Observability**
- Central `Logger` + crash reporting hooks (pluggable)
- Network request IDs propagated from mobile → API for traceability

## 2) Backend Architecture (Node.js + Express)

**High-level**
- API Gateway (Express) serving REST + WebSocket (support chat)
- PostgreSQL for core system-of-record
- AWS S3 for documents (private bucket + signed URLs)
- Razorpay for payments (orders, webhooks, invoices)
- Firebase Admin for OTP verification + user identity bootstrap

**Service boundaries (within `services/api`)**
- `auth` (firebase verify, session tokens, device sessions)
- `users` (profile, preferences)
- `businesses` (business entity, owners, KYC)
- `catalog` (service marketplace, pricing, SLAs)
- `requests` (service request lifecycle, assignment, workflow)
- `documents` (upload init, validation, signed URLs, verification)
- `payments` (razorpay orders, capture/verify, webhooks)
- `notifications` (in-app, email/sms hooks later)
- `support` (chat, tickets)
- `admin` (queue, assignment, moderation, audit)

**Core backend patterns**
- Route → Controller → Service → Repository
- All inputs validated (Zod/Joi) at boundary
- RBAC: `user`, `admin`, `ops`, `reviewer`
- Audit log for all admin actions + request state transitions
- Idempotency keys on write endpoints and Razorpay webhook handlers

**Security**
- Helmet secure headers
- Rate limiting (OTP endpoints + auth + uploads)
- File validation (mime sniffing + size + extensions allowlist)
- S3: private objects; access via short-lived signed URLs

## 3) Website Architecture (Next.js Marketing)

**Goals**
- SEO-first, high trust, fast
- Static + ISR where possible
- Lead capture → API (`/leads`) with spam protection

**Structure**
- App Router
- Tailwind for design system tokens
- Framer Motion for premium micro-interactions
- Content modeled as typed objects (or later CMS)

## 4) Database Schema Design (PostgreSQL)

**Design rules**
- UUID primary keys
- `created_at`, `updated_at`, `deleted_at` (soft delete) where applicable
- Status enums for request workflows (typed and audited)
- Append-only `audit_events` for admin + workflow tracing
- Use `citext` for email, normalized phone

**Core entities**
- Users, Businesses, Services (catalog), Requests, Uploaded Documents, Payments, Notifications, Support Chats

See: `docs/03-database-schema.md` (created in Phase 3 work; placeholder tracked in `docs/02-folder-structure.md`).

## 5) Admin Dashboard Architecture (Next.js)

**Goals**
- Ops-first: queue, assignment, verification, payments, support
- Strict RBAC and audit trail

**Structure**
- Next.js App Router
- Server Actions for admin mutations (or REST calls to API)
- Table-heavy UI with filters, saved views, bulk actions
- Real-time: request updates + chats via WebSocket/SSE

## 6) AI Service Architecture (Python + FastAPI)

**Responsibilities**
- Business-type parsing from user text
- Recommendation engine (compliance + platform onboarding)
- Explainable outputs (reason + next steps + required documents)
- Versioned prompts/rules for reproducibility

**Integration**
- API calls AI service: `POST /v1/recommendations`
- AI service returns structured JSON recommendations
- API persists recommendations in Postgres for history and ops review

## 7) API Flow Diagram (text)

### Auth (OTP → JWT)
1. Mobile: `POST /v1/auth/otp/start` (phone)
2. Mobile: OTP verified with Firebase (client) → gets `firebase_id_token`
3. Mobile: `POST /v1/auth/otp/verify` (firebase_id_token, device info)
4. API: verifies token via Firebase Admin → upserts user → issues JWT access/refresh
5. Mobile: stores tokens in Hive; attaches JWT on all requests

### Document Upload (S3 signed URL)
1. Mobile: `POST /v1/documents/upload/init` (request_id, doc_type, file_meta)
2. API: validates + creates `uploaded_documents` row → returns `signed_put_url`
3. Mobile: uploads file directly to S3 via signed URL
4. Mobile: `POST /v1/documents/upload/complete` (document_id)
5. API: marks document uploaded; optional async verification pipeline

### Service Request Lifecycle
1. Mobile: `POST /v1/requests` (service_id, business_id, payload)
2. API: creates request in `NEW` → emits notification + audit event
3. Admin: assigns request `POST /v1/admin/requests/:id/assign`
4. Ops: updates status (`IN_PROGRESS` → `NEED_DOCS` → `COMPLETED`)
5. Mobile: polls or subscribes to updates; shows timeline

### Payments (Razorpay)
1. Mobile: `POST /v1/payments/orders` (request_id, amount)
2. API: creates Razorpay order + `payments` row → returns order info
3. Mobile: pays via Razorpay SDK
4. Mobile: `POST /v1/payments/verify` (razorpay_payment_id, signature)
5. API: verifies signature → updates payment state → updates request state
6. Razorpay: webhook → `POST /v1/webhooks/razorpay` (idempotent)

