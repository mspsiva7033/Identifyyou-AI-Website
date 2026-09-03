import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://identifyou.in'

  const routes = [
    '',
    '/deep-tech',
    '/deep-tech/vision-ai',
    '/deep-tech/ai-intelligent-business',
    '/deep-tech/ai-no-code',
    '/deep-tech/industry-automation',
    '/deep-tech/data-engineering',
    '/deep-tech/digital-engineering',
    '/manufacturing',
    '/case-studies',
    '/case-studies/revolutionizing-inventory-optimization',
    '/case-studies/ai-powered-procurement',
    '/about',
    '/contact',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
