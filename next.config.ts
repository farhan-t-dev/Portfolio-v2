import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.scrum.org',
      },
      {
        protocol: 'https',
        hostname: 'mermaid.ink',
      },
    ],
  },
};

export default nextConfig;
