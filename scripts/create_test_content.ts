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
  console.log('Connecting to Payload CMS...')
  const payload = await getPayload({ config })

  // 1. Create or ensure a Media upload exists
  console.log('Ensuring sample media item...')
  let sampleMediaId: string | number | null = null

  // Check if media already exists
  const existingMedia = await payload.find({
    collection: 'media',
    limit: 5,
  })

  if (existingMedia.docs.length > 0) {
    sampleMediaId = existingMedia.docs[0].id
    console.log(`Using existing media: ${sampleMediaId}`)
  } else {
    // Pick an existing public image to create media
    const sourceImagePath = path.resolve(process.cwd(), 'public', 'images', 'deep-tech-chip.jpg')
    if (fs.existsSync(sourceImagePath)) {
      const fileBuffer = fs.readFileSync(sourceImagePath)
      const createdMedia = await payload.create({
        collection: 'media',
        data: {
          alt: 'Sample Deep Tech Chip',
        },
        file: {
          data: fileBuffer,
          mimetype: 'image/jpeg',
          name: 'sample-deep-tech-chip.jpg',
          size: fileBuffer.length,
        },
      })
      sampleMediaId = createdMedia.id
      console.log(`Created new media: ${sampleMediaId}`)
    }
  }

  // 2. Create Sample Case Study
  console.log('Creating sample Case Study...')
  const sampleCsSlug = 'ai-autonomous-inspection-cell-2026'
  const existingCs = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: sampleCsSlug } },
    limit: 1,
  })

  if (existingCs.docs.length === 0) {
    // Get a category
    const categories = await payload.find({ collection: 'case-study-categories', limit: 1 })
    const catId = categories.docs.length > 0 ? categories.docs[0].id : undefined

    await payload.create({
      collection: 'case-studies',
      data: {
        title: 'Autonomous Optical Inspection for High-Speed Electronics',
        slug: sampleCsSlug,
        category: catId,
        overview: 'End-to-end automated optical inspection system achieving 99.98% defect detection on multi-layer PCB assemblies with real-time edge processing.',
        client: 'Global Tier-1 Electronics Manufacturer',
        industry: 'Electronics & Semiconductor',
        duration: '3 Months',
        results: 'Zero escape defects across 1.2M production cycles.',
        illustration: '/images/vision_ai_hero_production_line.png',
        image: '/images/vision_ai_hero_production_line.png',
        tags: [{ tag: 'Vision AI' }, { tag: 'Edge Computing' }, { tag: 'Zero Defect' }],
        featured: true,
      } as any,
    })
    console.log(`✅ Sample Case Study created: [${sampleCsSlug}]`)
  } else {
    console.log(`Sample Case Study [${sampleCsSlug}] already exists.`)
  }

  // 3. Create Sample Blog Post
  console.log('Creating sample Blog Post...')
  const sampleBlogSlug = 'future-of-industrial-vision-ai'
  const existingBlog = await payload.find({
    collection: 'blogs-and-news',
    where: { slug: { equals: sampleBlogSlug } },
    limit: 1,
  })

  if (existingBlog.docs.length === 0) {
    await payload.create({
      collection: 'blogs-and-news',
      data: {
        title: 'The Future of Industrial Vision AI in 2026: From Defect Detection to Root Cause Autonomy',
        slug: sampleBlogSlug,
        category: 'Vision AI & Quality',
        readTime: '6 min read',
        excerpt: 'How modern computer vision algorithms and edge neural networks are transforming factory floors from simple visual sorting to autonomous process optimization.',
        featuredImage: sampleMediaId ? sampleMediaId : undefined,
        status: 'published',
        publishedAt: new Date().toISOString(),
        overview: 'Industrial vision inspection is experiencing a fundamental generational shift. Explore the key advancements shaping factory quality in 2026.',
        sections: [
          {
            title: 'From Passive Cameras to Active Edge Reasoning',
            content: 'Modern high-speed production environments require sub-millisecond defect classification. Edge AI gateways run quantized neural models directly alongside PLC sensors to stop bad parts before secondary processing.',
          },
          {
            title: 'Measurable ROI on the Factory Floor',
            content: 'Automated continuous vision monitoring delivers rapid payback by eliminating manual inspection fatigue and reducing false scrap rates by over 40%.',
          },
        ],
        takeaways: [
          { point: 'Sub-millisecond inference on edge cameras reduces scrap by up to 40%.' },
          { point: 'Closed-loop PLC integration enables automatic line stops upon pattern defect detection.' },
          { point: 'Unified factory dashboards provide real-time yield analytics across multiple production lines.' },
        ],
      } as any,
    })
    console.log(`✅ Sample Blog Post created: [${sampleBlogSlug}]`)
  } else {
    console.log(`Sample Blog Post [${sampleBlogSlug}] already exists.`)
  }

  // 4. Create Sample Leadership Team Member
  console.log('Creating sample Leadership Team member...')
  try {
    const existingMembers = await payload.find({
      collection: 'leadership-team' as any,
      limit: 5,
    })

    if (existingMembers.docs.length === 0) {
      await payload.create({
        collection: 'leadership-team' as any,
        data: {
          name: 'Sathesh (Ram) Seetharaman',
          role: 'CEO',
          category: 'Executive Leadership',
          experience: 'Ex Honeywell, JCI, TCS, Infosys',
          photo: sampleMediaId ? sampleMediaId : undefined,
          displayOrder: 1,
          status: 'published',
        },
      })
      await payload.create({
        collection: 'leadership-team' as any,
        data: {
          name: 'Muthukanaga Lakshmi',
          role: 'Senior Vice President, Technology & Operations',
          category: 'Technology & Operations',
          experience: 'Stanford Certified ML Professional',
          photo: sampleMediaId ? sampleMediaId : undefined,
          displayOrder: 2,
          status: 'published',
        },
      })
      console.log('✅ Sample Leadership Team members created in Payload CMS.')
    } else {
      console.log(`Leadership Team already has ${existingMembers.docs.length} members in Payload CMS.`)
    }
  } catch (err) {
    console.warn('Note on leadership-team collection:', err instanceof Error ? err.message : err)
  }

  console.log('\n🎉 Test content verification completed!')
  process.exit(0)
}

run().catch((err) => {
  console.error('Error creating test content:', err)
  process.exit(1)
})
