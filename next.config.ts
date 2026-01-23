import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/export': ['node_modules/@sparticuz/chromium/bin/*'],
    },
  },
};

export default nextConfig;
