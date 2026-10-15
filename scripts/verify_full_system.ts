import fs from 'fs'
import path from 'path'

// Load .env or .env.local if DATABASE_URI is missing
if (!process.env.DATABASE_URI) {
  for (const envFile of ['.env', '.env.local']) {
    const envPath = path.resolve(process.cwd(), envFile)
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      envContent.split(/\r?\n/).forEach((line) => {
        const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
        if (match && !process.env[match[1].trim()]) {
          process.env[match[1].trim()] = match[2].trim()
        }
      })
      break
    }
  }
}

import { getDbPool } from '../lib/db-pool'
import { getDatabaseConfig } from '../lib/db-config'

interface TestResult {
  suite: string
  name: string
  status: 'PASS' | 'FAIL'
  details?: string
  latencyMs?: number
}

const results: TestResult[] = []

async function runCheck(suite: string, name: string, fn: () => Promise<string | void>) {
  const start = Date.now()
  try {
    const details = (await fn()) || undefined
    const latencyMs = Date.now() - start
    results.push({ suite, name, status: 'PASS', details, latencyMs })
    console.log(`  ✅ [PASS] ${name} (${latencyMs}ms)${details ? ` - ${details}` : ''}`)
  } catch (err: any) {
    const latencyMs = Date.now() - start
    results.push({ suite, name, status: 'FAIL', details: err.message || String(err), latencyMs })
    console.error(`  ❌ [FAIL] ${name} (${latencyMs}ms): ${err.message || err}`)
  }
}

