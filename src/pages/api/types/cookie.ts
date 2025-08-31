import { SignJWT } from 'jose';
import { serialize } from 'cookie';
import { randomBytes } from 'crypto';
import { prisma } from '../../../server/db';
import { YogaContext } from '../../../server/graphql/context';

export const cookieModule: {
  token: object;
  csrf: object;
  setCookie: (user_id: number, context: YogaContext) => Promise<any>;
  ensureCsrf: (context: YogaContext) => string;
  deleteCookie: (context: YogaContext) => Promise<boolean>;
} = {
  token:  { name: 'token', httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 15, sameSite: 'strict', path: '/' },
  csrf:   { name: 'csrfToken', httpOnly: false, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24, sameSite: 'strict', path: '/' },
  setCookie: async (user_id, context) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? '');
    const now = Math.floor(Date.now() / 1000);
    const jti = randomBytes(16).toString('hex');
    const access_token = await new SignJWT({ id: user_id, jti })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt(now)
      .setExpirationTime('15m')
      .sign(secret);
    const authPayload = await prisma.authPayload.upsert({
      where: { user_id },
      update: { access_token, expires_at: new Date(Date.now() + 15 * 60 * 1000) },
      create: { access_token, user_id, expires_at: new Date(Date.now() + 15 * 60 * 1000) },
    });
    const csrfToken = randomBytes(24).toString('hex');
    context.res.setHeader('Set-Cookie', [
      serialize('token', access_token, cookieModule.token),
      serialize('csrfToken', csrfToken, cookieModule.csrf),
    ]);
    return authPayload;
  },
  ensureCsrf: (context) => {
    const existing = (context.req as any).cookies?.csrfToken;
    if (existing) return existing;
    const csrfToken = randomBytes(24).toString('hex');
    context.res.setHeader('Set-Cookie', [
      serialize('csrfToken', csrfToken, cookieModule.csrf),
    ]);
    return csrfToken;
  },
  deleteCookie: async (context) => {
    try {
      if (context?.auth?.id) {
        await prisma.authPayload.delete({ where: { user_id: context.auth.id } });
      }
    } catch {}
    context.res.setHeader('Set-Cookie', [
      serialize('token', '', { ...cookieModule.token, maxAge: -1 }),
      serialize('csrfToken', '', { ...cookieModule.csrf, maxAge: -1 }),
    ]);
    return true;
  },
};
