## SECTION 開発 / Build & Run
# 開発関連ターゲット
.PHONY: dev prebuild build build-docker build-with-debug vercel-build start start-detached app-stop smoke

# Next.js 開発サーバ起動 (npm run dev 相当)
dev:
	$(NPM) run dev

# ビルド前のクリーン処理 (scripts/clean.sh)
prebuild:
	sh scripts/clean.sh

# アプリ全体をビルド (scripts/build.sh)
build:
	sh scripts/build.sh

# コンテナ内ビルド用エイリアス (build:docker)
build-docker: build

# NEXT_DEBUG フラグ付きビルド
build-with-debug:
	NEXT_DEBUG=true $(NPM) run build

# Vercel CLI / 手動デプロイ用 本番ビルド手順
vercel-build:
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
