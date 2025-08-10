#!/usr/bin/env bash
# (必要なら) chmod +x scripts/deploy_prod.sh を実行してください
set -euo pipefail

# 単一コマンドで preview/prod を切り替えてデプロイ
# 使用例:
#   scripts/deploy_prod.sh preview
#   scripts/deploy_prod.sh prod
# 省略時 preview

TARGET="${1:-preview}"
if [ "$TARGET" != "preview" ] && [ "$TARGET" != "prod" ] && [ "$TARGET" != "production" ]; then
  echo "Usage: $0 [preview|prod]" >&2
  exit 1
fi
MODE=$TARGET
[ "$MODE" = "prod" ] && MODE=production

# ビルド (Prisma generate/migrate, codegen, seed を含む vercel-build スクリプト利用)
npm run vercel-build

# Vercel トークン必須チェック
if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "VERCEL_TOKEN が設定されていません" >&2
  exit 1
fi

if [ "$MODE" = "preview" ]; then
  npx vercel deploy --prebuilt --token "$VERCEL_TOKEN"
else
  npx vercel deploy --prod --prebuilt --token "$VERCEL_TOKEN"
fi
