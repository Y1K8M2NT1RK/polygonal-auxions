import * as React from 'react';
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Button, Hr } from '@react-email/components';

export function renderPasswordResetEmail(userName: string, resetToken: string, baseUrl: string) {
  const subject = 'パスワードリセットのご案内';
  const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
  const currentYear = new Date().getFullYear();
  const yearText = currentYear === 2025 ? '2025' : `2025-${currentYear}`;

  const html = (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading as="h1">Polygonal Auxions</Heading>
          <Section style={styles.section}>
            <Heading as="h2" style={styles.h2}>{userName} さん</Heading>
            <Text>パスワードリセットのリクエストを受け付けました。</Text>
            <Text>以下のボタンをクリックして、新しいパスワードを設定してください。</Text>
            <Button href={resetUrl} style={styles.primaryBtn}>パスワードをリセット</Button>
            <Section style={styles.notice}>
              <Text style={styles.noticeTitle}>注意：</Text>
              <ul style={styles.ul as any}>
                <li>このリンクは24時間後に無効になります</li>
                <li>このリンクは一度のみ使用可能です</li>
                <li>身に覚えのないリクエストの場合は、このメールを無視してください</li>
              </ul>
            </Section>
            <Text>リンクが機能しない場合は、以下のURLを直接ブラウザにコピーしてください：</Text>
            <Text style={styles.code}>{resetUrl}</Text>
            <Hr />
            <Text style={styles.footer}>© {yearText} Polygonal Auxions. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );

  const text = `${subject}\n\n${userName} さん\n\nパスワードリセットのリクエストを受け付けました。\n\n以下のURLにアクセスして、新しいパスワードを設定してください：\n${resetUrl}\n\n注意：\n- このリンクは24時間後に無効になります\n- このリンクは一度のみ使用可能です\n- 身に覚えのないリクエストの場合は、このメールを無視してください\n\n© ${yearText} Polygonal Auxions. All rights reserved.`;

  return { subject, html: "" + require('react-dom/server').renderToStaticMarkup(html), text };
}

const styles = {
  body: { background: '#ffffff', fontFamily: 'Arial, sans-serif' },
  container: { padding: '20px', border: '1px solid #e5e5e5', borderRadius: '6px' },
  section: { marginTop: '8px' },
  h2: { fontSize: '18px', marginBottom: '12px' },
  primaryBtn: { backgroundColor: '#007bff', color: '#fff', padding: '12px 20px', borderRadius: '4px', textDecoration: 'none', display: 'inline-block' },
  notice: { backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', padding: '12px', borderRadius: '4px', marginTop: '16px' },
  noticeTitle: { fontWeight: 'bold', marginBottom: '4px' },
  ul: { paddingLeft: '20px', margin: '4px 0' },
  code: { fontFamily: 'monospace', fontSize: '12px', wordBreak: 'break-all' },
  footer: { fontSize: '12px', color: '#666', marginTop: '24px' },
};

export default renderPasswordResetEmail;
