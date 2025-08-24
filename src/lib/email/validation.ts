import { AppEnvironment } from './types';

export class EmailValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailValidationError';
  }
}

/**
 * Validates email addresses against allowed domains in production/staging environments
 */
export function validateEmailAddress(email: string, environment: AppEnvironment): void {
  // Only validate in production/staging environments
  if (environment !== 'production' && environment !== 'staging') {
    return;
  }

  const allowedDomains = process.env.ALLOWED_EMAIL_DOMAINS?.split(',').map(d => d.trim()) || [];
  
  if (allowedDomains.length === 0) {
    throw new EmailValidationError('ALLOWED_EMAIL_DOMAINS must be configured for production/staging');
  }

  const emailDomain = email.split('@')[1]?.toLowerCase();
  if (!emailDomain) {
    throw new EmailValidationError('Invalid email format');
  }

  if (!allowedDomains.some(domain => domain.toLowerCase() === emailDomain)) {
    throw new EmailValidationError(`Email domain ${emailDomain} is not allowed in ${environment} environment`);
  }
}

/**
 * Generates test email addresses for development environment only
 */
export function generateTestEmail(baseEmail: string = 'user', testCase: string = 'default'): string {
  const environment = (process.env.APP_ENV || 'development') as AppEnvironment;
  
  if (environment !== 'development' && environment !== 'test') {
    throw new EmailValidationError('Test email generation is only allowed in development/test environments');
  }

  return `${baseEmail}+${testCase}@example.com`;
}