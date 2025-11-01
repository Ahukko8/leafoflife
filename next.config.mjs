/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'leafoflife.nyc3.digitaloceanspaces.com',
          port: '',
          pathname: '/products/**',
        },
      ],
      },
};





export default nextConfig;