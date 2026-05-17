#!/usr/bin/env bash
set -euo pipefail

if [ -z "${PG_BACKUP_DIR:-}" ]; then
  echo "PG_BACKUP_DIR is not set"
  exit 1
fi

mkdir -p "$PG_BACKUP_DIR"
BACKUP_FILE="$PG_BACKUP_DIR/vyapari_backup_$(date +%Y%m%d_%H%M%S).sql"

echo "Creating backup to $BACKUP_FILE"
PGPASSWORD="${PG_PASSWORD:-postgres}" pg_dump \
  --host="${PG_HOST:-localhost}" \
  --port="${PG_PORT:-5432}" \
  --username="${PG_USERNAME:-postgres}" \
  --format=custom \
  --file="$BACKUP_FILE" \
  "${PG_DATABASE:-vyapari}"

echo "Backup complete"
