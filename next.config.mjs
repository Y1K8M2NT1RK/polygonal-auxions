/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.optimization.splitChunks = {
            chunks: 'all',
            minSize: 20000,
            maxSize: 250000,
        };
        return config;
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/graphql`
            : 'http://localhost:3000/api/graphql',
    }
};

export default nextConfig;
