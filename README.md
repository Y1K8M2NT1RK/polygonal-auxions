<div align="center">

# 🎨 Polygonal Auxions

**3D・画像作品投稿プラットフォーム**

3D作品や画像を投稿・閲覧・お気に入り・ブックマーク・コメント・フォローできる  
Next.js + GraphQL プラットフォーム（開発継続中）

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://polygonal-auxions.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql)](https://graphql.org/)

**[🌐 本番サイトを見る](https://polygonal-auxions.vercel.app)**

</div>

---

## ✨ 主な機能

### 🔐 認証・ユーザー管理
- **ログイン・ログアウト**: セキュアなJWT認証
- **パスワードリセット**: 24時間有効なメールリンク
- **プロフィール管理**: アバター・背景画像・基本情報編集

### 🎨 作品機能
- **作品投稿**: 3D・画像ファイルのアップロード
- **作品一覧**: 新着順での閲覧・ページネーション
- **お気に入り・ブックマーク**: 作品の保存・整理
- **報告機能**: 不適切コンテンツの通報

### 💬 ソーシャル機能
- **コメント**: 作品へのフィードバック
- **フォロー**: 気になるクリエイターをフォロー
- **プロフィール**: 作品・コメント履歴の閲覧

### 🛡️ セキュリティ
- **CSRF保護**: Double Submit Cookie Pattern
- **JWT認証**: 15分の短期間トークン
- **全端末ログアウト**: セキュリティインシデント対応

### 🎯 管理機能
- **Adminダッシュボード**: ユーザー・作品・報告管理
- **モデレーション**: コンテンツ審査ツール

## 📱 代表画面

| 画面 | 用途 | URL |
|------|------|-----|
| **ホーム** | ログイン状態別の表示 | `/` |
| **作品一覧** | 新着順での作品閲覧 | `/artworks` |
| **作品詳細** | コメント・操作パネル | `/artworks/[slug_id]` |
| **作品投稿** | アップロードフォーム | `/artworks/add` |
| **プロフィール** | 作品・コメント・フォロー | `/profile/[handle_name]` |
| **パスワード再設定** | セキュア再設定フロー | `/reset-password` |
| **管理画面** | システム管理 | `/admin/*` |

## 🛠️ 技術スタック

### Frontend
- **Framework**: Next.js 15 (App Router + Pages Router)
- **UI Library**: React 19 + Material-UI (MUI)
- **State Management**: URQL (GraphQL Client)
- **Styling**: Tailwind CSS + CSS-in-JS
- **TypeScript**: 完全型安全

### Backend
- **GraphQL**: GraphQL Yoga + Pothos Schema Builder
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT + CSRF Double Submit
- **File Storage**: Vercel Blob
- **Email**: Nodemailer / Resend + React Email

### Infrastructure
- **Container**: Docker + Docker Compose
- **Deployment**: Vercel (Production)
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics

### Development Tools
- **Code Generation**: GraphQL Code Generator
- **Database**: Prisma CLI + Migrations
- **Testing**: Smoke Tests
- **Linting**: ESLint + TypeScript

## ⚙️ 主要環境変数

### 必須設定
```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/polygonal_auxions"

# JWT & Security
JWT_SECRET="your-super-secure-jwt-secret"
CSRF_ALLOWED_HOSTS="localhost:3000,polygonal-auxions.vercel.app"

# Application URLs
APP_BASE_URL="http://localhost:3000"
HOST="0.0.0.0"
PORT="3000"
```

### メール設定（いずれか選択）
```bash
# Option 1: SMTP
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Option 2: Resend
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxx"
```

### オプション設定
```bash
# Basic認証（開発環境など）
BASIC_AUTH_USER="admin"
BASIC_AUTH_PASS="password123"
```

## 🚀 ローカル起動（最短手順）

### Docker Compose（推奨）
```bash
# 1. リポジトリクローン
git clone https://github.com/Y1K8M2NT1RK/polygonal-auxions.git
cd polygonal-auxions

# 2. 環境変数設定
cp .env.example .env.local
# .env.local を編集して必要な値を設定

# 3. Docker起動
docker compose up -d --build

# 4. 起動確認（数分後）
open http://localhost:3001
```

### 手動セットアップ
```bash
# 依存関係インストール
npm ci

# データベース準備
npm run prisma:generate
npx prisma migrate dev

# シードデータ投入
npm run seed:minimal

# 開発サーバー起動
npm run dev
```

## 🔑 パスワードリセットフロー

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant E as Email Service

    U->>F: メールアドレス入力
    F->>B: requestPasswordReset mutation
    B->>E: リセットメール送信（24h有効）
    E->>U: メール受信
    U->>F: リンククリック
    F->>B: resetPassword mutation
    B->>B: トークン検証・パスワード更新
    B->>F: 成功レスポンス
    F->>U: ログイン画面へリダイレクト
```

## 📦 デプロイメント

### 本番デプロイ（Vercel）
```bash
# 1. ビルド準備
npm ci
npm run prisma:generate
npx graphql-codegen
npm run build

# 2. プレビューデプロイ
vercel --prebuilt --confirm

# 3. 本番デプロイ
vercel deploy --prod --prebuilt --confirm
```

### データベースマイグレーション
```bash
# 本番環境でのマイグレーション実行
npx prisma migrate deploy
```

### ロールバック
Vercel Dashboard で前リリースを Promote することで即座にロールバック可能。

## 🧪 テスト・検証

### Smoke Tests
```bash
# GraphQL APIの基本動作確認
npm run test:smoke:graphql

# Webサーバーのヘルスチェック
npm run smoke
```

### ビルド検証
```bash
# 本番ビルドテスト
npm run build

# 型チェック
npx tsc --noEmit
```

## �� トラブルシューティング

| 症状 | 原因 | 対処法 |
|------|------|--------|
| **CSRF 403エラー** | CSRFトークン未設定 | `issueCsrfToken` mutation実行後、ヘッダに`x-csrf-token`設定 |
| **メール不達** | SMTP/API設定不備 | 環境変数とサービス設定を再確認 |
| **Prismaエラー** | バイナリ不整合 | Node.js 20使用、`npx prisma generate`再実行 |
| **GraphQL型エラー** | コード生成漏れ | `npx graphql-codegen`実行後、再ビルド |
| **Next.js ビルドエラー** | 型不整合 | TypeScriptエラー解消後、`.next`削除して再ビルド |

## 🔒 セキュリティ仕様

### デプロイメントセキュリティ
- **Vercel CLI**: devDependenciesのみ配置、本番バンドルから除外
- **Attack Surface最小化**: `npx vercel`によるランタイム分離

### 認証セキュリティ
- **JWT**: 15分の短期間トークン
- **CSRF**: Double Submit Cookie Pattern
- **Session管理**: 全端末ログアウト対応

## 🚧 今後の予定

### 短期
- [ ] **WebGL対応**: 3Dモデルのブラウザ表示
- [ ] **検索機能**: タイトル・タグ・作者検索
- [ ] **高度なフィルタ**: カテゴリ・日付・人気度

### 中期
- [ ] **レート制限**: API使用量制御
- [ ] **監査ログ**: セキュリティイベント記録
- [ ] **画像最適化**: CDN + 自動リサイズ

### 長期
- [ ] **リアルタイム機能**: WebSocket対応
- [ ] **API公開**: 外部連携対応
- [ ] **モバイルアプリ**: React Native展開

## 📚 ドキュメント

詳細な開発情報・手順については以下を参照：

- **[完全版ドキュメント](docs/README_full_old.md)**: 詳細な開発・運用手順
- **[認証アーキテクチャ](docs/auth-architecture-A.md)**: 認証システム設計
- **[バックエンド仕様](docs/backend.md)**: GraphQL・DB設計
- **[フロントエンド仕様](docs/frontend.md)**: UI・UX実装

---

<div align="center">

**作られたもの**: Y1K8M2NT1RK  
**ライセンス**: MIT  
**貢献**: Issue・PRお待ちしております！

[📧 Contact](mailto:contact@example.com) • [🐛 Issues](https://github.com/Y1K8M2NT1RK/polygonal-auxions/issues) • [🔄 Pull Requests](https://github.com/Y1K8M2NT1RK/polygonal-auxions/pulls)

</div>
