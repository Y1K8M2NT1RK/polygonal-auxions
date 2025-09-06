## SECTION データベース / Prisma
# Prisma 関連ターゲット
.PHONY: prisma-generate prisma-migrate seed prisma-all

# prisma generate 実行
prisma-generate:
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[prisma-generate] SKIP_LOCAL_BUILD=1 -> skip"; exit 0; fi; \
	$(PRISMA) generate && npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/fix-pothos-imports.ts

# 保留中マイグレーション適用 (deploy)
prisma-migrate:
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[prisma-migrate] SKIP_LOCAL_BUILD=1 -> skip"; exit 0; fi;
	set -e;
	if [ -f .nvmrc ]; then \
	  if [ -n "$$NVM_DIR" ] && [ -s "$$NVM_DIR/nvm.sh" ]; then . "$$NVM_DIR/nvm.sh"; nvm use >/dev/null || true; \
	  elif [ -s "$$HOME/.nvm/nvm.sh" ]; then . "$$HOME/.nvm/nvm.sh"; nvm use >/dev/null || true; \
	  elif [ -s "/usr/local/share/nvm/nvm.sh" ]; then . "/usr/local/share/nvm/nvm.sh"; nvm use >/dev/null || true; \
	  fi; \
	fi;
	if [ -f .env ]; then echo "[prisma-migrate] load .env (exporting)"; set -a; . ./.env; set +a; fi;
	# Compute host override URL if docker-compose DB hostname is used; needed even inside devcontainer
	if [ "$$DATABASE_HOST" = "db" ]; then \
	  HOST_DATABASE_URL="postgresql://$$DATABASE_USER:$$DATABASE_PASSWORD@127.0.0.1:$${DATABASE_PORT:-5432}/$$DATABASE_DB?schema=public"; \
	  echo "[prisma-migrate] prepared host DATABASE_URL=$${HOST_DATABASE_URL}"; \
	fi;
	if [ -z "$$IN_DOCKER" ]; then \
	  echo "[prisma-migrate] ensure docker db is up"; docker compose up -d db >/dev/null 2>&1 || true; \
	  echo "[prisma-migrate] waiting for postgres to be ready..."; \
	  for i in {1..40}; do \
	    if docker compose exec -T db sh -lc "pg_isready -h 127.0.0.1 -p 5432 -U '$$POSTGRES_USER'" >/dev/null 2>&1; then echo "[prisma-migrate] db is ready"; break; fi; \
	    sleep 0.5; \
	  done; \
	fi;
	echo "[prisma-migrate] env: DATABASE_HOST=$${DATABASE_HOST} DATABASE_PORT=$${DATABASE_PORT} DATABASE_URL=$${DATABASE_URL}";
	if [ -n "$$HOST_DATABASE_URL" ]; then echo "[prisma-migrate] executing with DATABASE_URL override"; DATABASE_URL="$$HOST_DATABASE_URL" $(PRISMA) migrate deploy; else echo "[prisma-migrate] executing with default DATABASE_URL"; $(PRISMA) migrate deploy; fi

