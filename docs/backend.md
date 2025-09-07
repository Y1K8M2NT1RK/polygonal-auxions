# 🏗️ バックエンド開発指針

**GraphQL + Prisma + Next.js API Routes** を基盤とした、型安全で保守性の高いバックエンドアーキテクチャ。

---

## 🛠️ 技術スタック

### Core Technologies
- **GraphQL Server**: GraphQL Yoga (高性能・軽量)
- **Schema Builder**: Pothos (Code First アプローチ)
- **Runtime**: Next.js API Routes (Pages Router)
- **ORM**: Prisma (型安全データアクセス)
- **Database**: PostgreSQL

### Supporting Tools
- **Code Generation**: GraphQL Code Generator
- **Type Safety**: TypeScript完全対応
- **Security**: CSRF Protection + JWT

---

## 📁 プロジェクト構成

### API Routes (`src/pages/api/`)
最小限のランタイムエンドポイントのみ配置：

```
src/pages/api/
├── graphql.ts          # GraphQLエンドポイント（メイン）
└── upload.ts           # ファイルアップロード専用
```

#### 重要な変更履歴
- ✅ CSRF トークン発行を GraphQL mutation `issueCsrfToken` に統合
- 🗑️ 旧 REST `/api/csrf` エンドポイントは削除済み
- 🗑️ 開発用デバッグエンドポイント (`debug.ts`, `openssl.ts`) はセキュリティ強化のため削除

### GraphQL実装 (`src/server/graphql/`)
スキーマ定義・リゾルバ・型定義の本体：

```
src/server/graphql/
├── builder.ts              # Pothosビルダー設定
├── schema.ts              # 統合スキーマ
├── db.ts                  # Prismaクライアント
└── types/
    ├── pothos.ts          # Pothos型設定
    ├── consts.ts          # 共通定数・型定義
    ├── errors.ts          # エラーハンドリング
    ├── cookie.ts          # Cookie管理
    ├── mutations/         # ミューテーション実装
    │   ├── users.ts       # ユーザー関連
    │   ├── artworks.ts    # 作品関連
    │   └── comments.ts    # コメント関連
    └── queries/           # クエリ実装
        ├── users.ts
        ├── artworks.ts
        └── comments.ts
```

---

## 📄 GraphQL ドキュメント管理

### ファイル構成 (`src/graphql/`)
```
src/graphql/
├── inputs.graphql         # 共通入力型定義
├── mutations/
│   ├── users.graphql      # ユーザー操作
│   ├── artworks.graphql   # 作品操作
│   └── comments.graphql   # コメント操作
├── queries/
│   ├── users.graphql      # ユーザー取得
│   ├── artworks.graphql   # 作品取得
│   └── comments.graphql   # コメント取得
└── operations/            # 複合操作（フロントエンド用）
    └── dashboard.graphql
```

### 命名規則
- **ファイル名**: 機能を表す英語単語 (`artworks.graphql`)
- **操作名**: 動詞 + 対象 (`getUserProfile`, `addArtworkRank`)
- **型名**: PascalCase (`User`, `ArtworkInput`)

---

## 🔧 Pothos実装パターン

### リゾルバ構成原則
```typescript
// types/mutations/users.ts の例
builder.mutationField("updateUserProfile", (t) =>
  t.prismaField({
    type: 'User',
    args: { 
      name: t.arg.string({ required: true }),
      introduction: t.arg.string()
    },
    authScopes: { isAuthenticated: true },
    resolve: async (query, _parent, args, ctx) => {
      return prisma.user.update({
        ...query,
        where: { id: ctx.auth?.id },
        data: args
      });
    }
  })
);
```

### 認証スコープ
| スコープ | 用途 | 例 |
|----------|------|-----|
| `{ public: true }` | 未認証でもアクセス可能 | 作品一覧取得 |
| `{ isAuthenticated: true }` | ログイン必須 | プロフィール更新 |
| `{ isAdmin: true }` | 管理者のみ | ユーザー管理 |

---

## 🚀 Persisted Operations (永続クエリ)

### 概要
クライアントが実行可能なGraphQL操作を事前登録し、セキュリティと性能を向上。

