import { execSync } from 'child_process';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // デバッグ用途: 必要時のみ ENABLE_DEBUG_ROUTES=true で有効化
  if (process.env.ENABLE_DEBUG_ROUTES !== 'true') {
    res.status(404).end();
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end();
    return;
  }

  try {
    const version = execSync('openssl version').toString().trim();
    res.status(200).json({ opensslVersion: version });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get OpenSSL version' });
  }
}