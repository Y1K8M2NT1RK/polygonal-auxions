// Deprecated duplicate Prisma client. Use src/server/db.ts instead.
import type { NextApiRequest, NextApiResponse } from 'next';
export default function _deprecatedDbEndpoint(_req: NextApiRequest, res: NextApiResponse) {
    res.status(410).json({ error: 'Deprecated: use server db module' });
}