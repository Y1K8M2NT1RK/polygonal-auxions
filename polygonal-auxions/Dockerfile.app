FROM node:21-slim

WORKDIR /app

COPY package*.json ./
RUN npm install \
&& apt-get update -y && apt-get install -y openssl

COPY . .

## npm install :  node_moduleが出ちゃう
## opensslのインストール、prismaでのセキュリティ対策に必要
RUN npm install \
&& apt-get update -y && apt-get install -y openssl
# RUN npm install

## npx prisma db seed：初期データ投入
# RUN npx prisma generate \ 
# && npx prisma db seed