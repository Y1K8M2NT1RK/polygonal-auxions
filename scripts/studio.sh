#!/usr/bin/env bash
set -euo pipefail

# Launch Prisma Studio via dedicated container (preferred) or fallback to app
MODE=${1:-container}

if [[ "$MODE" == "app" ]]; then
  echo "[studio] Running inside existing app container on port 5555"
  docker compose exec app npx prisma studio --port 5555 --browser none
  exit $?
fi

# Ensure db is up
if ! docker compose ps db >/dev/null 2>&1; then
  echo "[studio] Starting database (detached)" >&2
  docker compose up -d db
fi

echo "[studio] Starting dedicated prisma-studio container (port 5555)"
docker compose up -d prisma-studio

echo "[studio] Logs (Ctrl+C to detach, container keeps running):"
docker compose logs -f --tail=20 prisma-studio
