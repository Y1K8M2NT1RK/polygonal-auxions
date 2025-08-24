/**
 * Welcome email template for new users
 */
export function createWelcomeEmail(userName: string, handleName: string): { subject: string; html: string; text: string } {
  try {
    // Prefer React Email version if dependency installed
    const { renderWelcomeEmail } = require('./react/WelcomeEmail');
    return renderWelcomeEmail(userName, handleName);
  } catch {
    const subject = 'Polygonal Auxionsへようこそ！';
    const html = `<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>${subject}</title></head><body><h1>${subject}</h1><p>${userName} さん、ようこそ！ (@${handleName})</p></body></html>`;
    const text = `${subject}\n${userName} さん、ようこそ！\n@${handleName}`;
    return { subject, html, text };
  }
}

/**
 * Password reset email template
 */
export function createPasswordResetEmail(userName: string, resetToken: string, baseUrl: string): { subject: string; html: string; text: string } {
  const subject = 'パスワードリセットのご案内';
  const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
  const currentYear = new Date().getFullYear();
  const yearText = currentYear === 2025 ? '2025' : `2025-${currentYear}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button { display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #666; }
        .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 4px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Polygonal Auxions</h1>
        </div>
        <div class="content">
          <h2>${userName} さん</h2>
          <p>パスワードリセットのリクエストを受け付けました。</p>
          <p>以下のボタンをクリックして、新しいパスワードを設定してください。</p>
          <a href="${resetUrl}" class="button">パスワードをリセット</a>
          <div class="warning">
            <p><strong>注意：</strong></p>
            <ul>
              <li>このリンクは24時間後に無効になります</li>
              <li>このリンクは一度のみ使用可能です</li>
              <li>身に覚えのないリクエストの場合は、このメールを無視してください</li>
            </ul>
          </div>
          <p>リンクが機能しない場合は、以下のURLを直接ブラウザにコピーしてください：</p>
          <p><small>${resetUrl}</small></p>
        </div>
        <div class="footer">
          <p>© ${yearText} Polygonal Auxions. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
${subject}

${userName} さん

パスワードリセットのリクエストを受け付けました。

以下のURLにアクセスして、新しいパスワードを設定してください：
${resetUrl}

注意：
- このリンクは24時間後に無効になります
- このリンクは一度のみ使用可能です
- 身に覚えのないリクエストの場合は、このメールを無視してください

© ${yearText} Polygonal Auxions. All rights reserved.
  `;

  return { subject, html, text };
}

/**
 * Email verification template
 */
export function createEmailVerificationEmail(userName: string, verificationToken: string, baseUrl: string): { subject: string; html: string; text: string } {
  const subject = 'メールアドレスの確認';
  const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
  const currentYear = new Date().getFullYear();
  const yearText = currentYear === 2025 ? '2025' : `2025-${currentYear}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button { display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Polygonal Auxions</h1>
        </div>
        <div class="content">
          <h2>${userName} さん</h2>
          <p>メールアドレスの確認をお願いします。</p>
          <p>以下のボタンをクリックして、メールアドレスを確認してください。</p>
          <a href="${verificationUrl}" class="button">メールアドレスを確認</a>
          <p>リンクが機能しない場合は、以下のURLを直接ブラウザにコピーしてください：</p>
          <p><small>${verificationUrl}</small></p>
        </div>
        <div class="footer">
          <p>© ${yearText} Polygonal Auxions. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
${subject}

${userName} さん

メールアドレスの確認をお願いします。

以下のURLにアクセスして、メールアドレスを確認してください：
${verificationUrl}

© ${yearText} Polygonal Auxions. All rights reserved.
  `;

  return { subject, html, text };
}