import pg from 'pg'
import path from 'path'
import fs from 'fs'

for (const envFile of ['.env', '.env.local']) {
  const envPath = path.resolve(process.cwd(), envFile)
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
      if (match && !process.env[match[1].trim()]) {
        process.env[match[1].trim()] = match[2].trim()
      }
    })
    break
  }
}

import { getDatabaseConfig } from '../lib/db-config'

async function clearAllUsers() {
  console.log('🗑️  Clearing all users from database...')
  const dbConfig = getDatabaseConfig()
  const client = new pg.Client({
    connectionString: dbConfig.connectionString,
    ssl: dbConfig.ssl,
  })

  await client.connect()

  // Clear related tables first, then users
  try {
    await client.query(`DELETE FROM "users_roles";`)
  } catch {}

  try {
    await client.query(`DELETE FROM "users_sessions";`)
  } catch {}

  const deleteRes = await client.query(`DELETE FROM "users";`)
  console.log(`✅ Removed ${deleteRes.rowCount} user(s) from "users" table.`)

  const countRes = await client.query(`SELECT count(*) FROM "users";`)
  console.log(`📊 Current user count in database: ${countRes.rows[0].count}`)

  await client.end()
  console.log('\n🎉 All users cleared successfully!')
  console.log('👉 You can now open http://localhost:3000/admin in your browser to create the first Super Admin from scratch.')
}

clearAllUsers().catch((err) => {
  console.error('❌ Error clearing users:', err)
  process.exit(1)
})
