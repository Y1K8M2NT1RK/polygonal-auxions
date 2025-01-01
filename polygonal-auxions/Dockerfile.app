FROM node:21-slim

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    postgresql-client \
    openssl \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

# 依存関係をインストール
RUN npm install && npm cache clean --force

COPY . .

# Prismaのセットアップスクリプトをコピー
COPY /polygonal-auxions/entrypoint.sh /usr/local/bin/

# スクリプトを実行可能にする
RUN chmod +x /usr/local/bin/entrypoint.sh

# エントリーポイントを設定
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# デフォルトのコマンド
CMD ["npm", "run", "dev"]