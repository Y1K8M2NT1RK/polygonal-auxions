import type { NextApiRequest, NextApiResponse } from 'next';
import { cookieModule } from '@/server/graphql/types/cookie';
import { createContext } from './graphql';

// Issue a CSRF token (idempotent). Client can GET /api/csrf to ensure csrfToken cookie is set.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ctx = await createContext(req, res);
  const token = cookieModule.ensureCsrf(ctx);
  res.status(200).json({ csrfToken: token });
}
