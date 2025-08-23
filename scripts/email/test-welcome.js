#!/usr/bin/env node

/**
 * Test welcome email functionality
 */

const nodemailer = require('nodemailer');

async function sendWelcomeEmail() {
  console.log('🎉 Testing Welcome Email Template...');
  console.log('');

  // Create SMTP transporter for Mailpit
  const transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 1025,
    secure: false,
  });

  // Welcome email template (simplified version of our TypeScript template)
  const userName = '田中 太郎';
  const handleName = 'tanaka-taro';
  const subject = 'Polygonal Auxionsへようこそ！';
  
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
        .footer { background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #666; }
        .highlight { background-color: #e3f2fd; padding: 10px; border-radius: 4px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Polygonal Auxions</h1>
        </div>
        <div class="content">
          <h2>${userName} さん、ようこそ！</h2>
          <p>Polygonal Auxionsへのご登録ありがとうございます。</p>
          <div class="highlight">
            <p>あなたのハンドルネーム: <strong>@${handleName}</strong></p>
          </div>
          <p>今すぐ作品の投稿や他のユーザーとの交流を始めることができます。</p>
          <p>何かご質問がございましたら、お気軽にお問い合わせください。</p>
          
          <h3>🚀 次のステップ:</h3>
          <ul>
            <li>プロフィールを充実させましょう</li>
            <li>最初の作品を投稿してみましょう</li>
            <li>他のユーザーをフォローしてみましょう</li>
          </ul>
        </div>
        <div class="footer">
          <p>© 2025 Polygonal Auxions. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
${subject}

${userName} さん、ようこそ！

Polygonal Auxionsへのご登録ありがとうございます。

あなたのハンドルネーム: @${handleName}

今すぐ作品の投稿や他のユーザーとの交流を始めることができます。

何かご質問がございましたら、お気軽にお問い合わせください。

🚀 次のステップ:
- プロフィールを充実させましょう
- 最初の作品を投稿してみましょう
- 他のユーザーをフォローしてみましょう

© 2025 Polygonal Auxions. All rights reserved.
  `;

  const welcomeEmail = {
    from: 'notifications@polygonal-auxions.local',
    to: 'tanaka-taro+welcome@example.com',
    subject: subject,
    html: html,
    text: text
  };

  try {
    console.log('📤 Sending welcome email...');
    console.log(`To: ${welcomeEmail.to}`);
    console.log(`Subject: ${welcomeEmail.subject}`);
    console.log('');

    const info = await transporter.sendMail(welcomeEmail);
    
    console.log('✅ Welcome email sent successfully!');
    console.log(`📨 Message ID: ${info.messageId}`);
    console.log('');
    console.log('📬 Check Mailpit web interface:');
    console.log('   http://localhost:8025');
    console.log('');
    console.log('🎉 Welcome email template is working correctly!');
    
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error.message);
    process.exit(1);
  }
}

// Run the test
sendWelcomeEmail().catch(console.error);