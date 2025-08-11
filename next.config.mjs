/** @type {import('next').NextConfig} */
const nextConfig = {
    // MUI / icons の個別 import へ変換しツリーシェイク効率を高める
    modularizeImports: {
        '@mui/material': { transform: '@mui/material/{{member}}' },
        '@mui/icons-material': { transform: '@mui/icons-material/{{member}}' }
    },
    // セキュリティヘッダ追加
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                    // 追加セキュリティヘッダ
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                    { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" },
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
