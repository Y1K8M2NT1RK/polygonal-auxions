import { builder } from '../../builder';
import { getEmailService } from '../../../../lib/email';
import { createWelcomeEmail, createPasswordResetEmail, createEmailVerificationEmail } from '../../../../lib/email/templates/common';

// Email send result type
const EmailSendResult = builder.simpleObject('EmailSendResult', {
  fields: (t) => ({
    success: t.boolean(),
    messageId: t.string({ nullable: true }),
    error: t.string({ nullable: true }),
  }),
});

// Email mutations
builder.mutationFields((t) => ({
  // Send welcome email
  sendWelcomeEmail: t.field({
    type: EmailSendResult,
    args: {
      email: t.arg.string({ required: true }),
      userName: t.arg.string({ required: true }),
      handleName: t.arg.string({ required: true }),
    },
    validate: [
      (args) => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(args.email)) {
          return false;
        }
        return true;
      },
      { message: '有効なメールアドレスを入力してください。' }
    ],
  resolve: async (_parent, args, _ctx) => {
      try {
        const emailService = getEmailService();
        const { subject, html, text } = createWelcomeEmail(args.userName, args.handleName);
        
        const result = await emailService.send(args.email, subject, html, text);
        
        return {
          success: result.success,
          messageId: result.messageId || null,
          error: null,
        };
      } catch (error) {
        console.error('Failed to send welcome email:', error);
        return {
          success: false,
          messageId: null,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
      }
    },
  }),

  // Send password reset email
  sendPasswordResetEmail: t.field({
    type: EmailSendResult,
    args: {
      email: t.arg.string({ required: true }),
      userName: t.arg.string({ required: true }),
      resetToken: t.arg.string({ required: true }),
      baseUrl: t.arg.string({ required: true }),
    },
    validate: [
      (args) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(args.email)) {
          return false;
        }
        return true;
      },
      { message: '有効なメールアドレスを入力してください。' }
    ],
  resolve: async (_parent, args, _ctx) => {
      try {
        const emailService = getEmailService();
        const { subject, html, text } = createPasswordResetEmail(args.userName, args.resetToken, args.baseUrl);
        
        const result = await emailService.send(args.email, subject, html, text);
        
        return {
          success: result.success,
          messageId: result.messageId || null,
          error: null,
        };
      } catch (error) {
        console.error('Failed to send password reset email:', error);
        return {
          success: false,
          messageId: null,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
      }
    },
  }),

  // Send email verification email
  sendEmailVerificationEmail: t.field({
    type: EmailSendResult,
    args: {
      email: t.arg.string({ required: true }),
      userName: t.arg.string({ required: true }),
      verificationToken: t.arg.string({ required: true }),
      baseUrl: t.arg.string({ required: true }),
    },
    validate: [
      (args) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(args.email)) {
          return false;
        }
        return true;
      },
      { message: '有効なメールアドレスを入力してください。' }
    ],
  resolve: async (_parent, args, _ctx) => {
      try {
        const emailService = getEmailService();
        const { subject, html, text } = createEmailVerificationEmail(args.userName, args.verificationToken, args.baseUrl);
        
        const result = await emailService.send(args.email, subject, html, text);
        
        return {
          success: result.success,
          messageId: result.messageId || null,
          error: null,
        };
      } catch (error) {
        console.error('Failed to send email verification email:', error);
        return {
          success: false,
          messageId: null,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
      }
    },
  }),

  // Test email sending (development/test environments only)
  sendTestEmail: t.field({
    type: EmailSendResult,
    args: {
      to: t.arg.string({ required: true }),
      subject: t.arg.string({ required: true }),
      content: t.arg.string({ required: true }),
    },
    validate: [
      (args) => {
        // Only allow in development/test environments
        const env = process.env.APP_ENV || 'development';
        if (env !== 'development' && env !== 'test') {
          return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(args.to)) {
          return false;
        }
        return true;
      },
      { message: 'テストメール送信は開発環境でのみ利用可能です。' }
    ],
  resolve: async (_parent, args, _ctx) => {
      try {
        const emailService = getEmailService();
        
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>${args.subject}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
              .header { background-color: #f8f9fa; padding: 20px; text-align: center; margin-bottom: 20px; }
              .content { background-color: white; padding: 20px; border: 1px solid #ddd; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🧪 テストメール</h1>
              <p>Environment: ${process.env.APP_ENV || 'development'}</p>
              <p>Provider: ${process.env.EMAIL_PROVIDER || 'smtp'}</p>
            </div>
            <div class="content">
              ${args.content.replace(/\n/g, '<br>')}
            </div>
          </body>
          </html>
        `;
        
        const text = `🧪 テストメール\n\nEnvironment: ${process.env.APP_ENV || 'development'}\nProvider: ${process.env.EMAIL_PROVIDER || 'smtp'}\n\n${args.content}`;
        
        const result = await emailService.send(args.to, `🧪 ${args.subject}`, html, text);
        
        return {
          success: result.success,
          messageId: result.messageId || null,
          error: null,
        };
      } catch (error) {
        console.error('Failed to send test email:', error);
        return {
          success: false,
          messageId: null,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
      }
    },
  }),
}));