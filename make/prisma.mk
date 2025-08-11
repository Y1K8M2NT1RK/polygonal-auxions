## SECTION データベース / Prisma
# Prisma 関連ターゲット
.PHONY: prisma-generate prisma-migrate seed prisma-all

# prisma generate 実行
prisma-generate:
	$(PRISMA) generate

# 保留中マイグレーション適用 (deploy)
prisma-migrate:
	$(PRISMA) migrate deploy

# DB シード実行
seed:
	$(PRISMA) db seed

# 複合: generate + migrate + seed を一括
# Prisma 一連処理
prisma-all: prisma-generate prisma-migrate seed
