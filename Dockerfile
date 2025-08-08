FROM node:22-slim

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    postgresql-client \
    openssl \
    curl \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

# 依存関係をインストール
RUN ["npm", "cache", "clean", "--force"]
RUN ["npm", "install"]