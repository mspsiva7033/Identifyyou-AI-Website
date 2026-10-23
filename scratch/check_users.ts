import { getPoolConfig } from '../lib/db-config'
import pg from 'pg'

async function checkAdminUsers() {
  const pool = new pg.Pool(getPoolConfig())
  const client = await pool.connect()
  try {
    const res = await client.query(`
      SELECT id, email, created_at 
      FROM "users";
    `)
    console.log('Admin users in database:')
    console.table(res.rows)
  } finally {
    client.release()
    await pool.end()
  }
}

checkAdminUsers().catch(console.error)
