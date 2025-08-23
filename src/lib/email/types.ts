// Email interface types
export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface EmailSender {
  send(message: EmailMessage): Promise<EmailSendResult>;
}

export type EmailProvider = 'resend' | 'smtp' | 'inmemory';

export type AppEnvironment = 'development' | 'test' | 'staging' | 'production';