import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      // power-bi-abm used to live at a nested URL; redirect to the canonical [slug] route
      {
        source: '/case-studies/data-engineering/power-bi-abm',
        destination: '/case-studies/power-bi-abm',
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
    ]
  },
};

export default withPayload(nextConfig);

