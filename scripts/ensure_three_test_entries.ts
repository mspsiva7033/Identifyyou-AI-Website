import fs from 'fs'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
    if (match) {
      process.env[match[1].trim()] = match[2].trim()
    }
  })
}

import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  console.log('Connecting to Payload CMS to check/create 3 test entries...')
  const payload = await getPayload({ config })

  // 1. Case Study: "test case study - topic"
  const csSlug = 'test-case-study-topic'
  const existingCs = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: csSlug } },
  })

  let csCatId: string | number | undefined = undefined
  const categories = await payload.find({ collection: 'case-study-categories', limit: 10 })
  const indAutoCat = categories.docs.find((c: any) => c.slug === 'industry-automation' || c.name?.includes('Automation'))
  csCatId = indAutoCat ? indAutoCat.id : categories.docs[0]?.id

  if (existingCs.docs.length === 0) {
    await payload.create({
      collection: 'case-studies',
      data: {
        title: 'test case study - topic',
        slug: csSlug,
        category: csCatId,
        overview: 'Comprehensive test case study verifying end-to-end integration, category mappings, and technical content rendering for QA audit.',
        client: 'Enterprise Industrial Test Client',
        industry: 'Automotive & Industrial Automation',
        duration: '4 Months',
        results: '35% reduction in cycle time and 99.9% inspection accuracy.',
        illustration: '/images/vision_ai_hero_production_line.png',
        image: '/images/vision_ai_hero_production_line.png',
        tags: [{ tag: 'Automation' }, { tag: 'QA Testing' }, { tag: 'Edge AI' }],
        featured: true,
      } as any,
    })
    console.log(`✅ Created Case Study: "test case study - topic"`)
  } else {
    console.log(`✅ Case Study "test case study - topic" already exists.`)
  }

  // 2. Blog: "Test Blog - Website QA"
  const blogSlug = 'test-blog-website-qa'
  const existingBlog = await payload.find({
    collection: 'blogs-and-news',
    where: { slug: { equals: blogSlug } },
  })

  if (existingBlog.docs.length === 0) {
    await payload.create({
      collection: 'blogs-and-news',
      data: {
        title: 'Test Blog - Website QA',
        slug: blogSlug,
        category: 'Vision AI & Quality',
        status: 'published',
        publishedAt: new Date().toISOString(),
        readTime: '4 min read',
        excerpt: 'Standardized automated testing blog verifying CMS integration, markdown sections, and category filters for website QA.',
        overview: 'This test article confirms full-stack compatibility between Next.js frontend and Payload CMS backend architecture.',
        sections: [
          {
            title: '1. Quality Assurance Verification',
            content: 'End-to-end integration validation across database, API routes, and user interface rendering.',
          },
          {
            title: '2. High Performance Edge Rendering',
            content: 'Optimized server-side rendering combined with client-side reactive filters.',
          },
        ],
        takeaways: [
          { point: 'Complete dynamic CMS routing verified.' },
          { point: 'Zero hydration mismatch architecture.' },
        ],
        topics: 'QA · Testing · Payload CMS · Next.js',
      } as any,
    })
    console.log(`✅ Created Blog: "Test Blog - Website QA"`)
  } else {
    console.log(`✅ Blog "Test Blog - Website QA" already exists.`)
  }

  // 3. News: "Test News - Website QA"
  const newsSlug = 'test-news-website-qa'
  const existingNews = await payload.find({
    collection: 'blogs-and-news',
    where: { slug: { equals: newsSlug } },
  })

  if (existingNews.docs.length === 0) {
    await payload.create({
      collection: 'blogs-and-news',
      data: {
        title: 'Test News - Website QA',
        slug: newsSlug,
        category: 'Industry Insights',
        status: 'published',
        publishedAt: new Date().toISOString(),
        readTime: '3 min read',
        excerpt: 'Breaking industry update and QA milestone verification for the IdentifYou deep tech enterprise deployment.',
        overview: 'Official announcement detailing automated testing, edge intelligence deployments, and industrial customer milestones.',
        sections: [
          {
            title: 'Enterprise Milestone Achieved',
            content: 'IdentifYou successfully deploys next-generation industrial inspection architecture across global manufacturing partners.',
          },
          {
            title: 'Continuous Innovation in Edge Intelligence',
            content: 'Deep learning models on edge devices deliver sub-millisecond inference for high-speed manufacturing lines.',
          },
        ],
        takeaways: [
          { point: '100% verified news item in Payload CMS.' },
          { point: 'Synchronized with live frontend news listings.' },
        ],
        topics: 'Industry News · Milestone · Enterprise AI',
      } as any,
    })
    console.log(`✅ Created News: "Test News - Website QA"`)
  } else {
    console.log(`✅ News "Test News - Website QA" already exists.`)
  }

  console.log('\n--- Verification Summary of 3 Test Entries ---')
  console.log(`1. Case Study URL: http://localhost:3000/case-studies/${csSlug}`)
  console.log(`2. Blog URL:       http://localhost:3000/blogs-and-news/${blogSlug}`)
  console.log(`3. News URL:       http://localhost:3000/blogs-and-news/${newsSlug}`)
}

run().catch(console.error)
