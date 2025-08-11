## SECTION コンテナ / Docker & Orchestration
# Docker / コンテナ関連ターゲット
.PHONY: dc-build db studio studio-app up down stop containers-stop restart logs ps prune down-v

# 対象サービス一覧 (指定しなければ全サービス停止: 空なら docker compose stop = 全)
SERVICES ?=
# ログの追跡行数 (logs ターゲット)
TAIL ?= 120

# Docker イメージビルド (scripts/dc_build.sh)
dc-build:
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[dc-build] SKIP_LOCAL_BUILD=1 -> skip docker image build"; exit 0; fi; \
	sh scripts/dc_build.sh

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
