/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: true
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"], // Support modern high-compression formats
  },
};

export default nextConfig;
