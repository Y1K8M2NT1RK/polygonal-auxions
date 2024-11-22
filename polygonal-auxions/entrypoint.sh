#!/bin/sh

# データベースのマイグレーションファイルの存在をチェックして自動判断
if [ -f "./prisma/migrations/migration_lock.toml" ]; then
  echo "Prisma設定は既に完了しているため省略します。"
else
  echo "Prisma設定中...。"
  npx prisma generate
fi

npx prisma migrate dev --name init
npx prisma db seed

# アプリケーションを起動
exec "$@"
