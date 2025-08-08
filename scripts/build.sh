#!/usr/bin/env sh
set -eu

# build.sh
#  - Next.js本番ビルドを実行します。
#  - prebuild（clean.sh）が先に走るため、.next/node_modulesの残骸を除去し、#5の再発を防ぎます。
#  - NEXT_DEBUG=1 でデバッグログを有効化できます。

if [ "${NEXT_DEBUG:-}" = "true" ] || [ "${NEXT_DEBUG:-}" = "1" ]; then
  echo "[build] NEXT_DEBUG is enabled"
fi

# PrismaやGraphQLコード生成が必要なら必要箇所で実行してください。
# 例: prisma generate / graphql-codegen など（本プロジェクトではvercel-buildで実行）

next build
