#!/usr/bin/env ts-node
/**
 * Simple email test script (TypeScript)
 * Usage:
 *   SMTP_HOST=mailpit SMTP_PORT=1025 SUBJECT="Test" TO=user@example.com ts-node scripts/email/simple-test.ts
 *   make email-test [SUBJECT="..."] [TO=addr] [TYPE=welcome|test]
 */
import fs from 'fs';
import * as nodemailer from 'nodemailer';

interface SendOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

function buildDefaultHtml(subject: string, body: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${subject}</title><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333;padding:20px;} .header{background:#007bff;color:#fff;padding:16px;border-radius:6px 6px 0 0;} .content{border:2px solid #007bff;border-top:none;padding:16px;border-radius:0 0 6px 6px;background:#f8f9fa;} .meta{margin-top:16px;font-size:12px;color:#666;}</style></head><body><div class="header"><h1>Polygonal Auxions</h1><p>Email Test</p></div><div class="content">${body.replace(/\n/g,'<br>')}<div class="meta">Env: ${process.env.APP_ENV || 'development'} / Provider: ${process.env.EMAIL_PROVIDER || 'smtp'}<br/>Host: ${process.env.SMTP_HOST || 'auto'} Port: ${process.env.SMTP_PORT || '1025'}<br/>Time: ${new Date().toISOString()}</div></div></body></html>`;
}

async function run() {
  console.log('🧪 Testing Email Functionality (simple-test)...');
  const IN_DOCKER = process.env.IN_DOCKER || (fs.existsSync('/.dockerenv') ? '1' : '');
  const resolvedHost = process.env.SMTP_HOST || (IN_DOCKER ? 'mailpit' : '127.0.0.1');
  const resolvedPort = Number(process.env.SMTP_PORT || 1025);

  const type = process.env.TYPE || 'test'; // test | welcome
  const to = process.env.TO || (type === 'welcome' ? 'welcome+user@example.com' : 'test+demo@example.com');
  const subject = process.env.SUBJECT || (type === 'welcome' ? 'Welcome to Polygonal Auxions!' : '🧪 Polygonal Auxions Email Test');

  let html: string; let text: string;
  if (type === 'welcome') {
    const name = process.env.NAME || 'テストユーザー';
    const handle = process.env.HANDLE || 'test-user';
    const base = `\n${name} さん、ようこそ！\nPolygonal Auxionsへのご登録ありがとうございます。\nハンドル: @${handle}\n`;
    text = `${subject}${base}\nTime: ${new Date().toISOString()}`;
    html = buildDefaultHtml(subject, base);
  } else {
    const body = process.env.BODY || '✅ Email functionality is working!';
    text = `${subject}\n${body}\nTime: ${new Date().toISOString()}`;
    html = buildDefaultHtml(subject, body);
  }

  const transporter = nodemailer.createTransport({ host: resolvedHost, port: resolvedPort, secure: false });

  const opts: SendOptions = { from: 'notifications@polygonal-auxions.local', to, subject, html, text } as any;

  try {
    console.log(`📤 Sending email -> ${to}`);
    console.log(`Using SMTP host=${resolvedHost} port=${resolvedPort}`);
    const info = await transporter.sendMail(opts);
    console.log('✅ Email sent');
    console.log(`📨 Message ID: ${info.messageId}`);
    if ((process.env.EMAIL_PROVIDER || 'smtp') === 'smtp') {
      console.log('📬 Mailpit: http://localhost:8025');
    }
  } catch (e: any) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
  }
}

run();
