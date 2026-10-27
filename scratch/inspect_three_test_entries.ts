import { getPoolConfig } from '../lib/db-config'
import pg from 'pg'

async function inspect() {
  const p = new pg.Pool(getPoolConfig())
  const cs = await p.query(`SELECT id, title, slug, status FROM case_studies WHERE slug = 'test-case-study-topic'`)
  const blogs = await p.query(`SELECT id, title, slug, status, category FROM blogs_and_news WHERE slug IN ('test-blog-website-qa', 'test-news-website-qa')`)

  console.log('=== TEST CASE STUDY ===')
  console.table(cs.rows)
  console.log('\n=== TEST BLOGS & NEWS ===')
  console.table(blogs.rows)

  await p.end()
}

inspect().catch(console.error)
