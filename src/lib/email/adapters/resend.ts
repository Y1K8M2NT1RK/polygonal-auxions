import { Resend } from 'resend';
import { EmailSender, EmailMessage, EmailSendResult } from '../types';

export class ResendAdapter implements EmailSender {
  private resend: Resend;
  private fromAddress: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }

    this.resend = new Resend(apiKey);
    this.fromAddress = process.env.RESEND_FROM || 'notifications@polygonal-auxions.local';
  }

  async send(message: EmailMessage): Promise<EmailSendResult> {
    try {
      const result = await this.resend.emails.send({
        from: this.fromAddress,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });

      if (result.error) {
        return {
          success: false,
          error: result.error.message,
        };
      }

      return {
        success: true,
        messageId: result.data?.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}