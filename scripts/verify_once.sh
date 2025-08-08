#!/usr/bin/env sh
set -eu

# verify_once.sh
#  - 一時コンテナ(app)を起動して build→smoke を実行します。
#  - ホストのnpmスクリプトから呼び出されます。

# HOST/PORT/SMOKE_* は呼び出し元で上書き可能です。
exec docker compose run --rm --service-ports \
  -e SMOKE_HOST="${SMOKE_HOST:-localhost}" \
  -e SMOKE_PORT="${SMOKE_PORT:-3000}" \
  app sh -lc "npm run build:docker && npm run smoke"
