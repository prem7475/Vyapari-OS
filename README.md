# Vyapari OS Production Deployment

Vyapari OS is a fullstack business operations platform built with Next.js, Node.js, PostgreSQL, Redis, AWS S3, and Docker.

## Infrastructure

- `docker-compose.yml` for local and production container orchestration
- `nginx/nginx.conf` for reverse proxy routing
- `server/Dockerfile` for backend container packaging
- `apps/web/Dockerfile` for frontend container packaging
- `ecosystem.config.js` for PM2 cluster process management
- `.github/workflows/deploy.yml` for CI/CD deployment

## Quickstart

### 1. Configure environment files

```bash
cp server/.env.example server/.env
cp apps/web/.env.example apps/web/.env
```

### 2. Start services locally

```bash
docker compose up --build
```

### 3. Validate health

Open `http://localhost/health` in your browser.

## Deployment

The GitHub Actions workflow builds the frontend and backend containers, publishes images to the configured registry, and deploys to the target host over SSH.

### Required secrets

- `DOCKER_REGISTRY`
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `SSH_HOST`
- `SSH_USER`
- `SSH_KEY`
- `SSH_PORT`
- `DEPLOY_PATH`

## Monitoring and Security

- Winston and Morgan log all requests and errors
- Health routes are exposed for liveness and readiness checks
- Helmet, rate limiting, CORS, and request sanitization protect the API
- Redis provides caching and session support
- S3 signed URLs secure document downloads
- Razorpay webhook verification prevents replay attacks

## Backup and Restore

### Backup

```bash
PG_HOST=localhost PG_PORT=5432 PG_USERNAME=postgres PG_PASSWORD=postgres PG_DATABASE=vyapari PG_BACKUP_DIR=./backups scripts/backup-db.sh
```

### Restore

```bash
PG_HOST=localhost PG_PORT=5432 PG_USERNAME=postgres PG_PASSWORD=postgres PG_DATABASE=vyapari PG_RESTORE_FILE=./backups/vyapari_backup.sql scripts/restore-db.sh
```

## Notes

- Use `COOKIE_SECURE=true` for production
- Populate `CORS_ORIGINS` with trusted domains only
- Keep all secrets in a secure vault or GitHub secret store
- Use the `health` endpoints for uptime monitoring and load balancer checks

