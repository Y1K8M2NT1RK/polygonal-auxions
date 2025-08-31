import type { NextApiRequest, NextApiResponse } from 'next';
import { cookieModule } from '@/server/graphql/types/cookie';
import { createContext } from './graphql';

// Issue a CSRF token (idempotent). Client can GET /api/csrf to ensure csrfToken cookie is set.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end();
    return;
  }
  const ctx = await createContext(req, res);
  const token = cookieModule.ensureCsrf(ctx);
  // キャッシュ無効化 (ブラウザ / CDN)
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.status(200).json({ csrfToken: token });
}
