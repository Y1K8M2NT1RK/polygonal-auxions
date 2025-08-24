import { getEmailService } from '../../src/lib/email';
import { createWelcomeEmail, createPasswordResetEmail, createEmailVerificationEmail } from '../../src/lib/email/templates/common';
import { generateTestEmail } from '../../src/lib/email/validation';

interface CliArgs {
  to?: string;
  type: 'welcome' | 'reset' | 'verification' | 'test';
  name?: string;
  handle?: string;
  subject?: string;
  content?: string;
  token?: string;
  baseUrl?: string;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const parsed: Partial<CliArgs> = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace('--', '') as keyof CliArgs;
    const value = args[i + 1];
    if (key && value) {
      (parsed as any)[key] = value;
    }
  }

  if (!parsed.type) {
    throw new Error('--type is required (welcome|reset|verification|test)');
  }

  return parsed as CliArgs;
}

async function main() {
  try {
    const args = parseArgs();
    
    console.log('🔧 Email Service Configuration:');
    const emailService = getEmailService();
    console.log(`Environment: ${emailService.getEnvironment()}`);
    console.log(`Adapter: ${emailService.getAdapterType()}`);
    console.log(`Provider: ${process.env.EMAIL_PROVIDER || 'smtp'}`);
    console.log('');

    let to = args.to;
    if (!to) {
      // Generate test email for development
      to = generateTestEmail('test', args.type);
      console.log(`📧 Using generated test email: ${to}`);
    }

    let subject: string;
    let html: string;
    let text: string;

    switch (args.type) {
      case 'welcome':
        if (!args.name || !args.handle) {
          throw new Error('--name and --handle are required for welcome emails');
        }
        const welcome = createWelcomeEmail(args.name, args.handle);
        ({ subject, html, text } = welcome);
        break;

      case 'reset':
        if (!args.name) {
          throw new Error('--name is required for reset emails');
        }
        const token = args.token || 'test-reset-token-123';
        const baseUrl = args.baseUrl || 'http://localhost:3000';
        const reset = createPasswordResetEmail(args.name, token, baseUrl);
        ({ subject, html, text } = reset);
        break;

      case 'verification':
        if (!args.name) {
          throw new Error('--name is required for verification emails');
        }
        const verificationToken = args.token || 'test-verification-token-123';
        const verificationBaseUrl = args.baseUrl || 'http://localhost:3000';
        const verification = createEmailVerificationEmail(args.name, verificationToken, verificationBaseUrl);
        ({ subject, html, text } = verification);
        break;

      case 'test':
        if (!args.subject || !args.content) {
          throw new Error('--subject and --content are required for test emails');
        }
        subject = `🧪 ${args.subject}`;
        text = `🧪 Test Email\n\nEnvironment: ${process.env.APP_ENV || 'development'}\nProvider: ${process.env.EMAIL_PROVIDER || 'smtp'}\n\n${args.content}`;
        html = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>${subject}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
              .header { background-color: #f8f9fa; padding: 20px; text-align: center; margin-bottom: 20px; }
              .content { background-color: white; padding: 20px; border: 1px solid #ddd; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🧪 Test Email</h1>
              <p>Environment: ${process.env.APP_ENV || 'development'}</p>
              <p>Provider: ${process.env.EMAIL_PROVIDER || 'smtp'}</p>
            </div>
            <div class="content">
              ${args.content.replace(/\n/g, '<br>')}
            </div>
          </body>
          </html>
        `;
        break;

      default:
        throw new Error(`Unknown email type: ${args.type}`);
    }

    console.log(`📤 Sending ${args.type} email to: ${to}`);
    console.log(`📋 Subject: ${subject}`);
    console.log('');

    const result = await emailService.send(to, subject, html, text);

    if (result.success) {
      console.log('✅ Email sent successfully!');
      console.log(`📨 Message ID: ${result.messageId}`);
      
      if (process.env.EMAIL_PROVIDER === 'smtp') {
        console.log('');
        console.log('📬 Check Mailpit web interface:');
        console.log('   http://localhost:8025');
      }
    } else {
      console.error('❌ Failed to send email:', result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    console.log('');
  console.log('Usage examples:');
  console.log('  npx ts-node scripts/email/test-email.ts --type welcome --name "Test User" --handle testuser');
  console.log('  npx ts-node scripts/email/test-email.ts --type test --subject "Test Email" --content "Hello World"');
  console.log('  npx ts-node scripts/email/test-email.ts --to user@example.com --type reset --name "Test User"');
  console.log('  make email-test SUBJECT="Test" BODY="Hello" TO="user@example.com"');
    process.exit(1);
  }
}

main().catch(console.error);