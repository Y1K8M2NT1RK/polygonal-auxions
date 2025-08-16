## SECTION 開発 / Build & Run
# 開発関連ターゲット
.PHONY: dev prebuild build build-docker build-with-debug vercel-build start start-detached app-stop smoke clean-build-smoke app-restart restart-local

# Next.js 開発サーバ起動 (npm run dev 相当)
dev:
	$(NPM) run dev

# ビルド前のクリーン処理 (scripts/clean.sh)
prebuild:
	sh scripts/clean.sh

# アプリ全体をビルド (scripts/build.sh)
build:
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[build] SKIP_LOCAL_BUILD=1 -> skip local build"; exit 0; fi; \
	sh scripts/build.sh

# コンテナ内ビルド用エイリアス (build:docker)
build-docker: build

# NEXT_DEBUG フラグ付きビルド
build-with-debug:
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[build-with-debug] SKIP_LOCAL_BUILD=1 -> skip local build"; exit 0; fi; \
	NEXT_DEBUG=true $(NPM) run build

# Vercel CLI / 手動デプロイ用 本番ビルド手順
vercel-build:
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[vercel-build] SKIP_LOCAL_BUILD=1 -> skip (assume remote build will run)"; exit 0; fi; \
	VERCEL_BUILD=true $(PRISMA) generate && \
	$(PRISMA) migrate deploy && \
	graphql-codegen && \
	next build && \
	$(PRISMA) db seed

# アプリ起動 (scripts/start.sh)
start:
	sh scripts/start.sh

# アプリをデタッチ起動 (scripts/start_detached.sh)
start-detached:
	sh scripts/start_detached.sh

# アプリ停止 (scripts/stop.sh) 旧ターゲット名 stop -> app-stop (Docker 停止と区別)
app-stop:
	sh scripts/stop.sh

# スモークテスト実行 (scripts/smoke.sh)
smoke:
	sh scripts/smoke.sh

## clean-build-smoke: クリーン -> ビルド -> スモーク (画面確認のため起動を維持)
clean-build-smoke:
	sh scripts/clean.sh && \
	sh scripts/build.sh && \
	SMOKE_PORT=$${SMOKE_PORT:-3001} SMOKE_KEEP_RUNNING=1 sh scripts/smoke.sh
	@echo "Open: http://localhost:$${SMOKE_PORT:-3001}/"

## clean-build-smoke-once: クリーン -> ビルド -> スモーク (確認後に停止)
clean-build-smoke-once:
	sh scripts/clean.sh && \
	sh scripts/build.sh && \
	SMOKE_PORT=$${SMOKE_PORT:-3001} SMOKE_KEEP_RUNNING=0 sh scripts/smoke.sh

## app-restart: ローカルNext本番 (next start) を衝突回避のため停止 -> 前景起動
app-restart:
	STOP_PORT=$${PORT:-3000} sh scripts/stop.sh || true && \
	sh scripts/start.sh

## restart-local: app-restart の別名（Docker の restart と混同しないため分離）
restart-local: app-restart
