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
  const result = await payload.find({
    collection: 'case-studies',
    limit: 100,
  })
  console.log(`Found ${result.docs.length} case studies in database:`)
  result.docs.forEach((doc: any) => {
    console.log(`- [${doc.slug}] ${doc.title}`)
  })
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
