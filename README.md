<div align="center">

# Polygonal Auxions

3D / 画像作品を投稿・閲覧・お気に入り・ブックマーク・コメント・フォローできる Next.js + GraphQL プラットフォーム（開発継続中）

<a href="https://polygonal-auxions.vercel.app" target="_blank">本番サイト</a>

</div>

## 主な機能
- 認証: ログイン / ログアウト / パスワードリセット (メール: 24h トークン)
- 作品: 一覧 / 詳細 / 追加 / お気に入り / ブックマーク
- コメント: 作品コメント表示
- ソーシャル: フォロー / 解除 / プロフィール表示・一部編集
- Admin: ダッシュボード / ユーザ・作品管理 (今後拡張)
- UX: レスポンシブ / ダークモード自動 / トースト通知
- セキュリティ: CSRF (Double Submit) / JWT 15m / 全端末ログアウト

## 代表画面
| 画面 | 用途 |
|------|------|
| ホーム | 状態別表示 |
| /artworks | 作品一覧 (新着順) |
| 作品詳細 | コメント / 操作 |
| 作品追加 | 投稿フォーム |
| プロフィール | 作品/コメント/フォロー |
| /reset-password | パスワード再設定 |
| /admin/* | 管理 (初期) |

## 技術スタック
| 分類 | 採用 |
|------|------|
| Frontend | Next.js 15 / React 19 / MUI / URQL |
| GraphQL | Yoga + Pothos / Codegen / Persisted Queries |
| DB | PostgreSQL (Prisma) |
| Email | Nodemailer / Resend / React Email |
| 認証 | JWT + CSRF Double Submit |
| Infra | Docker / Vercel (手動デプロイ) |

## 主要環境変数
| 名称 | 説明 |
|------|------|
| DATABASE_URL | Postgres 接続 |
| JWT_SECRET | JWT 署名キー |
| APP_BASE_URL / HOST / PORT | メール等リンク生成 |
| SMTP_HOST / PORT / USER / PASS | SMTP送信 |
| RESEND_API_KEY | Resend 利用時 |
| CSRF_ALLOWED_HOSTS | CSRF 許可ホスト |
| BASIC_AUTH_USER/PASS | Basic 認証 (任意) |

## ローカル起動 (最短)
```bash
git clone https://github.com/Y1K8M2NT1RK/polygonal-auxions.git
cd polygonal-auxions
docker compose up -d --build
# 数分後 http://localhost:3001 へアクセス
```

## パスワードリセット概要
1. メール入力 → リンク送付 (24h)
2. トークン付き URL で新パスワード入力
3. 成功後セッション無効化

## デプロイ (手動)
```bash
# Preview
npm ci && npm run prisma:generate && npx graphql-codegen && npm run build
vercel --prebuilt --confirm

# Production
vercel deploy --prod --prebuilt --confirm
```
ロールバック: Vercel Dashboard で前リリース Promote。

## トラブルシュート
| 症状 | 対処 |
|------|------|
| CSRF 403 | `issueCsrfToken` 実行で cookie 発行後ヘッダ送付 | 

## Deployment Tooling
Vercel CLI (`vercel`) は devDependencies にのみ存在し本番ランタイムバンドルから除外されます。デプロイは `npx vercel ...` で動作するため runtime attack surface を縮小します。

## Smoke Tests
ローカルで最小限の GraphQL 動作確認:

```
npm run test:smoke:graphql
```
前提: `npm run dev` などで `http://localhost:3000` が稼働中。
| メール不達 | ENV/SMTP/Resend 設定再確認 |
| Prisma バイナリエラー | Node 20 / `prisma generate` 再実行 |

## 今後予定 (例)
- WebGL 表示
- 検索 / タグ / 絞り込み
- レート制限 & 監査ログ
- 画像最適化 / CDN

## 旧詳細版
詳細な手順や操作説明は `docs/README_full_old.md` を参照。

---
簡潔版 README。追加情報が必要なら Issue / PR でお知らせください。


