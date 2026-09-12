import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // ТЗ п.7.2: отдаём WebP/AVIF, ленивая загрузка у next/image по умолчанию.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 480, 768, 1024, 1280, 1536, 1920, 2560],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
