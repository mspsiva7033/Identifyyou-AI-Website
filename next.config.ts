import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // power-bi-abm used to live at a nested URL; redirect to the canonical [slug] route
      {
        source: '/case-studies/data-engineering/power-bi-abm',
        destination: '/case-studies/power-bi-abm',
        permanent: true,
      },
    ]
  },
};

export default withPayload(nextConfig);

