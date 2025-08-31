import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        response.status(405).end();
        return;
    }

    // 追加の簡易 CSRF 対策: SameSite+POST 前提。必要ならトークン検証を統合。
    const body = request.body as HandleUploadBody | undefined;
    if (!body) {
        response.status(400).json({ error: 'Missing body' });
        return;
    }

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async () => {
                return {
                    allowedContentTypes: ['image/jpeg', 'image/png'],
                    allowOverwrite: true,
                    addRandomSuffix: true,
                };
            },
            onUploadCompleted: async () => {
                console.log('画像アップロード完了');
            },
        });
        return response.status(200).json(jsonResponse);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
}