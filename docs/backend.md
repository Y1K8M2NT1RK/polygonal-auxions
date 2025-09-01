# バックエンド指針

## 1. 技術スタック
- GraphQL Yoga (+ Pothos / Code First)
- Next.js API Routes (pages router)
- Prisma

## 2. 配置原則
- Runtime API Routes (最小限): `src/pages/api/`
	- GraphQL エンドポイント: `src/pages/api/graphql.ts`
		- CSRF トークン発行: GraphQL mutation `issueCsrfToken` (旧 REST `/api/csrf` は削除)
		- アップロード: `src/pages/api/upload.ts`
		- （開発限定）デバッグエンドポイント (debug.ts, openssl.ts) はセキュリティ簡素化のため削除済み
- GraphQL 実装本体 (スキーマ/ビルダー/型定義/リゾルバ): `src/server/graphql/`
	- `builder.ts`, `schema.ts`, `types/` 下へ移行済み
	- 旧 `src/pages/api/{builder,schema}.ts` は削除済み（参照不要）

## 3. GraphQL ドキュメント (`.graphql`)
- ルート: `src/pages/api/graphql/`
- ディレクトリ: `mutations/`, `queries/`
- 入力定義: `inputs.graphql` (単数形`input`ではない)
- 命名: 機能を表す英語単語列 (`artworks.graphql` など)

## 4. Pothos (Code First) リゾルバ配置
- ルート: `src/server/graphql/types/`
- ミューテーション: `types/mutations/*.ts`
- クエリ: `types/queries/*.ts`
- 共通: `types/pothos.ts`, `types/consts.ts`, `types/errors.ts`, `types/cookie.ts`
- 命名: 対象ドメイン単位 (`artworks.ts`, `comments.ts`, `users.ts`)

## 5. 永続クエリ / Persisted Operations
- 生成物: `src/generated/persisted-operations.json`, `client-persisted-operations.json`
- 更新タイミング: クエリ/ミューテーション変更後に codegen 再実行
 - CI 監視: persisted ops ファイル差分検出（意図しない GraphQL 文変更 / キャッシュ無効化リスク / 不整合防止）
 - 意義:
	 - セキュリティ: 未登録クエリの実行を防ぎ攻撃面を縮小
	 - 整合性: クライアントとサーバのクエリIDマッピングずれを早期検出
	 - パフォーマンス: 差分最小化で CDN / キャッシュ効率維持

## 6. コード生成 / Prisma
- `prisma generate` はデプロイ前必須
- GraphQL 型: `generated-graphql.ts` を最新化

## 7. 共通化指針
- 入力型: `inputs.graphql`
- 定数/再利用 util: `consts.ts` or 専用 util ファイル

## 8. エラーハンドリング
### 8.1 分類ポリシー
| 区分 | 説明 | 例 | GraphQL 拡張 http.status | code (extensions) | UI 想定処理 |
|------|------|----|--------------------------|-------------------|-------------|
| Validation (入力) | スキーマ/バリデーション違反 (Zod) | 文字数超過 / 必須欠落 | 400 | (無し) messages/fieldErrors | RHF フィールドエラー表示 |
| Business (認証/権限) | ドメイン条件違反・認証状態異常 | 認証必須操作 / セッション失効 | 401/403 | CSRF_INVALID 等 | グローバルフォームエラー / 再ログイン誘導 |
| Business (論理) | 業務的制約 | フォロー重複 / 不正 mode 値 | 400/422 | DOMAIN_CONSTRAINT | トースト / インライン表示 |
| System | 予期せぬ例外 / インフラ | DB 障害 / 未捕捉例外 | 500 | INTERNAL_SERVER_ERROR | 汎用エラー表示 + ログ収集 |

### 8.2 具体的エラー生成条件
| 生成箇所 | 条件 | 返却型 / throw | マッピング結果 |
|-----------|------|----------------|----------------|
| Pothos validate 配列 | 戻り値 false | ZodError 相当 (fieldErrorsに path) | Validation 400 |
| Zod schema | schema 不一致 | ZodError | Validation 400 |
| login ミューテーション | CSRF 不一致 (グローバルで __csrfInvalid フラグ) | CsrfError | Business(認証) 403 code=CSRF_INVALID |
| login ミューテーション | email 未登録 | Error() | System 500 (今後 NotFound 化要検討) |
| bcrypt 照合失敗 | validate false | ZodError(password) | Validation 400 |
| followOrUnfollow | 不正 mode | Error('follow error') | System 500 (将来 DOMAIN_CONSTRAINT へ) |
| マスキングロジック (maskedErrors) | cause instanceof CsrfError | GraphQLError(message, http 403, code CSRF_INVALID) | Business(認証) |
| マスキングロジック | cause instanceof ZodError | GraphQLError(messages, http 400) | Validation |
| マスキングロジック | その他 | GraphQLError(http 500) | System |

### 8.3 CSRF 不一致の扱い
- login 以外の mutation: 早期に HTTP 403 を直接返却 (GraphQL レイヤ未到達)
- login: 403 を GraphQL に持ち上げ CsrfError として返却し、RHF でフォーム上に「セッション無効」等を表示可能
- メッセージは内部実装 (CSRF トークン) を明示せずセッション失効として表現

### 8.4 改善予定 (Backlog)
- email 未存在時の Error() をドメイン 404/422 に再分類
- followOrUnfollow の汎用 Error -> DOMAIN_CONSTRAINT 化
- code 体系: VALIDATION / AUTH / DOMAIN_CONSTRAINT / INTERNAL 等への標準化
- ログ集約 (code + request id) / アラート閾値設定

最終更新: 2025-08-31 (server/graphql への移行反映)

## 9. Prisma 命名
- Model: 単数 PascalCase (`User`)
- Field: camelCase

## 10. 変更時チェック
- 新規ドメイン → `types/(mutations|queries)` 更新
- 新規入力型 → `inputs.graphql` 追記
- Persisted ops 生成忘れ防止: CI で差分検出

## 11. テスト方針
- 本プロジェクトの自動テストレイヤは現状「E2E テスト」のみを公式採用（ユニット/統合は任意）
- 目的: ユーザ視点の主要シナリオ(認証 / 投稿 / 閲覧) が本番想定環境で通ることを保証
- Smoke (`npm run v`) はビルド検証でありテストスイートにはカウントしない
- E2E 実行前提: マイグレーション & seed 済み DB / 本番相当ビルド

最終更新: 2025-08-09
