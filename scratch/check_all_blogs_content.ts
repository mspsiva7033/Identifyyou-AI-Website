import { getPoolConfig } from '../lib/db-config'
import pg from 'pg'

async function check() {
  const pool = new pg.Pool(getPoolConfig())
  const client = await pool.connect()
  try {
    const res = await client.query(`
      SELECT b.id, b.slug, b.title, b.overview, b.status, 
             count(s.id) as section_count,
             coalesce(sum(length(s.content)), 0) as content_length
      FROM blogs_and_news b
      LEFT JOIN blogs_and_news_sections s ON s._parent_id = b.id
      GROUP BY b.id, b.slug, b.title, b.overview, b.status
      ORDER BY b.id
    `)
    console.table(res.rows)
  } finally {
    client.release()
    await pool.end()
  }
}

check().catch(console.error)
