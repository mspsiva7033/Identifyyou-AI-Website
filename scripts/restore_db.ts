/**
 * restore_db.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * PostgreSQL restore script for IdentifYou
 *
 * Usage:
 *   npm run db:restore -- backups/backup_2026-10-05_06-30-00.sql
 *   node --import tsx/esm scripts/restore_db.ts backups/backup_2026-10-05_06-30-00.sql
 *   node --import tsx/esm scripts/restore_db.ts        (auto-picks latest backup)
 *
 * What it does:
 *   1. Reads the specified .sql backup file (or latest if not specified)
 *   2. Connects to DATABASE_URI (from .env.local)
 *   3. Executes the SQL inside a transaction
 *   4. Reports success or rolls back on error
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

// ── Load .env.local ───────────────────────────────────────────────────────────
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

// ── Find latest backup ────────────────────────────────────────────────────────
function findLatestBackup(): string | null {
  if (!fs.existsSync(BACKUP_DIR)) return null
  const files = fs
    .readdirSync(BACKUP_DIR)
    .filter((f) => f.startsWith('backup_') && f.endsWith('.sql'))
    .sort()
    .reverse()
  return files.length > 0 ? path.join(BACKUP_DIR, files[0]) : null
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('IdentifYou - PostgreSQL Restore')
  console.log('================================')

  // Determine which file to restore
  const arg = process.argv[2]
  let backupFile: string

  if (arg) {
    backupFile = path.isAbsolute(arg) ? arg : path.resolve(ROOT, arg)
  } else {
    const latest = findLatestBackup()
    if (!latest) {
      console.error('No backup files found in ./backups/. Run npm run db:backup first.')
      process.exit(1)
    }
    backupFile = latest
    console.log(`No file specified. Using latest backup: ${path.basename(backupFile)}`)
  }

  if (!fs.existsSync(backupFile)) {
    console.error(`Backup file not found: ${backupFile}`)
    process.exit(1)
  }

  const sizeKB = (fs.statSync(backupFile).size / 1024).toFixed(1)
  console.log(`Reading: ${backupFile} (${sizeKB} KB)`)

  const sql = fs.readFileSync(backupFile, 'utf8')

  console.log(`Connecting to: ${DATABASE_URI.replace(/:([^:@]+)@/, ':****@')}`)

  const client = new Client({
    connectionString: DATABASE_URI,
    ssl: DATABASE_URI.includes('supabase') || DATABASE_URI.includes('neon')
      ? { rejectUnauthorized: false }
      : false,
  })

  await client.connect()
  console.log('Connected to PostgreSQL\n')

  try {
    console.log('Executing restore SQL...')
    await client.query(sql)
    console.log('\nRestore complete! All data has been applied successfully.')
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('\nRestore failed (transaction rolled back):', message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main().catch((err) => {
  console.error('\nRestore error:', err.message)
  process.exit(1)
})
