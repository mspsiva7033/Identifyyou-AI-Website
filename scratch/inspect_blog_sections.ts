import { getPoolConfig } from '../lib/db-config'
import pg from 'pg'

async function check() {
  const pool = new pg.Pool(getPoolConfig())
  const client = await pool.connect()
  try {
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name LIKE 'blogs_and_news%'
    `)
    console.log('Tables:', tables.rows)

    for (const t of tables.rows) {
      const count = await client.query(`SELECT count(*) FROM "${t.table_name}"`)
      console.log(`Table ${t.table_name}: ${count.rows[0].count} rows`)
    }

    const sections = await client.query(`
      SELECT * FROM "blogs_and_news_sections" LIMIT 5
    `)
    console.log('Sections sample:', sections.rows)
  } finally {
    client.release()
    await pool.end()
  }
}

check().catch(console.error)
