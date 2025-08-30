import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { createPasswordResetEmail } from '../src/lib/email/templates/common';
import { getEmailService } from '../src/lib/email';
import { getAppBaseUrl } from '../src/lib/url/baseUrl';

async function main() {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      console.error('No user found in DB.');
      process.exit(1);
    }
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000);
    await prisma.passwordResetToken.create({ data: { token, user_id: user.id, expires_at: expiresAt } });
  const baseUrl = getAppBaseUrl();
    const { subject, html, text } = createPasswordResetEmail(user.name, token, baseUrl);
    const emailService = getEmailService();
    console.log('Adapter:', emailService.getAdapterType());
    await emailService.send(user.email, subject, html, text);
    console.log('Password reset email sent to', user.email);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => { console.error('Error:', e); process.exit(1); });
