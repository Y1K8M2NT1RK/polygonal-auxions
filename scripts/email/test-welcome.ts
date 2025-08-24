#!/usr/bin/env ts-node
import fs from 'fs';
import * as nodemailer from 'nodemailer';

async function sendWelcomeEmail() {
  console.log('🎉 Testing Welcome Email Template (TypeScript)...');
  console.log('');
  const IN_DOCKER = process.env.IN_DOCKER || (fs.existsSync('/.dockerenv') ? '1' : '');
  const host = process.env.SMTP_HOST || (IN_DOCKER ? 'mailpit' : '127.0.0.1');
  const port = parseInt(process.env.SMTP_PORT || '1025', 10);

  const userName = process.env.NAME || '田中 太郎';
  const handleName = process.env.HANDLE || 'tanaka-taro';
  const subject = process.env.SUBJECT || 'Polygonal Auxionsへようこそ！';

  const currentYear = new Date().getFullYear();
  const yearText = currentYear === 2025 ? '2025' : `2025-${currentYear}`;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${subject}</title><style>body{font-family:Arial, sans-serif;line-height:1.6;color:#333;} .container{max-width:600px;margin:0 auto;padding:20px;} .header{background-color:#f8f9fa;padding:20px;text-align:center;} .content{padding:20px;} .footer{background-color:#f8f9fa;padding:10px;text-align:center;font-size:12px;color:#666;} .highlight{background-color:#e3f2fd;padding:10px;border-radius:4px;margin:15px 0;}</style></head><body><div class="container"><div class="header"><h1>Polygonal Auxions</h1></div><div class="content"><h2>${userName} さん、ようこそ！</h2><p>Polygonal Auxionsへのご登録ありがとうございます。</p><div class="highlight"><p>あなたのハンドルネーム: <strong>@${handleName}</strong></p></div><p>今すぐ作品の投稿や他のユーザーとの交流を始めることができます。</p><p>何かご質問がございましたら、お気軽にお問い合わせください。</p><h3>🚀 次のステップ:</h3><ul><li>プロフィールを充実させましょう</li><li>最初の作品を投稿してみましょう</li><li>他のユーザーをフォローしてみましょう</li></ul></div><div class="footer"><p>© ${yearText} Polygonal Auxions. All rights reserved.</p></div></div></body></html>`;

  const text = `${subject}\n\n${userName} さん、ようこそ！\n\nPolygonal Auxionsへのご登録ありがとうございます。\n\nあなたのハンドルネーム: @${handleName}\n\n今すぐ作品の投稿や他のユーザーとの交流を始めることができます。\n\n何かご質問がございましたら、お気軽にお問い合わせください。\n\n🚀 次のステップ:\n- プロフィールを充実させましょう\n- 最初の作品を投稿してみましょう\n- 他のユーザーをフォローしてみましょう\n\n© ${yearText} Polygonal Auxions. All rights reserved.`;

  const transporter = nodemailer.createTransport({ host, port, secure: false });

  try {
    console.log('📤 Sending welcome email...');
    console.log(`To: ${process.env.TO || 'tanaka-taro+welcome@example.com'}`);
    console.log(`Subject: ${subject}`);
    const info = await transporter.sendMail({
      from: 'notifications@polygonal-auxions.local',
      to: process.env.TO || 'tanaka-taro+welcome@example.com',
      subject,
      html,
      text,
    });
    console.log('✅ Welcome email sent successfully!');
    console.log(`📨 Message ID: ${info.messageId}`);
    console.log('📬 Mailpit: http://localhost:8025');
  } catch (e: any) {
    console.error('❌ Failed to send welcome email:', e.message);
    process.exit(1);
  }
}

sendWelcomeEmail();
