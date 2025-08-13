#!/usr/bin/env sh
set -eu

# start_detached.sh
#  - Next.jsをバックグラウンド起動し、PIDを .next/next.pid に保存します。
#  - smoke.sh などの一時起動で利用します（ビルド済み .next を利用します）。
mkdir -p .next
HOST="${HOST:-0.0.0.0}" PORT="${PORT:-3000}" next start -H "$HOST" -p "$PORT" > .next/next.log 2>&1 &
echo $! > .next/next.pid
