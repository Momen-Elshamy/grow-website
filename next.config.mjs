import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "grow-wordpress-2a16da-72-61-111-171.traefik.me",
        pathname: "/wp-content/uploads/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    qualities: [75, 80, 85, 90],
  },
};

export default nextConfig;
