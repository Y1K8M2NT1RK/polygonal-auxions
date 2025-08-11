/** @type {import('next').NextConfig} */
const nextConfig = {
    // MUI / icons の個別 import へ変換しツリーシェイク効率を高める
    modularizeImports: {
        '@mui/material': { transform: '@mui/material/{{member}}' },
        '@mui/icons-material': { transform: '@mui/icons-material/{{member}}' }
    },
    // セキュリティヘッダ追加
    async headers() {
        const dev = process.env.NODE_ENV !== 'production';
        // Next.js dev (React Refresh, inline runtime chunks) requires 'unsafe-inline' & 'unsafe-eval'.
        // 本番では inline script を極力排除したいが、まずは機能優先で nonce 化は後続タスクとする。
        const cspDev = [
            "default-src 'self'",
            "img-src 'self' data: https:",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "connect-src 'self' ws:",
            "font-src 'self' data:",
            "object-src 'none'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
        ].join('; ');
        const cspProd = [
            "default-src 'self'",
            "img-src 'self' data: https:",
            // 本番は inline / eval を禁止（Next.js の一部 inline が残る場合は nonce & hash 対応予定）
            "script-src 'self'",
            "style-src 'self' 'unsafe-inline'",
            "connect-src 'self'",
            "font-src 'self' data:",
            "object-src 'none'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
        ].join('; ');
        const csp = dev ? cspDev : cspProd;
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                    { key: 'Content-Security-Policy', value: csp },
                ],
            },
        ];
    },
    webpack: (config) => {
        // 既定の分割戦略に任せ、不要なカスタム splitChunks は外す（Next.js 標準最適化を活かす）
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imjua1uyggzxi4wk.public.blob.vercel-storage.com',
                port: '',
            }
        ]
    }
};

export default nextConfig;
