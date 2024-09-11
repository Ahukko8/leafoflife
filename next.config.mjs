/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'productimagestorage.blr1.digitaloceanspaces.com',
          port: '',
          pathname: '/products/**',
        },
      ],
      },
};





export default nextConfig;