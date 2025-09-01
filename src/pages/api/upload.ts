import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { NextApiResponse, NextApiRequest } from 'next';
import crypto from 'crypto';

// 許可 MIME / 拡張子 / 最大サイズ (5MB)
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png']);
const ALLOWED_EXT  = new Set(['jpg', 'jpeg', 'png']);
const MAX_BYTES = 5 * 1024 * 1024;

// 簡易レート制限 (メモリ) - デプロイ環境での多インスタンスには Redis 等推奨
const rateMap = new Map<string, { count: number; ts: number }>();
const RATE_WINDOW_MS = 60_000; // 1分
const RATE_LIMIT = 20; // 1分あたり最大 20 リクエスト

function rateLimit(key: string) {
    const now = Date.now();
    const slot = rateMap.get(key);
    if (!slot || now - slot.ts > RATE_WINDOW_MS) {
        rateMap.set(key, { count: 1, ts: now });
        return true;
    }
    if (slot.count >= RATE_LIMIT) return false;
    slot.count++;
    return true;
}

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

        // レート制限 (IPベース)
        const ip = (request.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || request.socket.remoteAddress || 'unknown';
        if (!rateLimit(ip)) {
            response.status(429).json({ error: 'Too Many Requests' });
            return;
        }

        // handleUpload の onBeforeGenerateToken 内の allowedContentTypes に加え、事前検査
        const { filename, contentType, size } = (body as any) || {};
        if (contentType && !ALLOWED_MIME.has(contentType)) {
            response.status(400).json({ error: 'Unsupported content type' });
            return;
        }
        if (typeof size === 'number' && size > MAX_BYTES) {
            response.status(413).json({ error: 'File too large' });
            return;
        }
        if (filename) {
            const ext = filename.split('.').pop()?.toLowerCase() || '';
            if (!ALLOWED_EXT.has(ext)) {
                response.status(400).json({ error: 'Invalid file extension' });
                return;
            }
        }

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
                                    onBeforeGenerateToken: async () => ({
                                        allowedContentTypes: Array.from(ALLOWED_MIME),
                                        // オーバーライトよりも衝突防止優先
                                        allowOverwrite: false,
                                        addRandomSuffix: true,
                                        maximumSizeInBytes: MAX_BYTES,
                                        tokenPayload: crypto.randomBytes(8).toString('hex'),
                                    }),
            onUploadCompleted: async () => {
                console.log('画像アップロード完了');
            },
        });
        return response.status(200).json(jsonResponse);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
}