### 生成ファイル
```
src/generated/
├── persisted-operations.json        # サーバー用（全操作）
└── client-persisted-operations.json # クライアント用（ID→ハッシュマッピング）
```

### 更新フロー
```bash
# 1. GraphQL文書を更新
vim src/graphql/queries/artworks.graphql

# 2. コード生成実行
npx graphql-codegen

# 3. 差分確認（重要）
git diff src/generated/
```

### セキュリティ効果
- ✅ **未登録クエリ阻止**: 想定外の操作を防止
- ✅ **攻撃面縮小**: GraphQL Introspectionを無効化
- ✅ **整合性保証**: クライアント-サーバー間のクエリID同期

### パフォーマンス効果
- ⚡ **キャッシュ効率**: 固定IDによるCDN最適化
- ⚡ **転送量削減**: クエリ文字列の代わりにIDを送信

---

## 🔄 コード生成 & デプロイフロー

### 必須実行順序
```bash
# 1. Prismaクライアント生成
npm run prisma:generate

# 2. GraphQL型生成
npx graphql-codegen

# 3. Next.jsビルド
npm run build
```

### CI/CD監視項目
- [ ] Persisted Operations差分検出
- [ ] TypeScript型エラー
- [ ] Prismaマイグレーション適用

---

## ⚠️ エラーハンドリング戦略

### エラー分類ポリシー

| 区分 | HTTP Status | GraphQL Code | UI処理 | 例 |
|------|-------------|--------------|--------|-----|
| **バリデーションエラー** | 400 | `VALIDATION_ERROR` | フォームエラー表示 | 必須フィールド未入力 |
| **認証エラー** | 401 | `UNAUTHENTICATED` | ログインダイアログ | JWTトークン期限切れ |
| **認可エラー** | 403 | `FORBIDDEN` | アクセス拒否メッセージ | 他ユーザーのデータ編集 |
| **リソース未発見** | 404 | `NOT_FOUND` | 404ページ | 存在しない作品ID |
| **レート制限** | 429 | `RATE_LIMITED` | 再試行案内 | API呼び出し過多 |
| **サーバーエラー** | 500 | `INTERNAL_ERROR` | 汎用エラーメッセージ | DB接続失敗 |

### エラー実装例
```typescript
// types/errors.ts
export const ValidationError = builder.objectRef<{
  message: string;
  field?: string;
}>('ValidationError');

builder.objectType(ValidationError, {
  fields: (t) => ({
    message: t.exposeString('message'),
    field: t.exposeString('field', { nullable: true })
  })
});
```

---

## 🔐 セキュリティ実装

### CSRF保護
```typescript
// types/mutations/users.ts
builder.mutationField("updateProfile", (t) =>
  t.prismaField({
    // CSRF検証は middleware で自動実行
    authScopes: { isAuthenticated: true },
    // ...implementation
  })
);
```

### データ検証
```typescript
import { z } from 'zod';

const UserUpdateSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email()
});

// リゾルバ内でスキーマ検証
const validatedData = UserUpdateSchema.parse(args);
```

---

## 🧪 テスト戦略

### Smoke Tests
```bash
# GraphQL エンドポイント疎通確認
npm run test:smoke:graphql

# 基本的なCRUD操作テスト
npm run test:integration
```

### 手動テスト項目
- [ ] CSRF トークン発行・検証
- [ ] JWT認証フロー
- [ ] ファイルアップロード
- [ ] エラーレスポンス形式

---

## 📚 関連ドキュメント

- **[認証アーキテクチャ](auth-architecture-A.md)**: 認証・認可の詳細設計
- **[フロントエンド仕様](frontend.md)**: UI・UX実装ガイドライン
- **[デプロイメント](deployment-controls.md)**: 本番環境デプロイ手順

---

## 🔄 今後の改善予定

### 短期
- [ ] GraphQL Subscription対応（リアルタイム機能）
- [ ] レート制限実装（Redis + Sliding Window）
- [ ] API監査ログ

### 中期
- [ ] GraphQL Federation（マイクロサービス化）
- [ ] OpenTelemetry導入（分散トレーシング）
- [ ] 自動パフォーマンステスト

---

<div align="center">

**最終更新**: 2025-09-07  
**管理者**: Backend Team

</div>
