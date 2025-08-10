# デプロイ制御方針

## 現状
- GitHub Actions のワークフローは削除済み (過去に build-only CI が存在)
- `vercel.json` の `"git": { "deploymentEnabled": false }` により push での自動デプロイ抑止

## 対策レイヤ
1. Vercel プロジェクト設定
   - Git Integration: Auto Deploy を "Production Branch" 以外無効 / Preview 自動無効
   - または Production Branch を存在しない名前 (例: `deploy`) に変更し、手動 Promote のみ
2. GitHub Actions による手動デプロイ Workflow (後述) を追加し、それ以外から vercel cli を呼ばない
3. `.vercelignore` で不要ファイルがビルドに乗らないよう最小化 (既存あり)

## 推奨運用フロー
1. 通常開発: feature/* ブランチ -> PR -> main へ merge (デプロイされない)
# デプロイ統制ポリシー

本リポジトリは Vercel への自動デプロイを停止し、明示的な手順による **再現性 / 検証 / 迅速ロールバック** を優先します。

## 1. 自動デプロイ停止理由
- 未検証コードの即時公開を防ぐ
- ビルド揺らぎ (依存/生成物) を手元で検証してから反映
- リリース単位の監査 (コミットメッセージ / 差分) を容易化

## 2. 設定
`vercel.json`
```json
{
  "git": { "deploymentEnabled": false }
}
```
Git push では Vercel に反映されません。

## 3. 手動デプロイ手順
1. main へ merge (またはリリース対象コミットを確定)
2. Preview デプロイで動作確認
3. 問題なければ Production デプロイ

### Preview
```
npm ci
npx prisma generate
npx graphql-codegen
npm run build
npx vercel --prebuilt --confirm
```

### Production
```
npm ci
npx prisma generate
npx graphql-codegen
npm run build
npx vercel deploy --prod --prebuilt --confirm
```

## 4. ロールバック
Vercel ダッシュボード > Deployments から過去 Production を Promote。

## 5. 品質ゲート (ローカル実行推奨)
- npm run lint / typecheck (存在する場合)
- prisma generate / graphql-codegen 成功
- `docker compose --profile verify up --build --exit-code-from verify` による smoke

## 6. コミットメッセージ規約
- 日本語 / 20文字以内 / 要約 (例: `認証比較修正`, `手動デプロイ追記`)

## 7. 今後の拡張候補
- 自動 Preview (手動トリガー GitHub Action) 化
- 署名付きリリースタグ運用
- デプロイ前 SBOM / 依存脆弱性スキャン

---
最小構成での安全な手動運用を維持しつつ、必要性が出た段階で段階的に自動化を追加します。
2. リリース準備: `git tag vX.Y.Z` or `workflow_dispatch` で Deploy workflow 実行
3. Vercel Dashboard で結果確認

## 例: 手動デプロイ Workflow (テンプレート / 現在は未使用)
```yaml
name: Deploy (Manual)

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'deploy target (production|preview)'
        required: true
        default: 'preview'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx prisma generate
      - run: npx graphql-codegen
      - run: npm run build
      - name: Vercel Deploy
        run: npx vercel --token ${{ secrets.VERCEL_TOKEN }} --prod --confirm
        if: ${{ github.event.inputs.environment == 'production' }}
      - name: Vercel Deploy (preview)
        run: npx vercel --token ${{ secrets.VERCEL_TOKEN }} --confirm
        if: ${{ github.event.inputs.environment == 'preview' }}
```

## Secrets
- `VERCEL_TOKEN`: Vercel Personal Token
- (Optional) `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` を CLI 利用に応じ設定

## 注意
- main に push しても Vercel 側 Auto Deploy がオフになっていないと実行されるので、Dashboard で必ず無効化
- B案ブランチ (auth-model-b など) も同様に自動デプロイ無効

