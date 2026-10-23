import { getPoolConfig } from '../lib/db-config'
import pg from 'pg'

async function checkConstraints() {
  const pool = new pg.Pool(getPoolConfig())
  const client = await pool.connect()
  try {
    const res = await client.query(`
      SELECT column_name, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'blogs_and_news' AND column_name IN ('category', 'topics');
    `)
    console.table(res.rows)
  } finally {
    client.release()
    await pool.end()
  }
}

checkConstraints().catch(console.error)
