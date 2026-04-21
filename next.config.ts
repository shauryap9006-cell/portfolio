import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  // Only apply basePath and assetPrefix in production (e.g., for GitHub Pages)
  basePath: isProd ? '/portfolio' : '',
  assetPrefix: isProd ? '/portfolio' : '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  env: {
    googleAnalyticsId: process.env.NODE_ENV === "production" ? process.env.GA_MEASUREMENT_ID : "",
  }
};

export default nextConfig;