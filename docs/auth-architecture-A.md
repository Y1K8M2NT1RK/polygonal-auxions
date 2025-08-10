# 認証方式 A: Cookie セッション純化案 (採用想定)

## 目的
- フロント側でアクセストークン非保持 (XSS 時の窃取リスク低減)
- 実装/運用を最短経路で安定化

## コア方針
| 項目 | 内容 |
|------|------|
| 認証状態 | HttpOnly+Secure+SameSite=Lax Cookie `sid` を保持 |
| セッション管理 | サーバ側 (DB / Redis) で有効期限+rolling 更新 |
| GraphQL リクエスト | `fetchOptions.credentials = 'include'` のみ |
| refresh | サーバが内部で期限延長 (アクセス時 or /refresh Mutation 任意) |
| クライアント側 Token | 取得/保存/復号しない |
| エラー処理 | 401/403 を捕捉しログインダイアログ出すだけ |

## フロー
1. login Mutation -> サーバが Set-Cookie: `sid=...; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600` を返却
2. 以後の GraphQL は Cookie 自動送信
3. 有効期限付近アクセス -> サーバが Cookie 再発行 (rolling) or 無効なら 401
4. 401 を受けたクライアントは AuthContext で `isLoggedIn=false` へ遷移

## クライアント変更要点
- auth-exchange を除去 / 極小化
- useAuth: refresh interval 削除
- login/logout 後は `me` の再フェッチのみ

## サーバ考慮
- CSRF 対策: SameSite + (必要なら) Origin チェック + mutation に CSRF トークン検証
- セッション無効化: logout, パスワード変更, 強制失効

## 将来の B 案へ移行する場合
- login 返却に accessToken を追加するが、A のコードは無視できるように保つ
- 並行期間中: Cookie セッションが残っていても Authorization があれば後者を優先などのポリシーを定義

