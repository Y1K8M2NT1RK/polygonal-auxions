#!/usr/bin/env bash
set -euo pipefail

echo "[vercel-build] Node $(node -v) npm $(npm -v)"

# If DATABASE_URL is absent, perform a reduced build (skip migrate/seed) so that
# preview or static analysis builds don't fail. Production MUST provide DATABASE_URL.
if [ -z "${DATABASE_URL:-}" ]; then
  echo "[vercel-build] WARN: DATABASE_URL が未設定のため migrate/seed をスキップします (本番では必須)" >&2
  npm run -s prisma:generate
  graphql-codegen
  next build
  exit 0
fi

echo "[vercel-build] Running full pipeline (prisma generate -> migrate deploy -> codegen -> next build -> seed)"

npm run -s prisma:generate
if ! prisma migrate deploy; then
  echo "[vercel-build] WARN: prisma migrate deploy に失敗しました。継続します (本番DB接続を確認してください)" >&2
fi
graphql-codegen
next build
if ! prisma db seed; then
  echo "[vercel-build] WARN: prisma db seed に失敗しました。継続します" >&2
fi

echo "[vercel-build] 完了"