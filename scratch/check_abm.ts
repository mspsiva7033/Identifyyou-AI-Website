import { getPoolConfig } from '../lib/db-config'
import pg from 'pg'

async function checkAbm() {
  const pool = new pg.Pool(getPoolConfig())
  const client = await pool.connect()
  try {
    const res = await client.query(`
      SELECT id, title, slug, category_id, _status 
      FROM "case_studies" 
      WHERE slug LIKE '%abm%' OR title ILIKE '%precision abm%';
    `)
    console.log('Query result in case_studies table:')
    console.table(res.rows)
  } finally {
    client.release()
    await pool.end()
  }
}

checkAbm().catch(console.error)
