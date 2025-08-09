# バックエンド指針

## 1. 技術スタック
- GraphQL Yoga (+ Pothos / Code First)
- Next.js API Routes (pages router)
- Prisma

## 2. 配置原則
- API 実装: `src/pages/api`
- GraphQL エンドポイント: `src/pages/api/graphql.ts`
- スキーマ/ビルダー: `src/pages/api/builder.ts`, `src/pages/api/schema.ts`

## 3. GraphQL ドキュメント (`.graphql`)
- ルート: `src/pages/api/graphql/`
- ディレクトリ: `mutations/`, `queries/`
- 入力定義: `inputs.graphql` (単数形`input`ではない)
- 命名: 機能を表す英語単語列 (`artworks.graphql` など)

## 4. Pothos (Code First) リゾルバ配置
- ルート: `src/pages/api/types/`
- ミューテーション: `types/mutations/*.ts`
- クエリ: `types/queries/*.ts`
- 共通: `types/pothos.ts`, `types/consts.ts`, `types/errors.ts`
- 命名: 対象ドメイン単位 (`artworks.ts`, `comments.ts`, `users.ts`)

## 5. 永続クエリ / Persisted Operations
- 生成物: `src/generated/persisted-operations.json`, `client-persisted-operations.json`
- 更新タイミング: クエリ/ミューテーション変更後に codegen 再実行

## 6. コード生成 / Prisma
- `prisma generate` はデプロイ前必須
- GraphQL 型: `generated-graphql.ts` を最新化

## 7. 共通化指針
- 入力型: `inputs.graphql`
- 定数/再利用 util: `consts.ts` or 専用 util ファイル

## 8. エラーハンドリング
- ビジネスエラーとシステム例外を分類
- GraphQL エラー拡張にコード/種類を付与

## 9. Prisma 命名
- Model: 単数 PascalCase (`User`)
- Field: camelCase

## 10. 変更時チェック
- 新規ドメイン → `types/(mutations|queries)` 更新
- 新規入力型 → `inputs.graphql` 追記
- Persisted ops 生成忘れ防止: CI で差分検出

最終更新: 2025-08-09