# DB シード実行
seed:
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[seed] SKIP_LOCAL_BUILD=1 -> skip"; exit 0; fi;
	set -e;
	if [ -f .nvmrc ]; then \
	  if [ -n "$$NVM_DIR" ] && [ -s "$$NVM_DIR/nvm.sh" ]; then . "$$NVM_DIR/nvm.sh"; nvm use >/dev/null || true; \
	  elif [ -s "$$HOME/.nvm/nvm.sh" ]; then . "$$HOME/.nvm/nvm.sh"; nvm use >/dev/null || true; \
	  elif [ -s "/usr/local/share/nvm/nvm.sh" ]; then . "/usr/local/share/nvm/nvm.sh"; nvm use >/dev/null || true; \
	  fi; \
	fi;
	if [ -f .env ]; then echo "[seed] load .env (exporting)"; set -a; . ./.env; set +a; fi;
	# Compute host override URL if docker-compose DB hostname is used; needed even inside devcontainer
	if [ "$$DATABASE_HOST" = "db" ]; then \
	  HOST_DATABASE_URL="postgresql://$$DATABASE_USER:$$DATABASE_PASSWORD@127.0.0.1:$${DATABASE_PORT:-5432}/$$DATABASE_DB?schema=public"; \
	  echo "[seed] prepared host DATABASE_URL=$${HOST_DATABASE_URL}"; \
	fi;
	if [ -z "$$IN_DOCKER" ]; then \
	  echo "[seed] ensure docker db is up"; docker compose up -d db >/dev/null 2>&1 || true; \
	  echo "[seed] waiting for postgres to be ready..."; \
	  for i in {1..40}; do \
	    if docker compose exec -T db sh -lc "pg_isready -h 127.0.0.1 -p 5432 -U '$$POSTGRES_USER'" >/dev/null 2>&1; then echo "[seed] db is ready"; break; fi; \
	    sleep 0.5; \
	  done; \
	fi;
	echo "[seed] env: DATABASE_HOST=$${DATABASE_HOST} DATABASE_PORT=$${DATABASE_PORT} DATABASE_URL=$${DATABASE_URL}";
	if [ -n "$$HOST_DATABASE_URL" ]; then echo "[seed] executing with DATABASE_URL override"; DATABASE_URL="$$HOST_DATABASE_URL" npm run -s seed; else echo "[seed] executing with default DATABASE_URL"; npm run -s seed; fi

# 複合: generate + migrate + seed を一括
# Prisma 一連処理
prisma-all: prisma-generate prisma-migrate seed
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[prisma-all] SKIP_LOCAL_BUILD=1 -> all steps already skipped"; fi
## SECTION データベース / Prisma
# Prisma 関連ターゲット（bash で単一シェル実行）
SHELL := /bin/bash
.ONESHELL:
SHELLFLAGS := -e -o pipefail -c
define _prisma_env_prepare
	if [ -f .env ]; then echo "[$@] load .env (exporting)"; set -a; . ./.env; set +a; fi
	if [ -z "$$IN_DOCKER" ]; then
		echo "[$@] ensure docker db is up"; docker compose up -d db >/dev/null 2>&1 || true
		echo "[$@] waiting for postgres to be ready..."
		for i in {1..40}; do
			if docker compose exec -T db sh -lc 'pg_isready -h 127.0.0.1 -p 5432 -U "$$POSTGRES_USER"' >/dev/null 2>&1; then echo "[$@] db is ready"; break; fi
			sleep 0.5
		done
		  if [ \"$$DATABASE_HOST\" = \"db\" ]; then \
		    export DATABASE_URL=\"postgresql://$$DATABASE_USER:$$DATABASE_PASSWORD@127.0.0.1:$${DATABASE_PORT:-5432}/$$DATABASE_DB?schema=public\"; \
		    echo \"[prisma-migrate] set DATABASE_URL for host access (-> 127.0.0.1:$${DATABASE_PORT:-5432})\"; \
		  fi; \
		if [ "$$DATABASE_HOST" = "db" ]; then
			old="@$$DATABASE_HOST:5432"; new="@127.0.0.1:$${DATABASE_PORT:-5432}"
			export DATABASE_URL="$${DATABASE_URL//$$old/$$new}"
			echo "[$@] adjusted DATABASE_URL for host access (-> 127.0.0.1:$${DATABASE_PORT:-5432})"
		fi
	fi
endef
define _maybe_use_nvm
	if [ -f .nvmrc ]; then
		if [ -n "$$NVM_DIR" ] && [ -s "$$NVM_DIR/nvm.sh" ]; then . "$$NVM_DIR/nvm.sh"; nvm use >/dev/null || true; \
		elif [ -s "$$HOME/.nvm/nvm.sh" ]; then . "$$HOME/.nvm/nvm.sh"; nvm use >/dev/null || true; \
		elif [ -s "/usr/local/share/nvm/nvm.sh" ]; then . "/usr/local/share/nvm/nvm.sh"; nvm use >/dev/null || true; \
		fi
	fi
endef
