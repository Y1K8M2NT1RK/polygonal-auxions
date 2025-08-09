# 更新手順

## 1. 差分検出
- ディレクトリ追加/移動時: `git diff --name-status` を確認
- GraphQL/Prisma 変更時: codegen / migrate を再実行

## 2. ドキュメント更新トリガー
- `src/pages/api/types` にファイル追加
- `src/generated` に生成物差分
- `src/app` / `src/components` 構造変更

## 3. 手順
1. 変更点列挙
2. `docs/history.md` へ追記
3. 対象ガイド (`backend.md` / `frontend.md`) 修正
4. インデックスの日付更新

## 4. チェックリスト
- [ ] hooks/contexts の移動漏れなし
- [ ] inputs.graphql 同期
- [ ] persisted-operations 再生成
- [ ] prisma generate 済

## 5. CI 推奨タスク（将来）
- type-check / lint / build / smoke

最終更新: 2025-08-09
