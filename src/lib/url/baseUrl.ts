// Helper to derive the application external base URL for generating email links
// Priority:
// 1. APP_BASE_URL (no trailing slash enforced)
// 2. http(s)://APP_HOST:APP_PORT
// 3. Fallback http://localhost:3000

function normalize(url: string): string {
  return url.replace(/\/$/, '');
}

export function getAppBaseUrl(): string {
  if (process.env.APP_BASE_URL) return normalize(process.env.APP_BASE_URL);
  const host = process.env.APP_HOST || 'localhost';
  const port = process.env.APP_PORT || '3000';
  const protocol = process.env.APP_PROTOCOL || 'http';
  return normalize(`${protocol}://${host}:${port}`);
}

export function buildResetPasswordUrl(token: string): string {
  return `${getAppBaseUrl()}/reset-password?token=${token}`;
}

export function buildEmailVerificationUrl(token: string): string {
  return `${getAppBaseUrl()}/verify-email?token=${token}`;
}

export function buildPasswordSetUrl(token: string): string { // future use
  return `${getAppBaseUrl()}/set-password?token=${token}`;
}
