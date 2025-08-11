## SECTION デプロイ / Vercel Manual Deploy
# 手動デプロイ支援ターゲット
.PHONY: deploy-preview deploy-prod _deploy-common

# 共通: lockfile 前提のクリーンインストール + 生成 + ビルド
_deploy-common:
	npm ci
	npx prisma generate
	npx graphql-codegen
	npm run build

# Preview デプロイ
deploy-preview: _deploy-common
	npx vercel --prebuilt --confirm

# Production デプロイ
deploy-prod: _deploy-common
	npx vercel deploy --prod --prebuilt --confirm
