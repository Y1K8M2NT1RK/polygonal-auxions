import React from 'react';
import { Html, Head, Preview, Body, Container, Section, Text, Heading, Hr } from '@react-email/components';

interface WelcomeEmailProps {
  userName: string;
  handleName: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ userName, handleName }) => {
  return (
    <Html lang="ja">
      <Head />
      <Preview>Polygonal Auxionsへようこそ！</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Heading as="h1">Polygonal Auxions</Heading>
          </Section>
          <Section style={contentStyle}>
            <Heading as="h2">{userName} さん、ようこそ！</Heading>
            <Text>Polygonal Auxionsへのご登録ありがとうございます。</Text>
            <Section style={highlightStyle}>
              <Text>あなたのハンドルネーム: <strong>@{handleName}</strong></Text>
            </Section>
            <Text>今すぐ作品の投稿や他のユーザーとの交流を始めることができます。</Text>
            <Text>何かご質問がございましたら、お気軽にお問い合わせください。</Text>
            <Hr />
            <Text style={footStyle}>© {(() => { const y = new Date().getFullYear(); return y === 2025 ? '2025' : `2025-${y}`; })()} Polygonal Auxions. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Inline styles
const bodyStyle: React.CSSProperties = { fontFamily: 'Arial, sans-serif', background: '#f5f5f5', color: '#333', padding: '20px' };
const containerStyle: React.CSSProperties = { maxWidth: '600px', margin: '0 auto', background: '#ffffff', borderRadius: 6, overflow: 'hidden', border: '1px solid #eee' };
const headerStyle: React.CSSProperties = { background: '#f8f9fa', textAlign: 'center', padding: '24px 20px' };
const contentStyle: React.CSSProperties = { padding: 24 };
const highlightStyle: React.CSSProperties = { background: '#e3f2fd', padding: '12px 16px', borderRadius: 4, margin: '16px 0' };
const footStyle: React.CSSProperties = { fontSize: 12, color: '#666', textAlign: 'center' };

export function renderWelcomeEmail(userName: string, handleName: string) {
  const subject = 'Polygonal Auxionsへようこそ！';
  // dynamic import to avoid bundling react-email during runtime if not needed
  const ReactDOMServer = require('react-dom/server');
  const html = ReactDOMServer.renderToStaticMarkup(<WelcomeEmail userName={userName} handleName={handleName} />);
  const text = `${subject}\n\n${userName} さん、ようこそ！\n\nPolygonal Auxionsへのご登録ありがとうございます。\n\nあなたのハンドルネーム: @${handleName}`;
  return { subject, html: '<!DOCTYPE html>' + html, text };
}

export default WelcomeEmail;
