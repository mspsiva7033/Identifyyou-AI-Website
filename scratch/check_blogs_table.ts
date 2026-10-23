import { getPoolConfig } from '../lib/db-config'
import pg from 'pg'

async function checkBlogsTable() {
  const pool = new pg.Pool(getPoolConfig())
  const client = await pool.connect()
  try {
    const res = await client.query(`
      SELECT column_name, data_type, udt_name 
      FROM information_schema.columns 
      WHERE table_name = 'blogs_and_news';
    `)
    console.log('Columns in blogs_and_news:')
    console.table(res.rows)

    const articles = await client.query(`
      SELECT id, title, slug, category, topics, status 
      FROM blogs_and_news;
    `)
    console.log('\nExisting records in blogs_and_news:')
    console.table(articles.rows)
  } finally {
    client.release()
    await pool.end()
  }
}

checkBlogsTable().catch(console.error)
