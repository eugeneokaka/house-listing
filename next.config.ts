import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "robust-caribou-931.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
