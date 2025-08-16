#!/usr/bin/env sh
set -eu

# stop.sh
#  - start_detached.sh で起動したNext.jsを停止します。
#  - PIDファイルが無ければポートベースで停止を試みます。
#  - STOP_PORT 環境変数で対象ポートを指定可能 (デフォルト: 3000)

STOP_PORT="${STOP_PORT:-3000}"

# 1) PIDファイルがあればそれを優先して停止
if [ -f .next/next.pid ]; then
  PID="$(cat .next/next.pid || true)"
  if [ -n "${PID:-}" ]; then
    kill "$PID" 2>/dev/null || true
  fi
  rm -f .next/next.pid 2>/dev/null || true
fi

# 2) ポートにバインドしているプロセスを停止 (ss / lsof 併用)
# ss 出力から pid=XXXX を抽出
PIDS_FROM_SS=$(ss -ltnp 2>/dev/null | awk -v p=":$STOP_PORT" '$4 ~ p {print $7}' | sed -E 's/.*pid=([0-9]+).*/\1/' | sort -u | xargs -r echo || true)
if [ -n "${PIDS_FROM_SS:-}" ]; then
  kill $PIDS_FROM_SS 2>/dev/null || true
fi

# lsof フォールバック
if command -v lsof >/dev/null 2>&1; then
  PIDS_FROM_LSOF=$(lsof -t -i :"$STOP_PORT" 2>/dev/null | sort -u | xargs -r echo || true)
  if [ -n "${PIDS_FROM_LSOF:-}" ]; then
    kill $PIDS_FROM_LSOF 2>/dev/null || true
  fi
fi

exit 0
