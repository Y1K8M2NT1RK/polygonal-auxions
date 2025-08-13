## SECTION デプロイ / Vercel Manual Deploy
# 手動デプロイ支援ターゲット
.PHONY: deploy-preview deploy-prod deploy-preview-fresh deploy-prod-fresh _deploy-common _deploy-install vercel-link vercel-link-debug vercel-link-docker

# 共通: 依存セットアップ (node_modules が無ければ npm ci)。FORCE_CI=1 で強制再インストール
_deploy-install:
	@if [ ! -d node_modules ] || [ -n "$$FORCE_CI" ]; then \
	  echo "[deploy] installing dependencies (npm ci)"; \
	  npm ci; \
	else \
	  echo "[deploy] skip npm ci (node_modules present). Use FORCE_CI=1 to force."; \
	fi

# 共通: 生成 + ビルド
_deploy-common: _deploy-install
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then \
	  echo "[deploy] SKIP_LOCAL_BUILD set -> skip local prisma/codegen/build (Vercel remote build will run)"; \
	  exit 0; \
	fi; \
	echo "[deploy] local build start"; \
	npm run -s prisma:generate; \
	npx graphql-codegen; \
	npm run build

# Preview デプロイ
deploy-preview: _deploy-common
	@/bin/sh -c 'set -e; [ -f .env.vercel ] && { echo "[deploy] load .env.vercel"; . ./.env.vercel; }; \
	if [ -z "$$VERCEL_TOKEN" ]; then echo "[deploy] VERCEL_TOKEN 未設定 (.env.vercel に記載 or export してください)" >&2; exit 2; fi; \
	if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[deploy] using remote Vercel build"; else echo "[deploy] remote will build again (duplicate) ※最適化するには vercel build + --prebuilt を検討"; fi; \
	npx vercel deploy --yes --token "$$VERCEL_TOKEN"'

# Production デプロイ
deploy-prod: _deploy-common
	@/bin/sh -c 'set -e; [ -f .env.vercel ] && { echo "[deploy] load .env.vercel"; . ./.env.vercel; }; \
	if [ -z "$$VERCEL_TOKEN" ]; then echo "[deploy] VERCEL_TOKEN 未設定 (.env.vercel に記載 or export)" >&2; exit 2; fi; \
	if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[deploy] using remote Vercel build"; else echo "[deploy] remote will build again (duplicate) ※最適化するには vercel build + --prebuilt を検討"; fi; \
	npx vercel deploy --prod --yes --token "$$VERCEL_TOKEN"'

# 強制再インストール付きショートカット
deploy-preview-fresh: FORCE_CI=1
deploy-preview-fresh: deploy-preview

deploy-prod-fresh: FORCE_CI=1
deploy-prod-fresh: deploy-prod

# プロジェクト紐付け (.vercel/project.json を生成)
# 使用方法:
#   1) 既に Vercel 上で project 作成済み: 環境変数 VERCEL_PROJECT_ID と VERCEL_ORG_ID をセットし
#        make vercel-link
#      例: export VERCEL_PROJECT_ID=prj_xxxxx; export VERCEL_ORG_ID=team_xxxxx
#   2) まだ ID がわからない / 対話で選択したい:
#        export VERCEL_TOKEN=xxxxx (または npx vercel login で一時認証)
#        make vercel-link  (必要に応じて scope, project を対話選択)
#   3) 完全非対話 (CI): VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID を全部指定
# 生成物: .vercel/project.json (gitignore 済み)。
vercel-link:
	@/bin/sh -c 'set -e; mkdir -p .vercel; [ -f .env.vercel ] && { echo "[vercel-link] load .env.vercel"; . ./.env.vercel; }; \
	echo "[vercel-link] PROJECT_ID=$${VERCEL_PROJECT_ID:-<none>} ORG_ID=$${VERCEL_ORG_ID:-<none>} TOKEN=$${VERCEL_TOKEN:+set}"; \
	if [ -n "$$VERCEL_PROJECT_ID" ] && [ -n "$$VERCEL_ORG_ID" ]; then printf "{\n  \"projectId\": \"%s\",\n  \"orgId\": \"%s\"\n}\n" "$$VERCEL_PROJECT_ID" "$$VERCEL_ORG_ID" > .vercel/project.json; echo "[vercel-link] wrote .vercel/project.json"; exit 0; fi; \
	if [ -n "$$VERCEL_TOKEN" ]; then echo "[vercel-link] interactive linking via token"; npx vercel link --token "$$VERCEL_TOKEN"; exit 0; fi; \
	echo "[vercel-link] 必要な変数がありません (VERCEL_PROJECT_ID/VERCEL_ORG_ID か VERCEL_TOKEN)" >&2; exit 2'

# デバッグ: 読み込み状態を表示 (token は先頭4文字のみ)
vercel-link-debug:
	@/bin/sh -c '[ -f .env.vercel ] && { echo "[vercel-link-debug] load .env.vercel"; . ./.env.vercel; } || echo "[vercel-link-debug] .env.vercel not found"; \
	echo "VERCEL_PROJECT_ID=$${VERCEL_PROJECT_ID:-<empty>}"; echo "VERCEL_ORG_ID=$${VERCEL_ORG_ID:-<empty>}"; \
	if [ -n "$$VERCEL_TOKEN" ]; then echo "VERCEL_TOKEN=$$(printf "%s" "$$VERCEL_TOKEN" | cut -c1-4)********"; else echo "VERCEL_TOKEN=<empty>"; fi; \
	if [ -f .vercel/project.json ]; then echo "[vercel-link-debug] .vercel/project.json exists"; sed -n 1,5p .vercel/project.json; else echo "[vercel-link-debug] .vercel/project.json missing"; fi'

# Docker 経由で vercel link (.vercel/project.json をホストへ生成)
# 使い方:
#   export VERCEL_TOKEN=xxxxx  (or set VERCEL_PROJECT_ID/VERCEL_ORG_ID)
#   make vercel-link-docker
# 対話選択したい場合は token をセットした上で実行 (TTY 維持)
vercel-link-docker:
	@/bin/sh -c 'set -e; mkdir -p .vercel; [ -f .env.vercel ] && . ./.env.vercel; \
	if [ -n "$$VERCEL_PROJECT_ID" ] && [ -n "$$VERCEL_ORG_ID" ]; then printf "{\n  \"projectId\": \"%s\",\n  \"orgId\": \"%s\"\n}\n" "$$VERCEL_PROJECT_ID" "$$VERCEL_ORG_ID" > .vercel/project.json; echo "[vercel-link-docker] wrote .vercel/project.json"; exit 0; fi; \
	if [ -z "$$VERCEL_TOKEN" ]; then echo "[vercel-link-docker] missing vars" >&2; exit 2; fi; \
	echo "[vercel-link-docker] interactive link"; npx vercel link --token "$$VERCEL_TOKEN"'
