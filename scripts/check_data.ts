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
  const blogs = await payload.find({
    collection: 'blogs-and-news',
    limit: 50,
  })
  console.log(`=== Blogs and News (${blogs.docs.length}) ===`)
  blogs.docs.forEach((b: any) => {
    console.log(`- [${b.slug}] ${b.title} | Cat: ${b.category} | Status: ${b.status}`)
  })

  const users = await payload.find({
    collection: 'users',
    limit: 10,
  })
  console.log(`=== Admin Users (${users.docs.length}) ===`)
  users.docs.forEach((u: any) => {
    console.log(`- User: ${u.email} (id: ${u.id})`)
  })

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
