#!/usr/bin/env sh
set -eu

# start.sh
#  - Next.jsの本番起動を行います。
#  - HOST/PORTは環境変数で上書き可能です。

HOST="${HOST:-0.0.0.0}"
PORT="${PORT:-3000}"

exec next start -H "$HOST" -p "$PORT"
