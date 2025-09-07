# �� プロジェクト完全版ドキュメント（アーカイブ）

このファイルは`README.md`の過去バージョンと詳細情報を保管するアーカイブファイルです。

---

## 🗂️ ドキュメント構成の変遷

### 現在の構成（v2.0）
```
docs/
├── README_full_old.md         # 本ファイル（アーカイブ）
├── auth-architecture-A.md     # 認証システム詳細
├── backend.md                 # バックエンド開発指針
├── frontend.md                # フロントエンド開発指針
├── deployment-controls.md     # デプロイメント制御
├── email.md                   # メール機能
├── future.md                  # 将来計画
└── history.md                 # 開発履歴
```

### 過去の構成（v1.0）
以前は単一の巨大な`README.md`ファイルにすべての情報が含まれていました。
ドキュメントの保守性とアクセス性向上のため、機能別に分割を実施しました。

---

## 📖 ドキュメント分離の経緯

### 分離前の課題
- **可読性の低下**: 単一ファイルが5000行超になり、目的の情報を見つけにくい
- **保守の困難**: 複数の機能について同じファイルで編集競合が発生
- **アクセス性**: 特定機能の開発者が必要な情報にたどり着きにくい

### 分離後の改善
- **機能別分割**: 認証、バックエンド、フロントエンドなど機能単位で分離
- **リンク構造**: メインREADMEから各詳細ドキュメントへの明確なナビゲーション
- **専門性**: 各チーム（セキュリティ、バックエンド、フロントエンド）が担当領域に集中

---

## 🔄 移行ログ

### 2024-08-XX: 初期分割
- `README.md` から認証関連情報を `auth-architecture-A.md` に移行
- バックエンド技術詳細を `backend.md` に分離
- フロントエンド実装ガイドを `frontend.md` に整理

### 2024-09-XX: 構造化強化
- 各ドキュメントに統一的な構造とフォーマット適用
- Mermaid図表、バッジ、絵文字を使った視覚的改善
- 相互リンクとナビゲーション改善

### 2025-01-XX: 最新技術対応
- Next.js 15、React 18 対応情報を更新
- GraphQL Persisted Operations の詳細追加
- セキュリティベストプラクティス強化

---

## 📜 歴史的なREADME内容

以下は過去の`README.md`から重要な情報を抜粋したものです：

### プロジェクト初期の概要
> Polygonal Auxions は、創作物の魅力を多角的に評価・共有するプラットフォームです。
> ユーザーが作品をアップロードし、他のユーザーがそれに対して評価やコメントを行うことで、
> 新しい視点や気づきを得られるコミュニティを目指しています。

### 技術選択の経緯
#### なぜNext.jsを選択したか？
- **フルスタック対応**: API RoutesによるバックエンドとフロントエンドのWeb
- **SEO対応**: Server-Side Renderingによる検索エンジン最適化
- **開発効率**: TypeScriptとの親和性、豊富なエコシステム

#### なぜGraphQLを採用したか？
- **型安全性**: TypeScript + GraphQL Code Generatorによる完全型安全
- **効率的データ取得**: 必要なデータのみを取得、Over-fetching回避
- **開発体験**: GraphQL Playgroundによる直感的API探索

#### なぜPrismaを選択したか？
- **型安全なORM**: TypeScriptとの完全統合
- **マイグレーション**: 安全で追跡可能なデータベース変更
- **開発ツール**: Prisma Studioによる視覚的データベース管理

---

## 🔧 初期セットアップ手順（アーカイブ）

### 古い環境構築方法
以下は過去に使用されていたセットアップ手順です。現在は`README.md`の手順を参照してください。

```bash
# 古い方法（非推奨）
npm install
npm run dev
```

### 現在推奨される方法
```bash
# 現在の推奨方法
make install
make dev
```

詳細は[README.md](../README.md)の「🚀 開発環境構築」を参照してください。

---

## 📊 プロジェクトメトリクス履歴

### コードベース成長
- **2024年初期**: ~10,000行
- **2024年中期**: ~25,000行
- **2024年末**: ~40,000行（テスト含む）

### 機能追加履歴
- **Phase 1**: 基本的なCRUD、ユーザー認証
- **Phase 2**: 作品評価システム、コメント機能
- **Phase 3**: 管理者機能、レポート機能
- **Phase 4**: パフォーマンス最適化、セキュリティ強化

---

## 🗄️ 廃止された機能

### REST API
初期バージョンではREST APIを併用していましたが、GraphQLに一本化：
```
/api/users/*     → GraphQL queries/mutations
/api/artworks/*  → GraphQL queries/mutations
/api/auth/*      → GraphQL mutations (CSRF除く)
```

