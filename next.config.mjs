/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "grow-wordpress-2a16da-72-61-111-171.traefik.me",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
