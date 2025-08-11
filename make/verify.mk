## SECTION 検証 / Lint & Test
# 検証関連ターゲット
.PHONY: docker-verify lint verify v

# 一度きりの Docker 検証パイプライン (scripts/verify_once.sh)
docker-verify:
	sh scripts/verify_once.sh

# ESLint 実行
lint:
	$(NPM) run lint

# 総合検証実行 (scripts/verify_compose.sh)
verify:
	sh scripts/verify_compose.sh

# verify の短縮エイリアス
v: verify
