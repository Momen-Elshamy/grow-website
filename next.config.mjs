/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'grow-wordpress-2a16da-72-61-111-171.traefik.me',
        pathname: '/wp-content/uploads/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],  // ← Converts PNG→WebP
  },
};

export default nextConfig;
