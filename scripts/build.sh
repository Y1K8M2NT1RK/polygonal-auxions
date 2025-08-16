#!/usr/bin/env sh
set -eu

# build.sh
#  - Next.js本番ビルドを実行します。
#  - ビルド直前に clean.sh を呼び出し、.next/node_modules の残骸を除去し、チャンク不整合の再発を防ぎます。
#  - NEXT_DEBUG=1 でデバッグログを有効化できます。

if [ "${NEXT_DEBUG:-}" = "true" ] || [ "${NEXT_DEBUG:-}" = "1" ]; then
  echo "[build] NEXT_DEBUG is enabled"
fi

# キャッシュクリア（verify 等の都度実行を保証）
sh scripts/clean.sh

# PrismaやGraphQLコード生成が必要なら必要箇所で実行してください。
# 例: prisma generate / graphql-codegen など（本プロジェクトではvercel-buildで実行）

npx next build
