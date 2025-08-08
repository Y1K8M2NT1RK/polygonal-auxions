#!/usr/bin/env sh
set -eu

# smoke.sh
#  - Next.jsをバックグラウンド起動し、HTTPヘッダ1行目（例: HTTP/1.1 200 OK）を確認します。
#  - HOST/PORT/SMOKE_* は環境変数で上書き可能です。

SMOKE_HOST="${SMOKE_HOST:-localhost}"
SMOKE_PORT="${SMOKE_PORT:-3000}"
SMOKE_PATH="${SMOKE_PATH:-/}"

# バックグラウンド起動
sh scripts/start_detached.sh

# 起動待ち（最大60秒）
ready=0
for i in $(seq 1 60); do
  if curl -sS -I "http://${SMOKE_HOST}:${SMOKE_PORT}${SMOKE_PATH}" >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 1
done

if [ "$ready" -ne 1 ]; then
  echo "Server did not become ready within timeout" >&2
  echo "--- Next.js last 100 log lines ---" >&2
  tail -n 100 .next/next.log >&2 || true
  exit 1
fi

# 疎通確認: 先頭行のみ表示
curl -sS -I "http://${SMOKE_HOST}:${SMOKE_PORT}${SMOKE_PATH}" | head -n 1

# 停止
sh scripts/stop.sh
