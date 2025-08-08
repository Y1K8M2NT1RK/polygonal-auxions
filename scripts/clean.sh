#!/usr/bin/env sh
set -eu

# clean.sh
#  - ビルド前に残骸を削除し、チャンク不整合（#5）を防ぎます。
#  - .next と node_modules/.cache を削除します（存在しない場合は無視）。

rm -rf .next node_modules/.cache 2>/dev/null || true
