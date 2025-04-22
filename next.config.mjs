/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.optimization.splitChunks = {
            chunks: 'all',
            minSize: 20000,
            maxSize: 250000,
        };
        return config;
    }
};

export default nextConfig;
