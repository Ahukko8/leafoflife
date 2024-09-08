/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'your-vercel-app-name.vercel.app'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    },
};

export default nextConfig;