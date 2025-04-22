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
  try {
    // Prisma Client のディレクトリパスを取得
    const prismaClientPath = join(process.cwd(), 'node_modules/.prisma/client');
    // ディレクトリ内のファイルを取得
    const files = readdirSync(prismaClientPath);
    // ファイルリストをレスポンスとして返す
    res.status(200).json({ files });
  } catch (error) {
    // エラーが発生した場合はエラーメッセージを返す
    res.status(500).json({ error: (error as Error).message });
  }
}