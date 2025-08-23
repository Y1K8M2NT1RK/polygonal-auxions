# Email Functionality

Polygonal Auxionsでは、環境に応じて異なるメール送信方法を使用できるメール機能を実装しています。

## 環境構成

### 環境変数

```bash
# アプリケーション環境
APP_ENV=development|test|staging|production

# メールプロバイダー選択
EMAIL_PROVIDER=resend|smtp|inmemory

# Resend設定（本番・ステージング用）
RESEND_API_KEY=your-resend-api-key
RESEND_FROM=notifications@your-domain.com

# SMTP設定（開発・テスト用 - Mailpit）
SMTP_HOST=127.0.0.1
SMTP_PORT=1025

# 許可ドメイン（本番・ステージング用）
ALLOWED_EMAIL_DOMAINS=your-domain.com,another-domain.com
```

### 環境別設定

| 環境 | EMAIL_PROVIDER | 宛先制限 | 用途 |
|------|----------------|----------|------|
| development | smtp | なし（ダミー可） | Mailpit経由でメール確認 |
| test | inmemory または smtp | なし（ダミー可） | ユニット・統合テスト |
| staging | resend | allowlistのみ | 限定的な実配送テスト |
| production | resend | allowlistのみ | 本番運用 |

## 開発環境セットアップ

### 1. Mailpitの起動

```bash
# docker-composeでMailpitを含む開発環境を起動
docker compose --profile dev up -d

# または、Mailpitのみ起動
docker run -d \
  --name mailpit \
  -p 8025:8025 \
  -p 1025:1025 \
  axllent/mailpit:v1.14
```

### 2. 環境変数設定

```.env
APP_ENV=development
EMAIL_PROVIDER=smtp
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
```

### 3. メール送信テスト

```bash
# CLIツールでテストメール送信
node scripts/email/test-email.js --type test --subject "テストメール" --content "Hello World"

# ウェルカムメールのテスト
node scripts/email/test-email.js --type welcome --name "テストユーザー" --handle "testuser"
```

### 4. Mailpit Web UI確認

ブラウザで http://localhost:8025 にアクセスして送信されたメールを確認できます。

## メール送信機能

### GraphQL Mutations

#### 1. ウェルカムメール送信

```graphql
mutation SendWelcomeEmail($email: String!, $userName: String!, $handleName: String!) {
  sendWelcomeEmail(email: $email, userName: $userName, handleName: $handleName) {
    success
    messageId
    error
  }
}
```

#### 2. パスワードリセットメール送信

```graphql
mutation SendPasswordResetEmail($email: String!, $userName: String!, $resetToken: String!, $baseUrl: String!) {
  sendPasswordResetEmail(email: $email, userName: $userName, resetToken: $resetToken, baseUrl: $baseUrl) {
    success
    messageId
    error
  }
}
```

#### 3. テストメール送信（開発環境のみ）

```graphql
mutation SendTestEmail($to: String!, $subject: String!, $content: String!) {
  sendTestEmail(to: $to, subject: $subject, content: $content) {
    success
    messageId
    error
  }
}
```

### プログラムからの利用

```typescript
import { getEmailService } from '@/lib/email';
import { createWelcomeEmail } from '@/lib/email/templates/common';

// メールサービス取得
const emailService = getEmailService();

// ウェルカムメール送信
const { subject, html, text } = createWelcomeEmail('田中太郎', 'tanaka');
const result = await emailService.send('tanaka@example.com', subject, html, text);

if (result.success) {
  console.log('メール送信成功:', result.messageId);
} else {
  console.error('メール送信失敗:', result.error);
}
```

## 自動メール送信

### ユーザー作成時

新規ユーザーが作成されると、自動的にウェルカムメールが送信されます（`adminCreateUser` mutation）。

```typescript
// ユーザー作成後、非同期でウェルカムメール送信
const newUser = await prisma.user.create({ ... });

// エラーが発生してもユーザー作成は失敗しない
emailService.send(email, subject, html, text).catch(console.error);
```

## テストとデバッグ

### 1. InMemoryアダプターを使用したユニットテスト

```typescript
import { InMemoryAdapter } from '@/lib/email/adapters/inmemory';

beforeEach(() => {
  InMemoryAdapter.clearStoredEmails();
});

test('メール送信テスト', async () => {
  // EMAIL_PROVIDER=inmemory で設定
  const emailService = getEmailService();
  
  await emailService.send('test@example.com', 'Subject', '<p>Content</p>');
  
  const emails = InMemoryAdapter.getStoredEmails();
  expect(emails).toHaveLength(1);
  expect(emails[0].to).toBe('test@example.com');
});
```

### 2. ダミーメールアドレス生成

```typescript
import { generateTestEmail } from '@/lib/email/validation';

// 開発・テスト環境でのみ利用可能
const testEmail = generateTestEmail('user', 'welcome-test');
// => "user+welcome-test@example.com"
```

### 3. CLIツールによるテスト

```bash
# 基本的なテストメール
node scripts/email/test-email.js --type test --subject "Test" --content "Hello"

# 特定のメールアドレスに送信
node scripts/email/test-email.js --to user@example.com --type welcome --name "Test User" --handle "testuser"

# パスワードリセットメール
node scripts/email/test-email.js --type reset --name "Test User" --token "abc123" --baseUrl "http://localhost:3000"
```

## 本番運用

### 1. Resend API設定

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM=notifications@your-domain.com
EMAIL_PROVIDER=resend
```

### 2. 許可ドメイン設定

```bash
ALLOWED_EMAIL_DOMAINS=your-domain.com,partner-domain.com
```

### 3. ログ確認

メール送信の成功・失敗はコンソールログに出力されます：

```
Email sent successfully to user@example.com with messageId: abc123
Failed to send email: RESEND_API_KEY environment variable is required
```

## 注意事項

1. **ダミーメールアドレス**: 開発・テスト環境でのみ利用可能
2. **Allowlist**: 本番・ステージング環境では設定必須
3. **非同期送信**: ユーザー作成などでは、メール送信エラーがメイン処理を阻害しない
4. **Mailpit**: 開発環境でのメール確認用。実際には送信されない
5. **レート制限**: Resendの利用制限に注意

## トラブルシューティング

### Mailpitに接続できない

```bash
# Mailpitの状態確認
docker ps | grep mailpit

# ポート確認
curl -I http://localhost:8025

# ログ確認
docker logs mailpit
```

### Resend送信失敗

- API キーの確認
- From アドレスのドメイン認証確認
- 送信制限の確認

### 環境変数設定ミス

```bash
# 設定確認
node -e "console.log(process.env.EMAIL_PROVIDER, process.env.APP_ENV)"
```