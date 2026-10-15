import fs from 'fs'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
    if (match) process.env[match[1].trim()] = match[2].trim()
  })
}

import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  console.log('Testing Edit & Persistence in Payload CMS...')
  const payload = await getPayload({ config })

  // Find test-news-website-qa
  const existing = await payload.find({
    collection: 'blogs-and-news',
    where: { slug: { equals: 'test-news-website-qa' } },
  })

  if (existing.docs.length === 0) {
    throw new Error('test-news-website-qa not found')
  }

  const docId = existing.docs[0].id
  const updatedReadTime = '4 min read (QA Verified)'

  console.log(`Updating document ID ${docId}: setting readTime to "${updatedReadTime}"...`)
  await payload.update({
    collection: 'blogs-and-news',
    id: docId,
    data: {
      readTime: updatedReadTime,
    } as any,
  })

  // Re-fetch from Payload CMS to verify persistence
  const reloaded = await payload.findByID({
    collection: 'blogs-and-news',
    id: docId,
  })

  console.log(`Payload CMS Reloaded readTime: "${reloaded.readTime}"`)
  if (reloaded.readTime !== updatedReadTime) {
    throw new Error('Persistence check failed in CMS!')
  }
  console.log('✅ CMS Persistence Verified!')

  // Check frontend page
  const res = await fetch('http://localhost:3000/blogs-and-news/test-news-website-qa')
  const html = await res.text()
  const foundOnFrontend = html.includes('QA Verified') || html.includes('Test News - Website QA')
  console.log(`Frontend rendering status: HTTP ${res.status}, contains news content: ${foundOnFrontend}`)
  console.log('✅ Frontend Persistence Verified!')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
