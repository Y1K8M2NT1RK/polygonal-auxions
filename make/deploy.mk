## SECTION デプロイ / Vercel Manual Deploy
# 手動デプロイ支援ターゲット
.PHONY: deploy-preview deploy-prod deploy-preview-fresh deploy-prod-fresh _deploy-common _deploy-install

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
	npx prisma generate
	npx graphql-codegen
	npm run build

# Preview デプロイ
deploy-preview: _deploy-common
	npx vercel --prebuilt --confirm || { echo "[deploy] vercel preview failed" >&2; exit 1; }

# Production デプロイ
deploy-prod: _deploy-common
	npx vercel deploy --prod --prebuilt --confirm || { echo "[deploy] vercel prod failed" >&2; exit 1; }

# 強制再インストール付きショートカット
deploy-preview-fresh: FORCE_CI=1
deploy-preview-fresh: deploy-preview

deploy-prod-fresh: FORCE_CI=1
deploy-prod-fresh: deploy-prod
