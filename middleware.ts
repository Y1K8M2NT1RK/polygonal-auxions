import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Basic Authによる認証
    const auth = request.headers.get('authorization');
    if (auth) {
        const [scheme, encoded] = auth.split(' ');
        if (scheme === 'Basic') {
            const [user, pass] = Buffer.from(encoded, 'base64').toString('utf-8').split(':');
            if (user === process.env.BASIC_AUTH_USER && pass === process.env.BASIC_AUTH_PASS) {
                return NextResponse.next();
            }
        }
    }
    // 本番環境で"/api/debug"と"/api/openssl"にアクセスした場合は404エラーを返す
    if( process.env.NODE_ENV === 'production' ) {
        const restrictedPaths = ['/api/debug', '/api/openssl'];
        if (restrictedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
            return NextResponse.json({error: 'Not Found'},  {status: 404});
        }
    }
    return new Response('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"'
        }
    });
}

export const config = {
    matcher: '/:path*'
};