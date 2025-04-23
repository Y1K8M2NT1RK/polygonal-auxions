import { execSync } from 'child_process';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const version = execSync('openssl version').toString().trim();
    res.status(200).json({ opensslVersion: version });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get OpenSSL version', details: error });
  }
}