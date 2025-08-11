## SECTION 検証 / Lint & Test
# 検証関連ターゲット
.PHONY: docker-verify lint verify v verify-all

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

# app 停止→(必要なら)既存 verify 環境クリーン→ビルド+スモーク (verify プロファイル) を一括実行
verify-all:
	@echo "[verify-all] stopping running app container if present..."; \
	(docker compose ps --status=running | grep -q "app" && docker compose stop app) || true; \
	echo "[verify-all] running verify profile (build + smoke)..."; \
	docker compose --profile verify up --build --abort-on-container-exit --exit-code-from verify verify; \
	status=$$?; \
	echo "[verify-all] cleaning up verify services..."; \
	docker compose rm -fsv verify >/dev/null 2>&1 || true; \
	if [ $$status -eq 0 ]; then \
	  echo "[verify-all] success: restarting app stack (db app prisma-studio)"; \
	  docker compose up -d db app prisma-studio; \
	else \
	  echo "[verify-all] failed (exit=$$status): NOT restarting app stack"; \
	fi; \
	exit $$status
