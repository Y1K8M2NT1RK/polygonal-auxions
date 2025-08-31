// Deprecated duplicate builder. Real builder moved to src/server/graphql/builder.ts
import type { NextApiRequest, NextApiResponse } from 'next';
export default function _deprecatedBuilderEndpoint(_req: NextApiRequest, res: NextApiResponse) {
  res.status(410).json({ error: 'Deprecated: use /api/graphql endpoint' });
}

