/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        if (process.env.VERCEL_BUILD) {
            // Vercel ビルド時の設定
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 20000,
                maxSize: 250000,
            };
        } 
        return config;
    },
};

export default nextConfig;
