import { SignJWT } from 'jose';
import { serialize } from 'cookie';
import { randomBytes } from 'crypto';
import { prisma } from '../../db';
import { YogaContext } from '../context';

export const cookieModule = {
	token: {
		name: 'token',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 15, // 15m
		sameSite: 'strict',
		path: '/',
	},
	csrf: {
		name: 'csrfToken',
		httpOnly: false,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24, // 24h
		sameSite: 'strict',
		path: '/',
	},

	async setCookie(user_id: number, context: YogaContext) {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? '');
		const now = Math.floor(Date.now() / 1000);
		const jti = randomBytes(16).toString('hex');

		const access_token = await new SignJWT({ id: user_id, jti })
			.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
			.setIssuedAt(now)
			.setExpirationTime('15m')
			.sign(secret);

		const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
		const authPayload = await prisma.authPayload.upsert({
			where: { user_id },
			update: { access_token, expires_at: expiresAt },
			create: { access_token, user_id, expires_at: expiresAt },
		});

		const csrfToken = randomBytes(24).toString('hex');
		context.res.setHeader('Set-Cookie', [
			serialize('token', access_token, this.token),
			serialize('csrfToken', csrfToken, this.csrf),
		]);
		return authPayload;
	},

	ensureCsrf(context: YogaContext) {
		const existing = (context.req as any).cookies?.csrfToken;
		if (existing) return existing;
		const csrfToken = randomBytes(24).toString('hex');
		context.res.setHeader('Set-Cookie', [
			serialize('csrfToken', csrfToken, this.csrf),
		]);
		return csrfToken;
	},

	async deleteCookie(context: YogaContext) {
		try {
			if (context?.auth?.id) {
				await prisma.authPayload.delete({ where: { user_id: context.auth.id } });
			}
		} catch {}

		context.res.setHeader('Set-Cookie', [
			serialize('token', '', { ...this.token, maxAge: -1 }),
			serialize('csrfToken', '', { ...this.csrf, maxAge: -1 }),
		]);
		return true;
	},
} as const;