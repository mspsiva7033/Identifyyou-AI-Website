import { getPoolConfig } from '../lib/db-config'
import pg from 'pg'

async function clearBlogsCategoriesAndTopics() {
  console.log('--- Step 2: Clearing Blogs & News Categories and Topics ---')
  const pool = new pg.Pool(getPoolConfig())
  const client = await pool.connect()

  try {
    // 1. Alter table blogs_and_news to remove enum dependency and allow dynamic text
    console.log('Altering blogs_and_news table columns...')
    await client.query(`
      ALTER TABLE "blogs_and_news" ALTER COLUMN "category" DROP DEFAULT;
      ALTER TABLE "blogs_and_news" ALTER COLUMN "category" TYPE varchar(255) USING category::text;
      ALTER TABLE "blogs_and_news" ALTER COLUMN "category" DROP NOT NULL;
    `)

    await client.query(`
      ALTER TABLE "_blogs_and_news_v" ALTER COLUMN "version_category" DROP DEFAULT;
      ALTER TABLE "_blogs_and_news_v" ALTER COLUMN "version_category" TYPE varchar(255) USING version_category::text;
      ALTER TABLE "_blogs_and_news_v" ALTER COLUMN "version_category" DROP NOT NULL;
    `)
    console.log('Successfully altered columns to nullable varchar(255).')

    // 2. Clear categories and topics from all existing articles (preserving all articles, titles, slugs, images, content)
    console.log('Clearing category and topics values from existing articles...')
    const updateRes = await client.query(`
      UPDATE "blogs_and_news" 
      SET category = NULL, topics = NULL
      RETURNING id, title, slug, status;
    `)
    console.log(`Updated ${updateRes.rowCount} articles in blogs_and_news:`)
    console.table(updateRes.rows)

    await client.query(`
      UPDATE "_blogs_and_news_v" 
      SET version_category = NULL, version_topics = NULL;
    `)

    // 3. Verify that articles still exist and have null categories/topics
    const verifyRes = await client.query(`
      SELECT id, title, slug, category, topics, status 
      FROM "blogs_and_news";
    `)
    console.log('\nVerified blogs_and_news records (content preserved, categories/topics cleared):')
    console.table(verifyRes.rows)

  } finally {
    client.release()
    await pool.end()
  }

  console.log('--- Step 2 DB Migration Completed Successfully ---')
  process.exit(0)
}

clearBlogsCategoriesAndTopics().catch((e) => {
  console.error(e)
  process.exit(1)
})
