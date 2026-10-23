import { getPayloadClient } from '../lib/payload'
import { getPoolConfig } from '../lib/db-config'
import pg from 'pg'

async function publishAbm() {
  console.log('--- Publishing Precision ABM & Power BI ABM ---')
  const payload = await getPayloadClient()
  if (!payload) process.exit(1)

  // Update via payload with draft: false and _status: 'published'
  const abmRes = await payload.update({
    collection: 'case-studies' as any,
    where: { slug: { equals: 'precision-abm-snowflake-cortex' } },
    draft: false,
    data: {
      status: 'published',
      _status: 'published',
    },
  })
  console.log('Payload update precision-abm:', abmRes.docs.length, 'docs updated')

  const powerBiRes = await payload.update({
    collection: 'case-studies' as any,
    where: { slug: { equals: 'power-bi-abm' } },
    draft: false,
    data: {
      status: 'published',
      _status: 'published',
    },
  })
  console.log('Payload update power-bi-abm:', powerBiRes.docs.length, 'docs updated')

  // Also ensure directly in Postgres table that status and _status are 'published'
  const pool = new pg.Pool(getPoolConfig())
  const client = await pool.connect()
  try {
    await client.query(`
      UPDATE case_studies 
      SET status = 'published', _status = 'published'
      WHERE slug IN ('precision-abm-snowflake-cortex', 'power-bi-abm');
    `)

    await client.query(`
      UPDATE _case_studies_v 
      SET version_status = 'published', version__status = 'published'
      WHERE version_slug IN ('precision-abm-snowflake-cortex', 'power-bi-abm');
    `)

    const res = await client.query(`
      SELECT id, title, slug, status, _status 
      FROM case_studies 
      WHERE slug IN ('precision-abm-snowflake-cortex', 'power-bi-abm');
    `)
    console.table(res.rows)
  } finally {
    client.release()
    await pool.end()
  }

  // Now test getCaseStudies() to verify it appears in public query!
  const { getCaseStudies } = await import('../lib/payload')
  const allCs = await getCaseStudies()
  const foundAbm = allCs.find((c) => c.slug === 'precision-abm-snowflake-cortex')
  console.log('\nDoes getCaseStudies() return precision-abm-snowflake-cortex?', !!foundAbm ? 'YES (PASS)' : 'NO (FAIL)')
  if (foundAbm) {
    console.log('Returned ABM case study:', foundAbm.title, '| Category:', foundAbm.category)
  }

  process.exit(0)
}

publishAbm().catch(console.error)
