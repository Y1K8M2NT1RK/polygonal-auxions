## SECTION Docker Utility
## Docker コンテナ内で npm/npx/vercel/psql を実行する補助ターゲット

.PHONY: dc-up db-up npm-docker npx-docker vercel-docker psql-docker prisma-generate-docker migrate-deploy-docker seed-docker admin-promote-5

# Docker Compose up (DBのみ/全体)
dc-up:
	docker compose up -d

db-up:
	docker compose up -d db

# npm を app コンテナ内で実行
# 使い方: make npm-docker CMD="run build"
npm-docker: db-up
	docker compose run --rm app sh -lc "npm $(CMD)"

# npx を app コンテナ内で実行
# 使い方: make npx-docker CMD="prisma migrate status"
npx-docker: db-up
	docker compose run --rm app sh -lc "npx $(CMD)"

# vercel CLI を app コンテナ内で実行（環境変数は .env.vercel を手動で読み込むか外から渡してください）
# 使い方: make vercel-docker CMD="vercel deploy --prod --yes --token $$VERCEL_TOKEN"
vercel-docker: db-up
	docker compose run --rm app sh -lc "$(CMD)"

# psql を db コンテナ内で実行
# 使い方: make psql-docker SQL="SELECT now();"
psql-docker: db-up
	docker compose exec -T db sh -lc 'PGPASSWORD="$$POSTGRES_PASSWORD" psql -h 127.0.0.1 -U "$$POSTGRES_USER" -d "$$POSTGRES_DB" -c "$(SQL)"'

# よく使うショートカット
prisma-generate-docker: db-up
	docker compose run --rm -e VERCEL_BUILD=true app sh -lc "npm run -s prisma:generate"

migrate-deploy-docker: db-up
	docker compose run --rm app sh -lc "npx prisma migrate deploy"

seed-docker: db-up
	docker compose run --rm app sh -lc "npx prisma db seed"

# 直近作成の5ユーザーを ADMIN に昇格
admin-promote-5: db-up
	docker compose exec -T db sh -lc 'PGPASSWORD="$$POSTGRES_PASSWORD" psql -h 127.0.0.1 -U "$$POSTGRES_USER" -d "$$POSTGRES_DB" -c "UPDATE users SET role = '\''ADMIN'\'' WHERE id IN (SELECT id FROM users ORDER BY created_at DESC LIMIT 5);"'
## SECTION コンテナ / Docker & Orchestration
# Docker / コンテナ関連ターゲット
.PHONY: dc-build db studio studio-app up down stop containers-stop restart logs ps prune down-v docker-deps-install docker-deps-verify docker-reset-modules docker-next-clean

# 対象サービス一覧 (指定しなければ全サービス停止: 空なら docker compose stop = 全)
SERVICES ?=
# ログの追跡行数 (logs ターゲット)
TAIL ?= 120

## プロジェクト名推定 (compose の named volume 名に利用)
COMPOSE_PROJECT_NAME ?= $(shell basename $(CURDIR))
NODE_MODULES_VOLUME := $(COMPOSE_PROJECT_NAME)_node_modules

# Docker イメージビルド（compose ビルドを直接実行）
dc-build:
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[dc-build] SKIP_LOCAL_BUILD=1 -> skip docker image build"; exit 0; fi; \
	docker compose build

# 後方互換用エイリアス
db: dc-build

# Prisma Studio 起動 (専用コンテナ)
studio:
	./scripts/studio.sh

# 既存 app コンテナ内で Prisma Studio 起動
studio-app:
	./scripts/studio.sh app

# すべてのコンテナ (db, app, prisma-studio) をバックグラウンド起動
up:
	docker compose --profile dev up -d db app prisma-studio

# 起動中コンテナを停止 (ボリュームは保持)
down:
	docker compose down

# コンテナを停止 (削除せず: 状態保持) => docker compose stop 相当
# SERVICES 未指定なら全停止
stop:
	@if [ -n "$(SERVICES)" ]; then docker compose stop $(SERVICES); else docker compose stop; fi

# 後方互換エイリアス
containers-stop: stop

# 再起動 (stop -> up) SERVICES 未指定なら全サービス
restart:
	@if [ -n "$(SERVICES)" ]; then \
	  docker compose stop $(SERVICES) && docker compose up -d $(SERVICES); \
	else \
	  docker compose stop && docker compose up -d; \
	fi

# 稼働状況一覧 (docker compose ps)
ps:
	docker compose ps

# ログ追跡 (-f) SERVICES 未指定なら全部 / tail 行数は TAIL で調整
logs:
	@if [ -n "$(SERVICES)" ]; then docker compose logs -f --tail=$(TAIL) $(SERVICES); else docker compose logs -f --tail=$(TAIL); fi

# ボリューム含め完全停止 (データ消える) 確認: make down-v CONFIRM=1
down-v:
	@if [ "$(CONFIRM)" != "1" ]; then echo "[down-v] データも削除します。実行するには CONFIRM=1 を付けてください"; exit 1; fi; \
	docker compose down -v --remove-orphans

# プロジェクト関連リソースのクリーン (コンテナ停止後の orphan など) => 安全寄り
# 追加で build cache なども削除したい場合 FORCE=1 で builder prune
prune:
	docker compose rm -f -s || true
	@if [ "$(FORCE)" = "1" ]; then docker builder prune -f; fi

# 依存（node_modules）をコンテナ側にインストール（named volume への追加反映）
docker-deps-install:
	@echo "[docker-deps-install] installing dependencies inside container (app service)"; \
	docker compose run --rm app npm install --no-audit --no-fund

# 依存解決の存在確認（PKG=パッケージ名 省略時は @graphql-yoga/render-graphiql）
docker-deps-verify:
	@pkg="$${PKG:-@graphql-yoga/render-graphiql}"; \
	echo "[docker-deps-verify] checking: $$pkg"; \
	docker compose run --rm app node -e "require.resolve('$$pkg') && console.log('ok')"

# node_modules の named volume を初期化して再構築（破壊的）
# 使い方: make docker-reset-modules CONFIRM=1
docker-reset-modules:
	@if [ "$(CONFIRM)" != "1" ]; then \
	  echo "[docker-reset-modules] この操作は $(NODE_MODULES_VOLUME) を削除します。実行するには CONFIRM=1 を付けてください"; \
	  exit 1; \
	fi; \
	echo "[docker-reset-modules] stopping stack..."; \
	docker compose down; \
	echo "[docker-reset-modules] removing volume: $(NODE_MODULES_VOLUME)"; \
	docker volume rm $(NODE_MODULES_VOLUME) || true; \
	echo "[docker-reset-modules] rebuilding images (no cache)..."; \
	docker compose build --no-cache; \
	echo "[docker-reset-modules] starting stack (db app prisma-studio)..."; \
	docker compose up -d db app prisma-studio

# Next.js のビルド生成物 (.next) とキャッシュをアプリコンテナ内で削除し、再生成を促す
# 使い方: make docker-next-clean
docker-next-clean:
	@echo "[docker-next-clean] removing .next and node_modules/.cache in app container..."; \
	docker compose exec app sh -lc 'rm -rf .next node_modules/.cache || true' && \
	echo "[docker-next-clean] done. Reloading page will trigger fresh rebuild by next dev."
