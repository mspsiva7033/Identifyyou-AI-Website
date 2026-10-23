import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https: wss:; frame-ancestors 'self'; object-src 'none'; base-uri 'self';",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // power-bi-abm used to live at a nested URL; redirect to the canonical [slug] route
      {
        source: '/case-studies/data-engineering/power-bi-abm',
        destination: '/case-studies/power-bi-abm',
        permanent: true,
      },
      // Shorten URL over 115 characters to clean canonical destination
      {
        source: '/case-studies/overcoming-data-access-challenges-in-a-multi-business-environment-for-streamlined-decision-making',
        destination: '/case-studies/overcoming-data-access-challenges',
        permanent: true,
      },
      {
        source: '/blogs-and-news/overcoming-data-access-challenges-in-a-multi-business-environment-for-streamlined-decision-making',
        destination: '/blogs-and-news/overcoming-data-access-challenges',
        permanent: true,
      },
      // Redirect uppercase image URL to lowercase canonical URL
      {
        source: '/images/identifYou_logo.png',
        destination: '/images/identifyou-logo.png',
        permanent: true,
      },
      // Redirect long image filename to concise canonical URL
      {
        source: '/images/case-studies/overcoming-data-access-challenges-in-a-multi-business-environment-for-streamlined-decision-making.png',
        destination: '/images/case-studies/overcoming-data-access-challenges.png',
        permanent: true,
      },
      // Redirect duplicate / placeholder routes to canonical versions
      {
        source: '/deep-tech/default',
        destination: '/deep-tech',
        permanent: true,
      },
      {
        source: '/blogs-and-news/kmat-cost-model-app',
        destination: '/deep-tech/data-engineering/kmat-cost-model-app',
        permanent: true,
      },
      {
        source: '/blogs-and-news/kmat-manufacturer-price-model',
        destination: '/deep-tech/data-engineering/kmat-manufacturer-price-model',
        permanent: true,
      },
    ]
  },
};

export default withPayload(nextConfig);

