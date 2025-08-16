#!/usr/bin/env sh
set -eu

# smoke.sh
#  - Next.jsをバックグラウンド起動し、HTTPヘッダ1行目（例: HTTP/1.1 200 OK）を確認します。
#  - SMOKE_HOST/SMOKE_PORT/SMOKE_PATH でテスト先を上書き可能です。
#  - 既存の 3000 番プロセスによる衝突を避けるため、既定では 3001 番を利用します。

SMOKE_HOST="${SMOKE_HOST:-localhost}"
SMOKE_PORT="${SMOKE_PORT:-3001}"
SMOKE_PATH="${SMOKE_PATH:-/}"
# 1の場合、終了時にサーバーを停止しない（画面確認用）
SMOKE_KEEP_RUNNING="${SMOKE_KEEP_RUNNING:-0}"

# 既存プロセスの停止（PID/ポート両面）
STOP_PORT="$SMOKE_PORT" sh scripts/stop.sh || true

# 終了時のクリーンアップ（KEEP_RUNNING=1 の場合は停止しない）
if [ "$SMOKE_KEEP_RUNNING" != "1" ]; then
  cleanup() {
    STOP_PORT="$SMOKE_PORT" sh scripts/stop.sh || true
  }
  trap cleanup EXIT INT TERM
fi

# バックグラウンド起動（環境変数でポート指定を伝播）
HOST="0.0.0.0" PORT="$SMOKE_PORT" sh scripts/start_detached.sh

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

if [ "$SMOKE_KEEP_RUNNING" = "1" ]; then
  # 稼働継続: URLを出力して終了
  echo "Server is running for manual check: http://${SMOKE_HOST}:${SMOKE_PORT}${SMOKE_PATH}"
  exit 0
fi

# 疎通確認: 先頭行のみ表示（停止前のチェック）
curl -sS -I "http://${SMOKE_HOST}:${SMOKE_PORT}${SMOKE_PATH}" | head -n 1
