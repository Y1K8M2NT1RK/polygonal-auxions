// Deprecated placeholder. GraphQL schema moved to src/server/graphql/schema.ts
// Kept to satisfy any stale import during refactor; returns 410 Gone for any access.
import type { NextApiRequest, NextApiResponse } from 'next';
export default function _deprecatedSchemaEndpoint(_req: NextApiRequest, res: NextApiResponse) {
	res.status(410).json({ error: 'Deprecated: use /api/graphql' });
}