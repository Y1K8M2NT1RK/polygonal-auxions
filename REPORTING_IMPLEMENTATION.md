# 報告機能実装ガイド

## 概要
作品の報告機能を実装しました。ユーザーが不適切な作品を報告できる機能です。

## 実装対象
1. **作品詳細画面** (`/artworks/[slug_id]`)
   - 既存の「報告」ボタンにクリック処理を追加
2. **プロフィール画面** (`/profile/[handle_name]`)
   - 各作品カードに報告ボタンを追加

## 実装詳細

### バックエンド変更
1. **GraphQLスキーマ** (`src/server/graphql/types/consts.ts`)
   - `Ranks` および `RankTypes` オブジェクトを追加
   - 適切なリレーションフィールドを定義

2. **新しいクエリ** (`src/server/graphql/types/queries/artworks.ts`)
   - `getReportReasons`: rank_type_id=3 の報告理由を取得

3. **GraphQL操作定義** (`src/graphql/queries/artworks.graphql`)
   - クライアント側での使用のためのクエリ定義

### フロントエンド変更
1. **ReportDialog コンポーネント** (`src/components/ReportDialog.tsx`)
   - 報告理由選択のラジオボタン
   - フォーム検証と送信処理
   - 認証チェック

2. **ReportSuccessDialog コンポーネント** (`src/components/ReportSuccessDialog.tsx`)
   - 報告完了の確認ダイアログ

3. **作品詳細ページ更新** (`src/pages/artworks/[slug_id]/components/artwork-detail.tsx`)
   - 報告ボタンにクリックハンドラーを追加
   - ダイアログの統合

4. **プロフィールページ更新** (`src/pages/profile/components/profile-artworks.tsx`)
   - 各作品カードに報告ボタンを追加
   - 自己報告の防止機能

## 報告理由（RankTypeId=3のデータ）
以下の報告理由が利用可能です：
1. 不適切な表現（過激もしくは卑猥な表現など）
2. 犯罪・テロリズムの誘発
3. 虚偽のもしくは矛盾しているタイトル・サムネイル・表示内容
4. その他

## データベーススキーマ
報告は `ArtworkRanks` テーブルに以下の形式で保存されます：
- `artwork_id`: 報告対象の作品ID
- `rank_id`: 報告理由のID（5-8のいずれか）
- `user_id`: 報告したユーザーID

## テスト方法

### 前提条件
1. データベースが起動している
2. Prismaクライアントが生成されている
3. GraphQLスキーマが最新化されている

### 手順
1. **環境セットアップ**
   ```bash
   # Dockerでデータベース起動
   make dc-up
   
   # Prisma生成
   npx prisma generate
   
   # GraphQL型生成
   npx graphql-codegen
   
   # 開発サーバー起動
   npm run dev
   ```

2. **機能テスト**
   - ユーザーとしてログイン
   - 他のユーザーの作品詳細ページにアクセス
   - 「報告」ボタンをクリック
   - 報告理由を選択して送信
   - 成功ダイアログが表示されることを確認

3. **プロフィールページテスト**
   - 他のユーザーのプロフィールページにアクセス
   - 作品カード右上の報告ボタンをクリック
   - 同様の流れでテスト

### 確認ポイント
- [ ] ログインしていない場合はエラーメッセージが表示される
- [ ] 自分の作品には報告ボタンが表示されない（プロフィールページ）
- [ ] 報告理由が正しく表示される
- [ ] 報告送信後に成功ダイアログが表示される
- [ ] データベースに適切にデータが保存される

## トラブルシューティング

### Prismaクライアント生成エラー
```bash
# 環境変数を設定してPrisma生成
DATABASE_URL="postgresql://user:pass@localhost:5432/db" npx prisma generate
```

### GraphQLコード生成エラー
```bash
# Prisma生成後にGraphQL型生成
npx prisma generate
npx graphql-codegen
```

### Docker環境での問題
```bash
# コンテナを完全にリセット
make down-v CONFIRM=1
make dc-build
make dc-up
```

## 技術的な特徴
- 既存の `addArtworkRank` ミューテーションを再利用
- MaterialUIのダイアログパターンに従った実装
- TypeScriptによる型安全性
- エラーハンドリングとユーザーフィードバック
- 認証チェックとセキュリティ考慮

## ファイル一覧
```
src/
├── components/
│   ├── ReportDialog.tsx           # 報告ダイアログ
│   └── ReportSuccessDialog.tsx    # 成功ダイアログ
├── pages/
│   ├── artworks/[slug_id]/components/
│   │   └── artwork-detail.tsx     # 作品詳細（報告機能追加）
│   └── profile/components/
│       └── profile-artworks.tsx   # プロフィール作品（報告機能追加）
├── server/graphql/types/
│   ├── consts.ts                  # GraphQLオブジェクト定義
│   └── queries/artworks.ts        # 報告理由クエリ
├── graphql/queries/
│   └── artworks.graphql           # GraphQL操作定義
└── utils/
    └── reportGraphql.ts           # 報告用GraphQLユーティリティ
```

この実装により、作品詳細ページとプロフィールページの両方で作品の報告機能が利用可能になります。