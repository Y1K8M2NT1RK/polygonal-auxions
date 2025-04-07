#!/bin/sh

set -e

# デバッグモードの有効化
# export DEBUG="*"

# データベース接続の確認
until PGPASSWORD=${DATABASE_PASSWORD} psql -h ${DATABASE_HOST} -U ${DATABASE_USER} -d ${DATABASE_DB} -c '\q'
do
  echo "DBの起動を待機中..."
  sleep 2
done

echo "マイグレーション情報を確認中...";

# マイグレーションの実行
if [ "$(ls -A prisma/migrations)" ]; then
  echo "マイグレーションファイルが存在するため、マイグレーションをスキップします。"
else
  echo "マイグレーション実行中..."
  # npx prisma migrate dev --name init
  # npx prisma generate

  echo "Prisma Clientのキャッシュを削除中..."
  rm -rf node_modules/@prisma/client

  if npx prisma migrate reset --skip-seed --force; then
    echo "マイグレーション情報の削除に成功しました。"
  else echo "エラーによりマイグレーション情報の削除に失敗しました。"
    exit 1
  fi

  # rm -rf node_modules/@prisma/client

  # if npx prisma db push --force-reset; then
  #   echo "データベースの強制リセットとスキーマのプッシュに成功しました。"
  # else echo "エラーによりデータベースの強制リセットに失敗しました。"
  #   exit 1
  # fi

  # if printf 'y\n' | npx prisma db push --force-reset; then
  #   echo "データベースの強制リセットとスキーマのプッシュに成功しました。"
  # else echo "エラーによりデータベースの強制リセットに失敗しました。"
  #   exit 1
  # fi

  echo "マイグレーションを生成中..."

  if npx prisma migrate dev --skip-seed --name init; then
    echo "マイグレーションの生成に成功しました。"
  else echo "エラーによりマイグレーションの生成に失敗しました。"
    exit 1
  fi

  echo "Prisma Clientを生成中..."
  
  if npx prisma generate; then
    echo "Prisma Clientの生成に成功しました。"
  else echo "エラーにより生成に失敗しました。"
    exit 1
  fi

  # シードデータの有無を確認し、必要に応じて実行
  if [ "$(npx prisma db seed | grep -c 'The seed command has been disabled') -eq 0" ]; then
    echo "DBにデータをシード中..."
    if npx prisma db seed; then
      echo "DBにデータをシードできました。"
    else echo "エラーによりデータのシードに失敗しました。"
      exit 1
    fi
  else
    echo "シードが無効になっているか、シードするデータが見つかりません。"
  fi
  
fi

# アプリケーションの起動
echo "アプリケーション起動中..."
exec "$@"
