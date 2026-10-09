import path from 'path'
import fs from 'fs'

// Load .env or .env.local if DATABASE_URI is missing
if (!process.env.DATABASE_URI) {
  const envFiles = ['.env', '.env.local']
  for (const file of envFiles) {
    const envPath = path.resolve(process.cwd(), file)
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      envContent.split(/\r?\n/).forEach((line) => {
        const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
        if (match) {
          process.env[match[1].trim()] = match[2].trim()
        }
      })
      break
    }
  }
}

// Temporarily set NODE_ENV to development so Payload pushes database schema and tables
;(process.env as Record<string, string | undefined>).NODE_ENV = 'development'
process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true'

import { getPayload } from 'payload'
import config from '../payload.config'

async function initTables() {
  console.log('📦 Initializing PostgreSQL database tables for Payload CMS...')
  let attempts = 0
  const maxAttempts = 10

  while (attempts < maxAttempts) {
    attempts++
    try {
      await getPayload({ config })
      console.log('✅ PostgreSQL database tables created/verified successfully!')
      process.exit(0)
    } catch (err) {
      if (attempts < maxAttempts) {
        console.warn(`⏳ Waiting for PostgreSQL to be ready (attempt ${attempts}/${maxAttempts})...`)
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } else {
        console.error('❌ Failed to initialize database tables after max attempts:', err)
        process.exit(1)
      }
    }
  }
}

initTables()
