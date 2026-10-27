import { getPoolConfig } from '../lib/db-config'
import pg from 'pg'

async function run() {
  const p = new pg.Pool(getPoolConfig())
  const r = await p.query(`
    SELECT e.enumlabel
    FROM pg_type t 
    JOIN pg_enum e ON t.oid = e.enumtypid
    WHERE t.typname = 'enum_leadership_team_category'
    ORDER BY e.enumsortorder;
  `)
  console.table(r.rows)
  await p.end()
}
run().catch(console.error)
