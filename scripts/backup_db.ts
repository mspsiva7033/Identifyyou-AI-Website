/**
 * backup_db.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * PostgreSQL backup script for IdentifYou (Supabase → local .sql dump)
 *
 * Usage:
 *   npm run db:backup
 *   node --import tsx/esm scripts/backup_db.ts --run
 *
 * What it does:
 *   1. Connects to DATABASE_URI (from .env.local)
 *   2. Exports all public-schema tables as SQL INSERT statements
 *   3. Saves to backups/backup_YYYY-MM-DD_HH-MM-SS.sql
 *   4. Keeps only the last N backups (configurable via BACKUP_KEEP)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import pg from 'pg'

const { Client } = pg

// ── Resolve project root ──────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

// ── Load .env.local manually (same pattern as payload.config.ts) ──────────────
function loadEnv() {
  const envPath = path.resolve(ROOT, '.env.local')
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8')
    content.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
      if (match) {
        const key = match[1].trim()
        const val = match[2].trim()
        if (!process.env[key]) process.env[key] = val
      }
    })
  }
}
loadEnv()

// ── Config ────────────────────────────────────────────────────────────────────
const DATABASE_URI =
  process.env.DATABASE_URI ||
  'postgresql://postgres:password@localhost:5432/identifyyou'

const BACKUP_DIR = path.resolve(ROOT, 'backups')
const BACKUP_KEEP = parseInt(process.env.BACKUP_KEEP || '10', 10) // keep last N backups

// ── Helpers ───────────────────────────────────────────────────────────────────
function timestamp(): string {
  return new Date()
    .toISOString()
    .replace(/T/, '_')
    .replace(/:/g, '-')
    .replace(/\..+/, '')
}

function escapeLiteral(val: unknown): string {
  if (val === null || val === undefined) return 'NULL'
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE'
  if (typeof val === 'number') return String(val)
  if (val instanceof Date) return `'${val.toISOString()}'`
  if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`
  return `'${String(val).replace(/'/g, "''")}'`
}

async function getTables(client: pg.Client): Promise<string[]> {
  const res = await client.query<{ table_name: string }>(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `)
  return res.rows.map((r) => r.table_name)
}

async function getColumns(client: pg.Client, table: string): Promise<string[]> {
  const res = await client.query<{ column_name: string }>(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = $1
    ORDER BY ordinal_position;
  `, [table])
  return res.rows.map((r) => r.column_name)
}

async function dumpTable(client: pg.Client, table: string): Promise<string> {
  const columns = await getColumns(client, table)
  const colList = columns.map((c) => `"${c}"`).join(', ')

  const rows = await client.query(`SELECT * FROM "${table}";`)

  if (rows.rowCount === 0) {
    return `-- Table "${table}": 0 rows\n`
  }

  const inserts: string[] = rows.rows.map((row) => {
    const values = columns.map((col) => escapeLiteral(row[col])).join(', ')
    return `INSERT INTO "${table}" (${colList}) VALUES (${values}) ON CONFLICT DO NOTHING;`
  })

  return [
    `-- ── Table: ${table} (${rows.rowCount} rows) ──`,
    ...inserts,
    '',
  ].join('\n')
}

// ── Prune old backups ─────────────────────────────────────────────────────────
function pruneOldBackups() {
  if (!fs.existsSync(BACKUP_DIR)) return
  const files = fs
    .readdirSync(BACKUP_DIR)
    .filter((f) => f.startsWith('backup_') && f.endsWith('.sql'))
    .sort()
    .reverse()

  const toDelete = files.slice(BACKUP_KEEP)
  toDelete.forEach((f) => {
    fs.unlinkSync(path.join(BACKUP_DIR, f))
    console.log(`Removed old backup: ${f}`)
  })
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('IdentifYou - PostgreSQL Backup')
  console.log('==============================')
  console.log(`Connecting to: ${DATABASE_URI.replace(/:([^:@]+)@/, ':****@')}`)

  const client = new Client({
    connectionString: DATABASE_URI,
    ssl: DATABASE_URI.includes('supabase') || DATABASE_URI.includes('neon')
      ? { rejectUnauthorized: false }
      : false,
  })

  await client.connect()
  console.log('Connected to PostgreSQL\n')

  const tables = await getTables(client)
  console.log(`Found ${tables.length} tables: ${tables.join(', ')}\n`)

  // Build SQL dump
  const header = [
    '-- ======================================================',
    `-- IdentifYou PostgreSQL Backup`,
    `-- Generated: ${new Date().toISOString()}`,
    `-- Tables: ${tables.join(', ')}`,
    '-- ======================================================',
    '',
    'BEGIN;',
    '',
  ].join('\n')

  const sections: string[] = []
  for (const table of tables) {
    process.stdout.write(`  Dumping "${table}"...`)
    const section = await dumpTable(client, table)
    sections.push(section)
    const rowMatch = section.match(/(\d+) rows/)
    console.log(rowMatch ? ` ${rowMatch[1]} rows OK` : ' 0 rows OK')
  }

  const footer = ['\nCOMMIT;', '', `-- End of backup -- ${new Date().toISOString()}`, ''].join('\n')

  const sql = header + sections.join('\n') + footer

  // Save to file
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true })
  const filename = `backup_${timestamp()}.sql`
  const filePath = path.join(BACKUP_DIR, filename)
  fs.writeFileSync(filePath, sql, 'utf8')

  const sizeKB = (fs.statSync(filePath).size / 1024).toFixed(1)
  console.log(`\nBackup saved: backups/${filename} (${sizeKB} KB)`)

  // Prune old backups
  pruneOldBackups()

  await client.end()
  console.log('\nBackup complete!')
}

main().catch((err) => {
  console.error('\nBackup failed:', err.message)
  process.exit(1)
})
