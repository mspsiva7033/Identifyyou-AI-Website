import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://identifyyou.ai'
  const baseUrl = rawUrl.includes('localhost') || rawUrl.includes('127.0.0.1') ? 'https://identifyyou.ai' : rawUrl

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
