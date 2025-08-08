#!/usr/bin/env sh
set -eu

# stop.sh
#  - start_detached.sh で起動したNext.jsを停止します。
#  - PIDファイルが無ければ何もしません。

if [ -f .next/next.pid ]; then
  kill "$(cat .next/next.pid)" 2>/dev/null || true
fi
