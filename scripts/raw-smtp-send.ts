import nodemailer from 'nodemailer';
import crypto from 'crypto';

async function main() {
  const host = process.env.SMTP_HOST || '127.0.0.1';
  const port = parseInt(process.env.SMTP_PORT || '1025', 10);
  const transporter = nodemailer.createTransport({ host, port, secure: false });
  const token = crypto.randomBytes(16).toString('hex');
  const baseUrl = 'http://localhost:3000';
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;
  const to = process.env.TEST_EMAIL_TO || 'test@polygonal-auxions.local';
  const subject = 'テスト: パスワードリセット (TS)';
  const html = `<p>Reset link: <a href="${resetUrl}">${resetUrl}</a></p>`;
  const text = `Reset link: ${resetUrl}`;
  await transporter.sendMail({ from: 'notifications@polygonal-auxions.local', to, subject, html, text });
  console.log('Sent TS test email to', to);
}

main().catch(e => { console.error(e); process.exit(1); });
