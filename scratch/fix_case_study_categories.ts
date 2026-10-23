import { getPayloadClient } from '../lib/payload'
import { getPoolConfig } from '../lib/db-config'
import pg from 'pg'

async function fixCaseStudyCategories() {
  console.log('--- Step 1: Fixing Case Study Categories ---')
  const pool = new pg.Pool(getPoolConfig())
  const client = await pool.connect()

  try {
    // 1. Check existing categories in case_study_categories
    const existing = await client.query(`
      SELECT id, name, slug, display_order 
      FROM case_study_categories 
      ORDER BY display_order ASC;
    `)
    console.log('Current case_study_categories:')
    console.table(existing.rows)

    // 2. Delete Manufacturing (54) and Supply Chain (55)
    const delRes = await client.query(`
      DELETE FROM case_study_categories 
      WHERE slug IN ('manufacturing', 'supply-chain') OR name IN ('Manufacturing', 'Supply Chain') 
      RETURNING id, name, slug;
    `)
    console.log('Deleted spurious categories from case_study_categories:', delRes.rows)

    // 3. Re-order remaining legitimate categories starting from 1
    const legitimateOrder = [
      { slug: 'vision-ai', order: 1 },
      { slug: 'industry-automation', order: 2 },
      { slug: 'ai-intelligent-business', order: 3 },
      { slug: 'ai-no-code', order: 4 },
      { slug: 'data-engineering', order: 5 },
      { slug: 'digital-engineering', order: 6 },
    ]

    for (const item of legitimateOrder) {
      await client.query(`
        UPDATE case_study_categories 
        SET display_order = $1 
        WHERE slug = $2;
      `, [item.order, item.slug])
    }

    // 4. Clean filterCategories in case_studies table (remove Manufacturing and Supply Chain from the json/subtables)
    // Check if table case_studies_filter_categories exists
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'case_studies_filter_categories';
    `)

    if (tableCheck.rows.length > 0) {
      const delFilterCats = await client.query(`
        DELETE FROM case_studies_filter_categories 
        WHERE category IN ('Manufacturing', 'Supply Chain')
        RETURNING id, category;
      `)
      console.log(`Removed ${delFilterCats.rowCount} 'Manufacturing' / 'Supply Chain' entries from case_studies_filter_categories`)
    }

    // 5. Query updated case_study_categories
    const updated = await client.query(`
      SELECT id, name, slug, display_order 
      FROM case_study_categories 
      ORDER BY display_order ASC;
    `)
    console.log('\nUpdated case_study_categories:')
    console.table(updated.rows)

  } finally {
    client.release()
    await pool.end()
  }

  console.log('--- Step 1 Completed Successfully ---')
  process.exit(0)
}

fixCaseStudyCategories().catch((e) => {
  console.error(e)
  process.exit(1)
})
