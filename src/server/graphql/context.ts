import type { NextApiRequest, NextApiResponse } from 'next';

export interface YogaContext {
  res: NextApiResponse;
  req: NextApiRequest;
  auth: any;
}
