import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Basic Authによる認証（環境変数が設定されている場合のみ）
    const basicAuthUser = process.env.BASIC_AUTH_USER;
    const basicAuthPass = process.env.BASIC_AUTH_PASS;
    
    if (basicAuthUser && basicAuthPass) {
        const auth = request.headers.get('authorization');
        if (auth) {
            const [scheme, encoded] = auth.split(' ');
            if (scheme === 'Basic') {
                const [user, pass] = Buffer.from(encoded, 'base64').toString('utf-8').split(':');
                if (user === basicAuthUser && pass === basicAuthPass) {
                    // Basic Auth成功時は通常のフローに進む
                } else {
                    return new Response('Authentication required', {
                        status: 401,
                        headers: {
                            'WWW-Authenticate': 'Basic realm="Secure Area"'
                        }
                    });
                }
            } else {
                return new Response('Authentication required', {
                    status: 401,
                    headers: {
                        'WWW-Authenticate': 'Basic realm="Secure Area"'
                    }
                });
            }
        } else {
            return new Response('Authentication required', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Secure Area"'
                }
            });
        }
    }
    
    // CSRF 簡易対策: /api/graphql への cross-site POST を Origin/Referer で拒否
    if (request.method === 'POST' && request.nextUrl.pathname === '/api/graphql') {
        const origin = request.headers.get('origin');
        const referer = request.headers.get('referer');
        const selfHost = request.nextUrl.host;
        const allowed = (process.env.CSRF_ALLOWED_HOSTS || '')
            .split(',')
            .map(h => h.trim())
            .filter(Boolean);
        if (!allowed.length) allowed.push(selfHost);
        const extractHost = (urlStr: string | null) => {
            if (!urlStr) return null;
            try { return new URL(urlStr).host; } catch { return null; }
        }
        const originHost = extractHost(origin);
        const refererHost = extractHost(referer);
        if (originHost && !allowed.includes(originHost)) {
            return new Response('Forbidden (CSRF)', { status: 403 });
        }
        if (!originHost && refererHost && !allowed.includes(refererHost)) {
            return new Response('Forbidden (CSRF)', { status: 403 });
        }
    }

    // 以前存在した debug / openssl API は削除済み (保守コメント)
    
    return NextResponse.next();
}

export const config = {
    matcher: '/:path*'
};