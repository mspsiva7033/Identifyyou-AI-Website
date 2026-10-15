import fs from 'fs'
import path from 'path'

// Load .env.local
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

async function getInventory() {
  const payload = await getPayload({ config })

  console.log('--- INVENTORY AUDIT ---')

  // Case study categories
  const categories = await payload.find({
    collection: 'case-study-categories',
    limit: 100,
  })
  console.log(`\nCase Study Categories (${categories.totalDocs}):`)
  categories.docs.forEach((c: any) => console.log(`  - [ID: ${c.id}] ${c.name} (slug: ${c.slug})`))

  // Case studies
  const caseStudies = await payload.find({
    collection: 'case-studies',
    limit: 100,
    depth: 1,
  })
  console.log(`\nCase Studies (${caseStudies.totalDocs}):`)
  caseStudies.docs.forEach((cs: any) => {
    const catName = typeof cs.category === 'object' ? cs.category?.name : cs.category
    console.log(`  - [ID: ${cs.id}] "${cs.title}" (slug: ${cs.slug}, category: ${catName})`)
  })

  // Blogs and News
  const blogsAndNews = await payload.find({
    collection: 'blogs-and-news',
    limit: 100,
  })
  console.log(`\nBlogs and News (${blogsAndNews.totalDocs}):`)
  blogsAndNews.docs.forEach((b: any) => {
    console.log(`  - [ID: ${b.id}] "${b.title}" (slug: ${b.slug}, category: ${b.category}, status: ${b.status})`)
  })

  // Manufacturing Solutions
  const mfg = await payload.find({
    collection: 'manufacturing-solutions',
    limit: 100,
  })
  console.log(`\nManufacturing Solutions (${mfg.totalDocs}):`)
  mfg.docs.forEach((m: any) => console.log(`  - [ID: ${m.id}] ${m.title} (slug: ${m.slug})`))

  // Deep Tech Capabilities
  const deepTech = await payload.find({
    collection: 'deep-tech-capabilities',
    limit: 100,
  })
  console.log(`\nDeep Tech Capabilities (${deepTech.totalDocs}):`)
  deepTech.docs.forEach((d: any) => console.log(`  - [ID: ${d.id}] ${d.title} (slug: ${d.slug})`))

  // Leadership Team
  const team = await payload.find({
    collection: 'leadership-team',
    limit: 100,
  })
  console.log(`\nLeadership Team (${team.totalDocs}):`)
  team.docs.forEach((t: any) => console.log(`  - [ID: ${t.id}] ${t.name} - ${t.role} (${t.category})`))

  // Users
  const users = await payload.find({
    collection: 'users',
    limit: 10,
  })
  console.log(`\nAdmin Users (${users.totalDocs}):`)
  users.docs.forEach((u: any) => console.log(`  - [ID: ${u.id}] ${u.email}`))

  process.exit(0)
}

getInventory().catch(console.error)
