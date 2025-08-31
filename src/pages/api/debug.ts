import { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';

type DebugResponse = {
  files?: string[]; // Query Engine ファイルのリスト
  error?: string;   // エラーが発生した場合のエラーメッセージ
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DebugResponse>
): void {
  // 環境変数 ENABLE_DEBUG_ROUTES が true の場合のみ利用可能 / 開発用途
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
    const prismaClientPath = join(process.cwd(), 'node_modules/.prisma/client');
    const files = readdirSync(prismaClientPath);
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}