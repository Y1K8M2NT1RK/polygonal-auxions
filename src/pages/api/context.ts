import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

export interface YogaContext {
  res: NextApiResponse;
  req: NextApiRequest;
  auth: User | null;
}