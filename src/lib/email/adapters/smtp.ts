import * as nodemailer from 'nodemailer';
import { EmailSender, EmailMessage, EmailSendResult } from '../types';
import fs from 'fs';
import dns from 'dns';

export class SmtpAdapter implements EmailSender {
  private transporter: nodemailer.Transporter;
  private fromAddress: string;

  constructor() {
    const insideContainer = fs.existsSync('/.dockerenv');
    const originalHost = process.env.SMTP_HOST || '127.0.0.1';
    let host = originalHost;
    const port = parseInt(process.env.SMTP_PORT || '1025', 10);

    // If running inside a container and pointing to localhost, switch to mailpit service hostname
    if (insideContainer && (host === '127.0.0.1' || host === 'localhost')) {
      host = process.env.SMTP_DOCKER_SERVICE || 'mailpit';
    }

    // Optional: if resolution fails, fall back to original host (best effort)
    try {
      dns.lookup(host, (err) => {
        if (err) {
          // fallback silently
          host = originalHost;
        }
      });
    } catch {
      /* ignore */
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: undefined,
    });

    if (originalHost !== host) {
      console.log(`[SmtpAdapter] Host adjusted from ${originalHost} to ${host} (inside container)`);
    }
    console.log(`[SmtpAdapter] Using host ${host}:${port}`);

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