# Auth Modes Overview

本リポジトリは二つの認証方式を並行ドキュメント管理します。

| モード | 目的 | デプロイ対象 | 主ファイル |
|--------|------|--------------|------------|
| A (Cookie セッション) | シンプル / XSS 耐性 | 現行本番 | `src/lib/urql/authExchangeLite.ts` | 
| B (Access+Refresh) | マルチクライアント / ステートレス | 将来検討 | `src/utils/auth-exchanges.tsx` (後で `src/lib/urql/authExchangeB.ts` へ移設予定) |

運用指針:
1. main は A のみを有効化 (`_app.tsx` で Lite のみ)。
2. B 検証は専用ブランチ (例: `auth-model-b`) で有効化差分を追加。
3. デプロイ Workflow は手動トリガのみ (docs/deployment-controls.md 参照)。

切替手順 (A→B 検証用):
1. `_app.tsx` の `authExchangeLite` をコメントアウトし B の exchange を import
2. tokenStore / refresh ロジックを有効化
3. useAuth から refresh interval を削除済のため login 後に accessToken set を追加
4. e2e 確認後 PR 作成

注意: B 実装の現行ファイルはまだ Cookie 読み取り等 A/B 折衷コードが残るため、本番ビルドへ含めない。
