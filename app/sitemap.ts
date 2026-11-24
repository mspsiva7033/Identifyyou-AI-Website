import type { MetadataRoute } from 'next'
import { getCaseStudies, getBlogsAndNews } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://identifyyou.ai'
  const baseUrl = rawUrl.includes('localhost') || rawUrl.includes('127.0.0.1') ? 'https://identifyyou.ai' : rawUrl

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/deep-tech',
    '/deep-tech/deia-aix',
    '/deia-aix',
    '/deep-tech/ai-intelligent-business',
    '/deep-tech/ai-no-code',
    '/deep-tech/data-engineering',
    '/deep-tech/data-engineering/kmat-manufacturer-price-model',
    '/deep-tech/data-engineering/kmat-cost-model-app',
    '/deep-tech/digital-engineering',
    '/deep-tech/industry-automation',
    '/deep-tech/manufacturing',
    '/deep-tech/supply-chain',
    '/deep-tech/vision-ai',
    '/deep-tech/vision-ai/identifyou-visionai-intro',
    '/manufacturing',
    '/industrial-robots',
    '/thinking-factory',
    '/success-stories',
    '/blogs-and-news',
    '/blogs-and-news/kmat-cost-model-app',
    '/blogs-and-news/kmat-manufacturer-price-model',
    '/privacy-policy',
    '/terms-and-conditions',
  ]

  const items: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/privacy-policy' || route === '/terms-and-conditions' ? 0.5 : 0.8,
  }))

  try {
    const caseStudies = await getCaseStudies()
    for (const cs of caseStudies) {
      if (cs.slug) {
        items.push({
          url: `${baseUrl}/success-stories/${cs.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  } catch (e) {
    console.warn('Failed to load dynamic case studies into sitemap:', e)
  }

  try {
    const blogs = await getBlogsAndNews()
    for (const blog of blogs) {
      if (blog.slug) {
        items.push({
          url: `${baseUrl}/blogs-and-news/${blog.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }
  } catch (e) {
    console.warn('Failed to load dynamic blogs into sitemap:', e)
  }

  return items
}
