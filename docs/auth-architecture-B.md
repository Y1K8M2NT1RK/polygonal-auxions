# 認証方式 B: Access + Refresh Token 二段型案 (参考)

## 目的
- ステートレス性 (セッションストア不要)
- マルチクライアント (Web / Mobile / CLI) 共通化
- 期限切れ前プリエンプティブ refresh による UX 向上

## コア方針
| 項目 | 内容 |
|------|------|
| accessToken | 短寿命 (5-15分) JWT / メモリ保持のみ |
| refreshToken | HttpOnly+Secure Cookie (30日など) ローテーション必須 |
| 署名鍵 | HS / RS どちらでも。将来 key rotation に備え kid 付与 |
| auth header | `Authorization: Bearer <accessToken>` |
| refresh 契機 | (a) exp 残 60s 以下 (b) 401 検出 (c) 起動直後必要なら |
| 複数同時 refresh | 単一 Promise 共有 (現在の実装と同様) |
| logout | refresh cookie 無効化 + accessToken 破棄 |

## データフロー
1. login -> `{ accessToken, refreshToken }` (refreshToken は Set-Cookie, accessToken は JSON) 受領
2. client: accessToken をメモリへ setAccessToken()
3. 各 GraphQL: authExchange.addAuthToOperation でヘッダ付与
4. exp が近い/401 受領 -> refresh mutation -> 新 accessToken (と新 refreshToken) を受領 → 更新
5. 失敗 (invalid refresh) -> 強制 logout / AuthContext 通知

## クライアント構成ファイル案
- `src/lib/auth/tokenStore.ts` : in-memory token + listeners
- `src/lib/auth/jwt.ts` : decode / exp 残時間計算
- `src/lib/urql/authExchange.ts` : 付与 + refresh 制御
- `src/contexts/AuthContexts.tsx` : login/logout のみ (refresh 削除)

## セキュリティ考慮
- XSS 対策 (CSP, React 19 SSR Sanitization 等) を前提条件化
- refresh token ローテーション: 古いものはサーバ側 blacklist or version bump
- JWT claim: iss, aud, iat, exp, sub, jti (+ roles / perms)
- 署名鍵ローテーション: JWKS エンドポイント (kid マッピング)

## 移行ノート (A→B)
1. login レスポンスへ accessToken を追加
2. フロントへ tokenStore 実装 & authExchange 差し替え
3. サーバ refresh mutation を JWT デュアル発行へ(旧 Cookie セッションは数日並行)
4. 監視: accessToken 発行/refresh 失敗率
5. Cookie セッション廃止 (最終段階)

