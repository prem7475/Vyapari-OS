#!/usr/bin/env bash
set -euo pipefail

if [ -z "${PG_RESTORE_FILE:-}" ]; then
  echo "PG_RESTORE_FILE is not set"
  exit 1
fi

echo "Restoring database from $PG_RESTORE_FILE"
PGPASSWORD="${PG_PASSWORD:-postgres}" pg_restore \
  --host="${PG_HOST:-localhost}" \
  --port="${PG_PORT:-5432}" \
  --username="${PG_USERNAME:-postgres}" \
  --dbname="${PG_DATABASE:-vyapari}" \
  --clean \
  --if-exists \
  "$PG_RESTORE_FILE"

echo "Restore complete"
