import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/category/1',
        permanent: false 
      },
    ]
  },
};

export default nextConfig;
