#!/usr/bin/env sh
set -eu

# verify_compose.sh
#  - verify プロファイルのサービスを利用して、ビルド+スモークテストを一括実行します。
#  - CIや手元での包括テストに適しています。

exec docker compose --profile verify up --build verify --abort-on-container-exit --exit-code-from verify
