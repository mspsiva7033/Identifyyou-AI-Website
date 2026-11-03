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
  const payload = await getPayload({ config })

  const catResult = await payload.find({
    collection: 'case-study-categories',
    limit: 100,
    sort: 'displayOrder',
  })

  console.log(`\n=== CASE STUDY CATEGORIES IN DATABASE (${catResult.docs.length}) ===`)
  catResult.docs.forEach((cat: any) => {
    console.log(`- [ID: ${cat.id}] [slug: ${cat.slug}] "${cat.name}"`)
  })

  const csResult = await payload.find({
    collection: 'case-studies',
    limit: 100,
    depth: 1,
    sort: 'displayOrder',
  })

  console.log(`\n=== ALL CASE STUDIES IN DATABASE (${csResult.docs.length}) ===`)
  csResult.docs.forEach((doc: any) => {
    const catName = typeof doc.category === 'object' && doc.category !== null ? doc.category.name : `ID: ${doc.category}`
    console.log(`- Category: [${catName}] | Status: [${doc.status}] | Slug: [${doc.slug}] | Title: "${doc.title}"`)
  })

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

