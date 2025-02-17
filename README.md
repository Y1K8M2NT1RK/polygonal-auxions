# 各種コマンド操作方法
## アプリケーションの起動方法
```
# プロジェクトのディレクトリを作成し、そのディレクトリへ移動
mkdir Y1K8M2NT1RK_projects
cd .\Y1K8M2NT1RK_projects\

# Gitのクローン
git clone https://github.com/Y1K8M2NT1RK/polygonal-auxions.git

# プロジェクトのディレクトリへ移動
cd .\polygonal-auxions\

# dockerコンテナのビルド/起動
docker compose up -d --build

# polygonal-auxions/package.json（Dockerfile.appと同じディレクトリ）で用意されたライブラリをインストール
docker compose exec app npm install

# appコンテナの再起動
docker restart $(docker ps -f "name=app" -q)

# appコンテナをもう一度起動
docker compose up -d
```

## 停止したコンテナをもう一度起動
```
docker compose up -d
```


## コンテナの停止
```
# 全体
docker stop $(docker ps -q)

# qppコンテナ
docker stop $(docker ps -f "name=app" -q)

# dbコンテナ
docker stop $(docker ps -f "name=db" -q)
```

## コンテナの再起動
```
# 全体
docker restart $(docker ps -q)

# qppコンテナ
docker restart $(docker ps -f "name=app" -q)

# dbコンテナ
docker restart $(docker ps -f "name=db" -q)
```

## コンテナ/イメージ/ボリュームの削除
```
# [y/N]?の質問が来るため、削除したいときはy、そうでなければN
docker system prune -a

# [y/N]?の質問を省略して強制削除
docker system prune -af
```

## プロジェクトの削除
```
rm -rf .\polygonal-auxions\
```
※上記コマンドで削除できない場合は、お手数ですがマウス操作で削除をお願いいたします。
