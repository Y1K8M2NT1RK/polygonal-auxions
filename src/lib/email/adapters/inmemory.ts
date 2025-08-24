import { EmailSender, EmailMessage, EmailSendResult } from '../types';

interface StoredEmail extends EmailMessage {
  messageId: string;
  timestamp: Date;
}

export class InMemoryAdapter implements EmailSender {
  private static emails: StoredEmail[] = [];

  async send(message: EmailMessage): Promise<EmailSendResult> {
    const messageId = `inmemory-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const storedEmail: StoredEmail = {
      ...message,
      messageId,
      timestamp: new Date(),
    };

    InMemoryAdapter.emails.push(storedEmail);

    return {
      success: true,
      messageId,
    };
  }

  /**
   * Get all stored emails (for testing purposes)
   */
  static getStoredEmails(): StoredEmail[] {
    return [...InMemoryAdapter.emails];
  }

  /**
   * Clear all stored emails (for testing purposes)
   */
  static clearStoredEmails(): void {
    InMemoryAdapter.emails = [];
  }

  /**
   * Find emails by recipient (for testing purposes)
   */
  static findEmailsByRecipient(to: string): StoredEmail[] {
    return InMemoryAdapter.emails.filter(email => email.to === to);
  }
}