import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow external images (Clearbit logos)
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24hr logo cache
  },
  // Aggressively tree-shake heavy UI packages
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'motion',
      'zod',
      'react-hook-form',
      'gsap',
      '@base-ui/react',
    ],
  },
  // Don't ship source maps to the browser in prod
  productionBrowserSourceMaps: false,
  // Enterprise production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Silence the "webpack config with Turbopack" warning
  turbopack: {},
  // Enterprise cache optimization headers
  async headers() {
    return [
      {
        source: '/logo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;