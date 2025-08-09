# フロントエンド指針

## 1. 技術スタック
- Next.js / React (pages router + `src/app` 併用)
- urql
- MUI

## 2. ディレクトリ構成（現状）
- レイアウト/グローバル: `src/app/`
- ページ: `src/pages/*.tsx`
- 共通コンポーネント: `src/components/`
- Hooks: `src/hooks/`
- Context: `src/contexts/`
- ページ専用コンポーネント: 適宜ページ配下 or 暫定 `src/pages/components/`
- 定数: `src/constants/`
- 生成物: `src/generated/`

## 3. コンポーネント
- 再利用 UI → `src/components`
- 命名: PascalCase (`UserCard.tsx`)
- ロジック肥大時は Hook 抽出

## 4. Hooks
- 命名: `use` プレフィックス (`useResponsive`)
- UI からビジネスロジックを分離

## 5. 状態管理
- グローバル: Context API (`src/contexts`)
- 局所: useState / useReducer

## 6. GraphQL / urql
- Persisted Operations 利用前提
- キャッシュポリシー方針は追記予定

## 7. スタイル
- MUI テーマをルートで統一 (`_app.tsx` or `src/app`)

## 8. 型安全
- 生成型優先 (GraphQL codegen)

## 9. ディレクトリ新設ルール
- 3+ 再利用 or 役割明確化が必要になった時点で分離

最終更新: 2025-08-09
