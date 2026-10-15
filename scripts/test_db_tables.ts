import fs from 'fs'
import path from 'path'
import pg from 'pg'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
    if (match) process.env[match[1].trim()] = match[2].trim()
  })
}

async function check() {
  const client = new pg.Client({ connectionString: process.env.DATABASE_URI })
  await client.connect()
  const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name")
  console.log('Database tables:', res.rows.map((r) => r.table_name))
  await client.end()
}

check().catch(console.error)
