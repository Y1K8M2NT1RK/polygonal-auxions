FROM node:21-slim

WORKDIR /app

COPY package*.json ./

# 依存関係をインストール
RUN npm install \
&& apt-get update -y && apt-get install -y openssl

COPY . .

# Prismaのセットアップスクリプトをコピー
COPY /polygonal-auxions/entrypoint.sh /usr/local/bin/

# スクリプトを実行可能にする
RUN chmod +x /usr/local/bin/entrypoint.sh

# エントリーポイントを設定
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# デフォルトのコマンド
CMD ["npm", "run", "dev"]