### 旧認証システム
JWT Tokenベースの認証からCookie Sessionベースに移行：
- **セキュリティ**: XSS攻撃への耐性向上
- **UX**: ブラウザ自動ログイン機能
- **管理**: サーバーサイドセッション制御

---

## 📝 過去の技術的意思決定

### データベース選択: PostgreSQL
#### 検討した代替案
- **MySQL**: 実績豊富だが、JSON型サポートが限定的
- **MongoDB**: スキーマレスだが、リレーショナルデータに不向き
- **SQLite**: 開発環境向きだが、本番スケールに課題

#### PostgreSQL採用理由
- **JSON型サポート**: 柔軟なデータ構造対応
- **ACID特性**: データ整合性保証
- **拡張性**: 大規模データ対応

### UI Library選択: Material-UI
#### 検討した代替案
- **Ant Design**: 豊富なコンポーネントだが、カスタマイズ性に課題
- **Chakra UI**: モダンだが、コンポーネント数が少ない
- **カスタム実装**: 完全制御可能だが、開発コストが高い

#### Material-UI採用理由
- **成熟度**: 豊富なコンポーネントと実績
- **アクセシビリティ**: WCAG準拠の標準対応
- **カスタマイズ性**: Theme systemによる柔軟な見た目調整

---

## 🔍 過去のパフォーマンス課題と解決

### 画像アップロード最適化
#### 課題
- 大きなファイルサイズによるアップロード時間増加
- サーバー容量逼迫

#### 解決策
- **クライアント圧縮**: ブラウザ側でリサイズ・圧縮
- **プログレッシブアップロード**: チャンク分割アップロード
- **CDN統合**: Vercel Edge Networkによる配信最適化

### GraphQLクエリ最適化
#### 課題
- N+1クエリ問題による性能劣化
- 大量データ取得時のメモリ消費

#### 解決策
- **DataLoader実装**: バッチクエリによるN+1解決
- **Pagination**: カーソルベースページング実装
- **Query Complexity**: 複雑クエリの実行時間制限

---

## 📚 学習リソース（アーカイブ）

このプロジェクトを理解するために参考にした技術資料：

### 書籍
- "GraphQL in Action" by Samer Buna
- "Learning GraphQL" by Eve Porcello & Alex Banks
- "Full Stack React" by Anthony Accomazzo

### オンラインリソース
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Guides](https://www.prisma.io/docs/)
- [Material-UI Documentation](https://mui.com/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)

### コミュニティ
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Prisma Community](https://github.com/prisma/prisma/discussions)
- [GraphQL Community](https://graphql.org/community/)

---

## 🤝 過去の貢献者

このプロジェクトに貢献いただいた方々（匿名化）：

### Core Team
- **Backend Architect**: GraphQL/Prisma設計、API実装
- **Frontend Engineer**: React/MUI実装、UX設計
- **DevOps Engineer**: CI/CD構築、インフラ管理
- **Security Specialist**: 認証システム、セキュリティ監査

### Contributors
- UI/UXデザイン改善
- パフォーマンス最適化
- テストカバレッジ向上
- ドキュメント整備

---

## 🔮 廃止されたロードマップ

### 実装されなかった機能
- **リアルタイムチャット**: WebSocket実装の複雑さにより延期
- **モバイルアプリ**: React Nativeによるネイティブアプリ開発
- **AI推薦システム**: 機械学習による作品推薦エンジン

### 技術的負債として残った課題
- **レガシーコード**: 初期実装の一部最適化が必要
- **テストカバレッジ**: E2Eテストの拡充が必要
- **監視体制**: APM・ログ監視の強化が必要

---

## 📞 過去のサポート情報

### 過去に利用していたサービス
- **Hosting**: Heroku → Vercel移行
- **Database**: Heroku PostgreSQL → Vercel PostgreSQL移行
- **Monitoring**: Heroku Metrics → Vercel Analytics移行

### 移行理由
- **パフォーマンス**: Vercel Edge Networkによる高速化
- **開発体験**: Next.jsとの完全統合
- **コスト**: 従量課金制による費用最適化

---

<div align="center">

## 📜 このドキュメントについて

このファイルは**アーカイブ目的**で保管されています。  
最新の情報は各専門ドキュメントを参照してください：

- **[メインドキュメント](../README.md)**: プロジェクト概要・セットアップ
- **[認証アーキテクチャ](auth-architecture-A.md)**: セキュリティ・認証システム
- **[バックエンド仕様](backend.md)**: GraphQL・API実装
- **[フロントエンド仕様](frontend.md)**: React・UI実装

---

**アーカイブ作成日**: 2025-09-07  
**最終更新**: プロジェクト分割時  
**管理者**: Documentation Team

</div>
