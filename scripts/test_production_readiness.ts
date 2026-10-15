import {
  resolveDatabaseSSL,
  maskConnectionString,
  getDatabaseConfig,
} from '../lib/db-config'
import fs from 'fs'
import path from 'path'
import { migrations } from '../migrations'

let passedTests = 0
let failedTests = 0

function test(description: string, fn: () => void) {
  try {
    fn()
    console.log(`  ✓ ${description}`)
    passedTests++
  } catch (err: unknown) {
    console.error(`  ✗ ${description}`)
    console.error(`    Error: ${err instanceof Error ? err.message : err}`)
    failedTests++
  }
}

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message)
}

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message} (Expected: ${JSON.stringify(expected)}, Actual: ${JSON.stringify(actual)})`)
  }
}

console.log('\n======================================================')
console.log('🧪 Production Readiness & Verification Test Suite')
console.log('======================================================\n')

// ── 1. Database SSL Resolution Tests ──────────────────────────────────────────
console.log('--- 1. Database SSL Contract & Heuristics ---')

test('DATABASE_SSL="false" disables SSL', () => {
  assertEqual(resolveDatabaseSSL('false', 'remote.host.com'), false, 'Should be false')
})

test('DATABASE_SSL="disable" disables SSL', () => {
  assertEqual(resolveDatabaseSSL('disable', 'remote.host.com'), false, 'Should be false')
})

test('DATABASE_SSL="true" enables strict certificate verification', () => {
  assertEqual(resolveDatabaseSSL('true', 'localhost'), { rejectUnauthorized: true }, 'Should be strict SSL')
})

test('DATABASE_SSL="require" enables strict certificate verification', () => {
  assertEqual(resolveDatabaseSSL('require', 'localhost'), { rejectUnauthorized: true }, 'Should be strict SSL')
})

test('DATABASE_SSL="allow-unauthorized" allows self-signed certificates', () => {
  assertEqual(resolveDatabaseSSL('allow-unauthorized', 'localhost'), { rejectUnauthorized: false }, 'Should allow unauthorized')
})

test('Invalid DATABASE_SSL value throws an actionable error', () => {
  let threw = false
  try {
    resolveDatabaseSSL('invalid_ssl_option')
  } catch (e: any) {
    threw = true
    assert(e.message.includes('Invalid DATABASE_SSL configuration'), 'Should explain accepted values')
  }
  assert(threw, 'Should throw for invalid SSL setting')
})

test('Internal hosts (localhost, 127.0.0.1, postgres, identifyyou_db) default to SSL disabled', () => {
  assertEqual(resolveDatabaseSSL(undefined, 'localhost'), false, 'localhost should be SSL disabled')
  assertEqual(resolveDatabaseSSL(undefined, '127.0.0.1'), false, '127.0.0.1 should be SSL disabled')
  assertEqual(resolveDatabaseSSL(undefined, 'postgres'), false, 'Docker service postgres should be SSL disabled')
  assertEqual(resolveDatabaseSSL(undefined, 'identifyyou_db'), false, 'Docker container identifyyou_db should be SSL disabled')
})

test('Cloud hosted services (supabase.co, neon.tech) default to verified SSL', () => {
  assertEqual(
    resolveDatabaseSSL(undefined, 'db.xyz.supabase.co'),
    { rejectUnauthorized: true },
    'Supabase should default to strict SSL'
  )
  assertEqual(
    resolveDatabaseSSL(undefined, 'ep-cool-db.us-east-2.neon.tech'),
    { rejectUnauthorized: true },
    'Neon should default to strict SSL'
  )
})

// ── 2. Connection String Parsing & URL Handling ──────────────────────────────
console.log('\n--- 2. Database URL Parsing & Validation ---')

test('maskConnectionString masks passwords completely', () => {
  const masked = maskConnectionString('postgresql://user:SecretPassword123#@localhost:5432/identifyyou')
  assert(!masked.includes('SecretPassword123#'), 'Password must not appear in masked string')
  assert(masked.includes('****'), 'Password must be replaced by ****')
})

test('Rejects invalid host "base"', () => {
  const originalUri = process.env.DATABASE_URI
  process.env.DATABASE_URI = 'postgres://base'
  let threw = false
  try {
    getDatabaseConfig()
  } catch (e: any) {
    threw = true
    assert(e.message.includes('Invalid database host "base"'), 'Must report invalid host base')
  } finally {
    process.env.DATABASE_URI = originalUri
  }
  assert(threw, 'Must throw error on postgres://base')
})

test('Handles URL-encoded passwords with special characters (#, @, %)', () => {
  const originalUri = process.env.DATABASE_URI
  // %23 = #, %40 = @
  process.env.DATABASE_URI = 'postgresql://identifyyou:P%23ss%40word@127.0.0.1:5432/identifyyou'
  try {
    const config = getDatabaseConfig()
    assertEqual(config.host, '127.0.0.1', 'Host parsed correctly')
    assertEqual(config.port, 5432, 'Port parsed correctly')
    assertEqual(config.database, 'identifyyou', 'Database parsed correctly')
    assert(config.maskedConnectionString.includes('****'), 'Password masked')
  } finally {
    process.env.DATABASE_URI = originalUri
  }
})

// ── 3. Migration Workflow & Schema Integrity ──────────────────────────────────
console.log('\n--- 3. Migration Workflow & Files Inspection ---')

test('Migrations folder and index.ts exist', () => {
  const migrationsDir = path.resolve(process.cwd(), 'migrations')
  assert(fs.existsSync(migrationsDir), 'migrations/ directory must exist')
  assert(fs.existsSync(path.join(migrationsDir, 'index.ts')), 'migrations/index.ts must exist')
})

test('migrations array exports at least one migration with up/down functions', () => {
  assert(Array.isArray(migrations), 'migrations must be an array')
  assert(migrations.length > 0, 'migrations array must not be empty')
  const initial = migrations[0]
  assert(typeof initial.up === 'function', 'Initial migration must export up() function')
  assert(typeof initial.down === 'function', 'Initial migration must export down() function')
  assert(typeof initial.name === 'string' && initial.name.length > 0, 'Migration must have a name')
})

test('Initial migration SQL includes the "users" table creation', () => {
  const migrationFiles = fs.readdirSync(path.resolve(process.cwd(), 'migrations'))
  const tsMigration = migrationFiles.find((f) => f.endsWith('.ts') && f !== 'index.ts')
  assert(Boolean(tsMigration), 'Found TypeScript migration file')
  const content = fs.readFileSync(path.resolve(process.cwd(), 'migrations', tsMigration!), 'utf8')
  assert(content.includes('CREATE TABLE "users"'), 'Migration must create "users" table')
  assert(content.includes('CREATE TABLE "media"'), 'Migration must create "media" table')
  assert(content.includes('CREATE TABLE "case_studies"'), 'Migration must create "case_studies" table')
})

// ── 4. Admin Panel & Payload Config Verification ──────────────────────────────
console.log('\n--- 4. Payload Admin & Component Generation ---')

test('Payload admin importMap.js exists and is generated', () => {
  const importMapPath = path.resolve(process.cwd(), 'app/(payload)/admin/importMap.js')
  assert(fs.existsSync(importMapPath), 'importMap.js must exist')
  const content = fs.readFileSync(importMapPath, 'utf8')
  assert(content.includes('export const importMap'), 'importMap.js must export importMap')
})

test('Health check endpoints exist and are properly structured', () => {
  assert(fs.existsSync(path.resolve(process.cwd(), 'app/api/health/live/route.ts')), 'Live route exists')
  assert(fs.existsSync(path.resolve(process.cwd(), 'app/api/health/ready/route.ts')), 'Ready route exists')
  assert(fs.existsSync(path.resolve(process.cwd(), 'app/api/health/route.ts')), 'Main health route exists')
})

// ── 5. Native In-App Analytics Verification ─────────────────────────────
console.log('\n--- 5. Native In-App PostgreSQL Analytics ---')

test('analytics_events migration exists and creates table with indexes', () => {
  const analyticsMigration = path.resolve(process.cwd(), 'migrations/20261009_101000_analytics_events.ts')
  assert(fs.existsSync(analyticsMigration), 'analytics_events migration file must exist')
  const content = fs.readFileSync(analyticsMigration, 'utf8')
  assert(content.includes('CREATE TABLE IF NOT EXISTS "analytics_events"'), 'Must create analytics_events table')
  assert(content.includes('CREATE INDEX IF NOT EXISTS "idx_analytics_created_at"'), 'Must index created_at')
  assert(content.includes('CREATE INDEX IF NOT EXISTS "idx_analytics_visitor_id"'), 'Must index visitor_id')
})

test('migrations array exports analytics_events migration', () => {
  const found = migrations.find((m) => m.name === '20261009_101000_analytics_events')
  assert(Boolean(found), 'migrations array must register 20261009_101000_analytics_events')
  assert(typeof found!.up === 'function', 'Analytics migration must have up function')
})

test('parseUserAgent correctly parses mobile, tablet, and desktop browsers', async () => {
  const { parseUserAgent } = await import('../lib/analytics-utils')
  const mobile = parseUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1')
  assertEqual(mobile.deviceCategory, 'mobile', 'iPhone is mobile')
  assertEqual(mobile.os, 'iOS', 'OS is iOS')
  assertEqual(mobile.browser, 'Safari', 'Browser is Safari')

  const desktop = parseUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36')
  assertEqual(desktop.deviceCategory, 'desktop', 'Windows PC is desktop')
  assertEqual(desktop.os, 'Windows', 'OS is Windows')
  assertEqual(desktop.browser, 'Chrome', 'Browser is Chrome')
})

test('generateVisitorHash generates anonymous GDPR-compliant hash without raw IP', async () => {
  const { generateVisitorHash } = await import('../lib/analytics-utils')
  const hash1 = generateVisitorHash('192.168.1.50', 'TestUserAgent')
  const hash2 = generateVisitorHash('192.168.1.50', 'TestUserAgent')
  assertEqual(hash1, hash2, 'Identical inputs produce identical hash')
  assert(!hash1.includes('192.168.1.50'), 'Hash must not leak raw IP')
  assertEqual(hash1.length, 32, 'Hash length must be 32 chars')
})

test('In-app tracking and admin analytics endpoints exist', () => {
  assert(fs.existsSync(path.resolve(process.cwd(), 'app/api/analytics/track/route.ts')), 'Track endpoint exists')
  assert(fs.existsSync(path.resolve(process.cwd(), 'app/api/admin/analytics/route.ts')), 'Admin analytics endpoint exists')
  assert(fs.existsSync(path.resolve(process.cwd(), 'lib/db-pool.ts')), 'Database pool singleton exists')
})

// ── 6. Microsoft Graph API Email Integration ──────────────────────────────────
console.log('\n--- 6. Microsoft Graph API Contact Notifications ---')

test('lib/email.ts exists and exports required methods', async () => {
  const emailModulePath = path.resolve(process.cwd(), 'lib/email.ts')
  assert(fs.existsSync(emailModulePath), 'lib/email.ts must exist')
  const emailModule = await import('../lib/email')
  assert(typeof emailModule.sendContactNotification === 'function', 'sendContactNotification exported')
  assert(typeof emailModule.sendEmailViaMicrosoftGraph === 'function', 'sendEmailViaMicrosoftGraph exported')
  assert(typeof emailModule.getMicrosoftGraphConfig === 'function', 'getMicrosoftGraphConfig exported')
})

test('getMicrosoftGraphConfig parses configuration and comma-separated recipients correctly', async () => {
  const { getMicrosoftGraphConfig } = await import('../lib/email')

  const originalEnv = { ...process.env }
  try {
    delete process.env.MS_GRAPH_TENANT_ID
    delete process.env.AZURE_TENANT_ID
    delete process.env.MS_GRAPH_CLIENT_ID
    delete process.env.AZURE_CLIENT_ID
    delete process.env.MS_GRAPH_CLIENT_SECRET
    delete process.env.AZURE_CLIENT_SECRET
    delete process.env.MS_GRAPH_SENDER_EMAIL
    delete process.env.CONTACT_EMAIL_TO

    assertEqual(getMicrosoftGraphConfig(), null, 'Should return null when env is unset')

    process.env.MS_GRAPH_TENANT_ID = 'test-tenant-123'
    process.env.MS_GRAPH_CLIENT_ID = 'test-client-456'
    process.env.MS_GRAPH_CLIENT_SECRET = 'test-secret-789'
    process.env.MS_GRAPH_SENDER_EMAIL = 'notifications@identifyyou.com'
    process.env.CONTACT_EMAIL_TO = 'office@identifyyou.com, team@identifyyou.com'

    const config = getMicrosoftGraphConfig()
    assert(config !== null, 'Config should not be null when set')
    assertEqual(config!.tenantId, 'test-tenant-123', 'Tenant ID matches')
    assertEqual(config!.clientId, 'test-client-456', 'Client ID matches')
    assertEqual(config!.clientSecret, 'test-secret-789', 'Secret matches')
    assertEqual(config!.senderEmail, 'notifications@identifyyou.com', 'Sender matches')
    assertEqual(config!.recipientEmails, ['office@identifyyou.com', 'team@identifyyou.com'], 'Parsed recipients list')
    assertEqual(config!.saveToSentItems, true, 'Default saveToSentItems is true')
  } finally {
    process.env = originalEnv
  }
})

test('sendContactNotification fails gracefully without crashing when credentials are not configured', async () => {
  const { sendContactNotification } = await import('../lib/email')
  const originalEnv = { ...process.env }
  try {
    delete process.env.MS_GRAPH_TENANT_ID
    delete process.env.AZURE_TENANT_ID
    delete process.env.MS_GRAPH_CLIENT_ID
    delete process.env.AZURE_CLIENT_ID

    const result = await sendContactNotification({
      name: 'Test Lead',
      email: 'lead@enterprise.com',
      company: 'Enterprise Inc',
      message: 'Interested in Vision AI',
    })
    assertEqual(result.success, false, 'Result success should be false')
    assert(Boolean(result.error), 'Error message is returned')
  } finally {
    process.env = originalEnv
  }
})

test('ContactSubmissions collection uses sendContactNotification instead of nodemailer', () => {
  const contactCollectionFile = fs.readFileSync(
    path.resolve(process.cwd(), 'payload/collections/ContactSubmissions.ts'),
    'utf8'
  )
  assert(contactCollectionFile.includes('sendContactNotification'), 'Hook calls sendContactNotification')
  assert(!contactCollectionFile.includes('nodemailer'), 'Nodemailer removed from ContactSubmissions collection')
})

test('app/api/contact/route.ts includes fallback sendContactNotification', () => {
  const routeFile = fs.readFileSync(path.resolve(process.cwd(), 'app/api/contact/route.ts'), 'utf8')
  assert(routeFile.includes('sendContactNotification'), 'Contact route includes sendContactNotification')
})

console.log('\n======================================================')
console.log(`📊 Test Results: ${passedTests} passed, ${failedTests} failed`)
console.log('======================================================\n')

if (failedTests > 0) {
  process.exit(1)
}

