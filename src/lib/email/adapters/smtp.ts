import * as nodemailer from 'nodemailer';
import { EmailSender, EmailMessage, EmailSendResult } from '../types';

export class SmtpAdapter implements EmailSender {
  private transporter: nodemailer.Transporter;
  private fromAddress: string;

  constructor() {
    const host = process.env.SMTP_HOST || '127.0.0.1';
    const port = parseInt(process.env.SMTP_PORT || '1025', 10);
    
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false, // true for 465, false for other ports
      auth: undefined, // Mailpit doesn't require auth
    });

    this.fromAddress = process.env.RESEND_FROM || 'notifications@polygonal-auxions.local';
  }

  async send(message: EmailMessage): Promise<EmailSendResult> {
    try {
      const info = await this.transporter.sendMail({
        from: this.fromAddress,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}