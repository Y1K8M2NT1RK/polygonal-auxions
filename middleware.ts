import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
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