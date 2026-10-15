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

const ALL_5_MEMBERS = [
  {
    name: 'Sathesh (Ram) Seetharaman',
    role: 'CEO',
    category: 'Executive Leadership',
    experience: 'Ex Honeywell, JCI, TCS, Infosys',
    displayOrder: 1,
    status: 'published',
  },
  {
    name: 'Muthukanaga Lakshmi',
    role: 'Senior Vice President, Technology & Operations',
    category: 'Technology & Operations',
    experience: 'Stanford Certified ML Professional',
    displayOrder: 2,
    status: 'published',
  },
  {
    name: 'Shenbagaraman Gomathinayagam',
    role: 'Director, Data & AI Engineering',
    category: 'Data & AI Engineering',
    experience: 'Ex Honeywell, Resideo',
    displayOrder: 3,
    status: 'published',
  },
  {
    name: 'Srivisahanathan Karthikayan',
    role: 'Director, AI & Digital Engineering',
    category: 'Digital Engineering',
    experience: 'Ex Honeywell, Oracle',
    displayOrder: 4,
    status: 'published',
  },
  {
    name: 'Venkadesan Balasubramanian',
    role: 'Director, Industrial Automation & IIOT',
    category: 'Industrial Automation & IIOT',
    experience: 'Ex Ramco, LML',
    displayOrder: 5,
    status: 'published',
  },
]

async function seed() {
  console.log('Connecting to Payload...')
  const payload = await getPayload({ config })

  for (const m of ALL_5_MEMBERS) {
    const existing = await payload.find({
      collection: 'leadership-team' as any,
      where: {
        name: { equals: m.name },
      },
    })

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'leadership-team' as any,
        data: m as any,
      })
      console.log(`Created member: ${m.name}`)
    } else {
      console.log(`Already exists: ${m.name}`)
    }
  }

  const finalCheck = await payload.find({
    collection: 'leadership-team' as any,
    sort: 'displayOrder',
  })
  console.log(`Total leadership members in CMS: ${finalCheck.docs.length}`)
  for (const d of finalCheck.docs as any[]) {
    console.log(`  - [Order ${d.displayOrder}] ${d.name} (${d.role}) [${d.category}]`)
  }
}

seed().catch(console.error)
