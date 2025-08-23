import { EmailSender, EmailProvider, AppEnvironment } from './types';
import { validateEmailAddress } from './validation';
import { ResendAdapter } from './adapters/resend';
import { SmtpAdapter } from './adapters/smtp';
import { InMemoryAdapter } from './adapters/inmemory';

class EmailService {
  private adapter: EmailSender;
  private environment: AppEnvironment;

  constructor() {
    this.environment = (process.env.APP_ENV || 'development') as AppEnvironment;
    this.adapter = this.createAdapter();
  }

  private createAdapter(): EmailSender {
    const provider = (process.env.EMAIL_PROVIDER || 'smtp') as EmailProvider;

    switch (provider) {
      case 'resend':
        return new ResendAdapter();
      case 'smtp':
        return new SmtpAdapter();
      case 'inmemory':
        return new InMemoryAdapter();
      default:
        throw new Error(`Unsupported email provider: ${provider}`);
    }
  }

  async send(to: string, subject: string, html: string, text?: string) {
    // Validate email address for production/staging environments
    validateEmailAddress(to, this.environment);

    const message = {
      to,
      subject,
      html,
      text,
    };

    const result = await this.adapter.send(message);
    
    if (!result.success) {
      console.error('Failed to send email:', result.error);
      throw new Error(`Email send failed: ${result.error}`);
    }

    console.log(`Email sent successfully to ${to} with messageId: ${result.messageId}`);
    return result;
  }

  /**
   * Get current environment for testing purposes
   */
  getEnvironment(): AppEnvironment {
    return this.environment;
  }

  /**
   * Get current adapter type for testing purposes
   */
  getAdapterType(): string {
    return this.adapter.constructor.name;
  }
}

// Singleton instance
let emailService: EmailService | null = null;

export function getEmailService(): EmailService {
  if (!emailService) {
    emailService = new EmailService();
  }
  return emailService;
}

// Export for testing purposes
export { EmailService };