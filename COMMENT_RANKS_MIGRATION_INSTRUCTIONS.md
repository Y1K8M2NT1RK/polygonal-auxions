# CommentRanks データベース移行手順

コメント報告機能のデータベース登録を有効にするため、以下の手順を実行してください：

## 1. データベースマイグレーション実行

```bash
npx prisma migrate deploy
```

## 2. Prismaクライアント再生成

```bash
npx prisma generate
```

## 3. GraphQL型定義再生成

```bash
npx graphql-codegen
```

## 4. 開発サーバー再起動

```bash
npm run dev
```

## 変更内容

- `src/server/graphql/types/mutations/comments.ts` の `addCommentRank` ミューテーションで、実際にデータベースにコメント報告データを保存するようになりました
- 重複報告の防止機能も追加されています
- `CommentRanks` テーブル用のマイグレーションファイルを作成しました

## トラブルシューティング

マイグレーション実行時にエラーが発生した場合：

1. データベースが起動していることを確認
2. `.env` ファイルで `DATABASE_URL` が正しく設定されていることを確認
3. 必要に応じて `npx prisma db push` を使用してスキーマを強制的に同期

## 確認方法

機能が正常に動作していることを確認するには：

1. ログインした状態で他のユーザーのコメントの報告ボタンをクリック
2. 報告理由を選択して送信
3. データベースで `comment_ranks` テーブルにレコードが作成されていることを確認

```sql
SELECT * FROM comment_ranks ORDER BY created_at DESC LIMIT 10;
```