async function runFullVerification() {
  console.log('\n======================================================')
  console.log('🔍 Comprehensive System Verification & End-to-End Test')
  console.log('======================================================\n')

  const baseUrl = 'http://localhost:3000'

  // ── 1. Database & Connectivity Tests ─────────────────────────
  console.log('--- 1. Database & Schema Verification ---')
  await runCheck('Database', 'PostgreSQL Connection & Pool', async () => {
    const pool = getDbPool()
    const res = await pool.query('SELECT current_database(), current_user, version()')
    return `Connected to DB: ${res.rows[0].current_database} as ${res.rows[0].current_user}`
  })

  await runCheck('Database', 'Core Payload Tables ("users", "media", "case_studies")', async () => {
    const pool = getDbPool()
    const res = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_name IN ('users', 'media', 'case_studies', 'payload_migrations', 'analytics_events')
      ORDER BY table_name;
    `)
    const tables = res.rows.map((r) => r.table_name)
    if (!tables.includes('users')) throw new Error('Missing "users" table!')
    if (!tables.includes('analytics_events')) throw new Error('Missing "analytics_events" table!')
    return `Verified tables: ${tables.join(', ')}`
  })

  // ── 2. Health Check API Endpoints ───────────────────────────
  console.log('\n--- 2. Health & Readiness Endpoints ---')
  await runCheck('Health', 'GET /api/health/live', async () => {
    const res = await fetch(`${baseUrl}/api/health/live`)
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (json.status !== 'ok') throw new Error(`Unexpected body: ${JSON.stringify(json)}`)
    return `Uptime: ${json.uptime}s`
  })

  await runCheck('Health', 'GET /api/health/ready', async () => {
    const res = await fetch(`${baseUrl}/api/health/ready`)
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (json.status !== 'ready' || json.database !== 'connected') {
      throw new Error(`Readiness check failed: ${JSON.stringify(json)}`)
    }
    return `Status: ${json.status}, DB: ${json.database}, Schema: ${json.schema}`
  })

  await runCheck('Health', 'GET /api/health', async () => {
    const res = await fetch(`${baseUrl}/api/health`)
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    return `Environment: ${json.environment}, Checks: ${JSON.stringify(json.checks)}`
  })

  // ── 3. Payload Admin Panel Verification ─────────────────────
  console.log('\n--- 3. Payload Admin Panel & Authentication ---')
  await runCheck('Admin', 'GET /admin (Main Admin Route)', async () => {
    const res = await fetch(`${baseUrl}/admin`, { redirect: 'manual' })
    if (res.status >= 500) throw new Error(`HTTP 500 Server Error: ${res.status}`)
    const text = await res.text()
    if (text.includes('500 Internal Server Error') || text.includes('Unhandled Runtime Error')) {
      throw new Error('Detected internal server error in admin HTML!')
    }
    return `HTTP ${res.status} (${text.length} bytes rendered)`
  })

  await runCheck('Admin', 'GET /admin/login (Admin Login Page)', async () => {
    const res = await fetch(`${baseUrl}/admin/login`, { redirect: 'manual' })
    if (res.status >= 500) throw new Error(`HTTP 500 Server Error: ${res.status}`)
    const text = await res.text()
    if (text.includes('500 Internal Server Error')) throw new Error('HTTP 500 inside login HTML')
    return `HTTP ${res.status} (${text.length} bytes rendered)`
  })

  await runCheck('Admin', 'GET /admin/analytics (Custom Analytics View)', async () => {
    const res = await fetch(`${baseUrl}/admin/analytics`, { redirect: 'manual' })
    if (res.status >= 500) throw new Error(`HTTP 500 Server Error: ${res.status}`)
    const text = await res.text()
    return `HTTP ${res.status} (${text.length} bytes rendered)`
  })

  // ── 4. In-App Analytics End-to-End Tracking Test ─────────────
  console.log('\n--- 4. In-App Analytics End-to-End Tracking ---')
  const testSessionId = `e2e_test_session_${Date.now()}`

  await runCheck('Analytics', 'Record Pageview via /api/analytics/track', async () => {
    const res = await fetch(`${baseUrl}/api/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',
      },
      body: JSON.stringify({
        eventName: 'pageview',
        path: '/e2e-test-homepage',
        title: 'E2E Test Homepage',
        referrer: 'https://linkedin.com',
        sessionId: testSessionId,
        utms: { source: 'linkedin', medium: 'cpc', campaign: 'enterprise_ai' },
      }),
    })
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (!json.success) throw new Error('API reported failure')
    return 'Pageview beacon stored successfully'
  })

  await runCheck('Analytics', 'Record Case Study View Event', async () => {
    const res = await fetch(`${baseUrl}/api/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',
      },
      body: JSON.stringify({
        eventName: 'view_case_study',
        path: '/case-studies/e2e-smart-factory',
        title: 'Smart Factory AI Automation',
        sessionId: testSessionId,
        metadata: { category: 'Vision AI & Quality', slug: 'e2e-smart-factory' },
      }),
    })
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
    return 'Case study view recorded'
  })

  await runCheck('Analytics', 'Record B2B Lead Conversion Event ("generate_lead")', async () => {
    const res = await fetch(`${baseUrl}/api/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',
      },
      body: JSON.stringify({
        eventName: 'generate_lead',
        path: '/contact',
        title: 'Contact IdentifYou',
        sessionId: testSessionId,
        metadata: { interest: 'Vision AI & Inspection' },
        utms: { source: 'linkedin', medium: 'cpc', campaign: 'enterprise_ai' },
      }),
    })
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
    return 'Lead conversion event recorded'
  })

  await runCheck('Analytics', 'Verify Aggregated Data in /api/admin/analytics', async () => {
    const res = await fetch(`${baseUrl}/api/admin/analytics?range=today`)
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()

    if (data.status !== 'live') throw new Error(`Status is not live: ${data.status}`)
    if (data.summary.totalUsers < 1) throw new Error('Expected at least 1 user')
    if (data.realtime?.activeVisitorsNow < 1) throw new Error('Expected active visitors now >= 1')
    if (data.funnel?.caseStudyReaders < 1) throw new Error('Expected case study readers >= 1')
    if (data.funnel?.leadsGenerated < 1) throw new Error('Expected leads generated >= 1')

    return `Active Now: ${data.realtime.activeVisitorsNow}, Funnel Conversion: ${data.funnel.conversionRate}%, Events: ${data.events.length}`
  })

  // ── 5. Cleanup Synthetic E2E Test Events ────────────────────
  console.log('\n--- 5. Clean Up Synthetic Test Rows ---')
  await runCheck('Cleanup', 'Purge E2E synthetic rows from analytics_events', async () => {
    const pool = getDbPool()
    const deleteRes = await pool.query(
      `DELETE FROM analytics_events WHERE session_id = $1 OR path LIKE '%e2e%'`,
      [testSessionId]
    )
    return `Purged ${deleteRes.rowCount} synthetic test rows. Database left pristine.`
  })

  // ── Summary Report ──────────────────────────────────────────
  console.log('\n======================================================')
  const passed = results.filter((r) => r.status === 'PASS').length
  const failed = results.filter((r) => r.status === 'FAIL').length
  console.log(`📊 Comprehensive Verification Summary: ${passed} Passed, ${failed} Failed`)
  console.log('======================================================\n')

  if (failed > 0) {
    process.exit(1)
  }
  process.exit(0)
}

runFullVerification().catch((err) => {
  console.error('Fatal verification error:', err)
  process.exit(1)
})
