import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/wn1nobtx5/**',
      },
    ],
    unoptimized: false,
  },
  // Ensure proper handling of environment variables
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
