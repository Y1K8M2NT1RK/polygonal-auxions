## SECTION データベース / Prisma
# Prisma 関連ターゲット
.PHONY: prisma-generate prisma-migrate seed prisma-all

# prisma generate 実行
prisma-generate:
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[prisma-generate] SKIP_LOCAL_BUILD=1 -> skip"; exit 0; fi; \
	$(PRISMA) generate

# 保留中マイグレーション適用 (deploy)
prisma-migrate:
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[prisma-migrate] SKIP_LOCAL_BUILD=1 -> skip"; exit 0; fi; \
	$(PRISMA) migrate deploy

# DB シード実行
seed:
	@if [ -n "$$SKIP_LOCAL_BUILD" ]; then echo "[seed] SKIP_LOCAL_BUILD=1 -> skip"; exit 0; fi; \
	$(PRISMA) db seed

# 複合: generate + migrate + seed を一括
# Prisma 一連処理
prisma-all: prisma-generate prisma-migrate seed
