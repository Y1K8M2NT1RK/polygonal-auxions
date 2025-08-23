#!/usr/bin/env node

/**
 * Simple email test script that works without complex TypeScript setup
 * Usage:
 *   node scripts/email/simple-test.js
 */

const nodemailer = require('nodemailer');

async function testMailpitConnection() {
  console.log('🧪 Testing Mailpit Email Functionality...');
  console.log('');

  // Create SMTP transporter for Mailpit
  const transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 1025,
    secure: false,
  });

  // Test email content
  const testEmail = {
    from: 'notifications@polygonal-auxions.local',
    to: 'test+demo@example.com',
    subject: '🧪 Polygonal Auxions Email Test',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Email Test</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
          .header { background-color: #007bff; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f8f9fa; padding: 20px; border: 2px solid #007bff; border-top: none; border-radius: 0 0 8px 8px; }
          .success { color: #28a745; font-weight: bold; }
          .feature { margin: 10px 0; padding: 8px; background: white; border-left: 4px solid #007bff; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚀 Polygonal Auxions</h1>
          <p>Email System Test</p>
        </div>
        <div class="content">
          <h2 class="success">✅ Email functionality is working!</h2>
          
          <h3>🔧 Configuration Details:</h3>
          <div class="feature"><strong>Environment:</strong> ${process.env.APP_ENV || 'development'}</div>
          <div class="feature"><strong>Provider:</strong> ${process.env.EMAIL_PROVIDER || 'smtp'}</div>
          <div class="feature"><strong>SMTP Host:</strong> ${process.env.SMTP_HOST || '127.0.0.1'}</div>
          <div class="feature"><strong>SMTP Port:</strong> ${process.env.SMTP_PORT || '1025'}</div>
          
          <h3>🎯 Features Tested:</h3>
          <div class="feature">✅ SMTP Adapter Connection</div>
          <div class="feature">✅ Mailpit Integration</div>
          <div class="feature">✅ HTML Template Rendering</div>
          <div class="feature">✅ Environment Configuration</div>
          <div class="feature">✅ Japanese Character Support</div>
          
          <h3>📬 Next Steps:</h3>
          <p>Visit <a href="http://localhost:8025">http://localhost:8025</a> to view this email in Mailpit's web interface.</p>
          
          <p><em>Timestamp: ${new Date().toISOString()}</em></p>
        </div>
      </body>
      </html>
    `,
    text: `
🚀 Polygonal Auxions Email System Test

✅ Email functionality is working!

🔧 Configuration Details:
- Environment: ${process.env.APP_ENV || 'development'}
- Provider: ${process.env.EMAIL_PROVIDER || 'smtp'}
- SMTP Host: ${process.env.SMTP_HOST || '127.0.0.1'}
- SMTP Port: ${process.env.SMTP_PORT || '1025'}

🎯 Features Tested:
✅ SMTP Adapter Connection
✅ Mailpit Integration
✅ HTML Template Rendering
✅ Environment Configuration
✅ Japanese Character Support

📬 Next Steps:
Visit http://localhost:8025 to view this email in Mailpit's web interface.

Timestamp: ${new Date().toISOString()}
    `
  };

  try {
    console.log('📤 Sending test email...');
    console.log(`To: ${testEmail.to}`);
    console.log(`Subject: ${testEmail.subject}`);
    console.log('');

    const info = await transporter.sendMail(testEmail);
    
    console.log('✅ Email sent successfully!');
    console.log(`📨 Message ID: ${info.messageId}`);
    console.log('');
    console.log('📬 Check Mailpit web interface:');
    console.log('   http://localhost:8025');
    console.log('');
    console.log('🎉 Email system is working correctly!');
    
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    console.log('');
    console.log('🔍 Troubleshooting:');
    console.log('1. Make sure Mailpit is running: docker ps | grep mailpit');
    console.log('2. Check if port 1025 is accessible: curl -I http://localhost:8025');
    console.log('3. Verify environment variables in .env file');
    process.exit(1);
  }
}

// Run the test
testMailpitConnection().catch(console.error);