import type { NextApiRequest, NextApiResponse } from 'next';

export interface YogaContext {
  res: NextApiResponse;
  req: NextApiRequest;
  auth: any;
}

// 型検証で API Route と見なされ default export 無しでエラーとなるためダミーを追加
export default function _unusedContextEndpoint(_req: NextApiRequest, res: NextApiResponse) {
  res.status(405).json({ error: 'Unused context module' });
}