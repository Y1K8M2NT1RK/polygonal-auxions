import * as React from 'react';
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Button, Hr } from '@react-email/components';

export function renderEmailVerificationEmail(userName: string, verificationToken: string, baseUrl: string) {
  const subject = 'メールアドレスの確認';
  const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
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
            <Text>メールアドレスの確認をお願いします。</Text>
            <Text>以下のボタンをクリックして、メールアドレスを確認してください。</Text>
            <Button href={verificationUrl} style={styles.primaryBtn}>メールアドレスを確認</Button>
            <Text>リンクが機能しない場合は、以下のURLを直接ブラウザにコピーしてください：</Text>
            <Text style={styles.code}>{verificationUrl}</Text>
            <Hr />
            <Text style={styles.footer}>© {yearText} Polygonal Auxions. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );

  const text = `${subject}\n\n${userName} さん\n\nメールアドレスの確認をお願いします。\n\n以下のURLにアクセスして、メールアドレスを確認してください：\n${verificationUrl}\n\n© ${yearText} Polygonal Auxions. All rights reserved.`;

  return { subject, html: "" + require('react-dom/server').renderToStaticMarkup(html), text };
}

const styles = {
  body: { background: '#ffffff', fontFamily: 'Arial, sans-serif' },
  container: { padding: '20px', border: '1px solid #e5e5e5', borderRadius: '6px' },
  section: { marginTop: '8px' },
  h2: { fontSize: '18px', marginBottom: '12px' },
  primaryBtn: { backgroundColor: '#28a745', color: '#fff', padding: '12px 20px', borderRadius: '4px', textDecoration: 'none', display: 'inline-block' },
  code: { fontFamily: 'monospace', fontSize: '12px' } as any,
  footer: { fontSize: '12px', color: '#666', marginTop: '24px' },
};

export default renderEmailVerificationEmail;
