import http from 'http'
import fs from 'fs'
import path from 'path'
import { FALLBACK_CASE_STUDIES } from '../lib/payload.js'

function fetchPage(urlPath: string): Promise<{ status: number; html: string }> {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        resolve({ status: res.statusCode || 500, html: data })
      })
    }).on('error', (err) => {
      resolve({ status: 500, html: 'ERROR: ' + err.message })
    })
  })
}

async function verifyAll() {
  console.log('========================================================')
  console.log('IDENTIFYU TOTAL SYSTEM & SITE VERIFICATION')
  console.log('Testing against: http://localhost:3000')
  console.log('========================================================\n')

  let totalTests = 0
  let passedTests = 0
  let failedTests = 0

  function assert(title: string, pass: boolean, details?: string) {
    totalTests++
    if (pass) {
      passedTests++
      console.log(`✓ [PASS] ${title}`)
    } else {
      failedTests++
      console.error(`✗ [FAIL] ${title} - ${details || ''}`)
    }
  }

  // 1. Filesystem & Configuration checks
  console.log('--- 1. Filesystem & Configuration ---')
  assert('public/media directory exists', fs.existsSync(path.resolve(process.cwd(), 'public/media')))
  assert('public/media/.gitkeep exists', fs.existsSync(path.resolve(process.cwd(), 'public/media/.gitkeep')))
  
  const gitignoreContent = fs.readFileSync(path.resolve(process.cwd(), '.gitignore'), 'utf8')
  assert('.gitignore ignores /public/media/*', gitignoreContent.includes('/public/media/*'))

  const payloadConfig = fs.readFileSync(path.resolve(process.cwd(), 'payload.config.ts'), 'utf8')
  assert('payload.config.ts registers BlogsAndNews', payloadConfig.includes('BlogsAndNews'))
  assert('payload.config.ts sets local media as default', payloadConfig.includes("USE_S3 === 'true'"))

  assert('lib/umami.ts exists', fs.existsSync(path.resolve(process.cwd(), 'lib/umami.ts')))
  assert('HOSTINGER_POSTGRES_SETUP.md exists', fs.existsSync(path.resolve(process.cwd(), 'HOSTINGER_POSTGRES_SETUP.md')))

  // 2. Umami Analytics HTML Inspection
  console.log('\n--- 2. Umami Analytics & Clean Tag Inspection ---')
  const homeRes = await fetchPage('/')
  assert('Homepage returns HTTP 200', homeRes.status === 200)
  assert('Google Analytics / GTM completely removed from HTML', !homeRes.html.includes('googletagmanager.com/gtag/js') && !homeRes.html.includes("window.dataLayer = window.dataLayer || []"))

  // 3. Core Static and Marketing Routes
  console.log('\n--- 3. Core Site & Deep Tech Routes ---')
  const coreRoutes = [
    '/',
    '/about',
    '/contact',
    '/manufacturing',
    '/thinking-factory',
    '/industrial-robots',
    '/case-studies',
    '/blogs-and-news',
    '/deep-tech',
    '/deep-tech/vision-ai',
    '/deep-tech/industry-automation',
    '/deep-tech/data-engineering',
    '/deep-tech/ai-intelligent-business',
    '/deep-tech/digital-engineering',
    '/deep-tech/ai-no-code',
    '/deep-tech/supply-chain',
  ]

  for (const route of coreRoutes) {
    const res = await fetchPage(route)
    assert(`Route ${route} (HTTP ${res.status})`, res.status === 200)
  }

  // 4. Admin / Payload CMS Gateway
  console.log('\n--- 4. Payload CMS Admin Gateway ---')
  const adminRes = await fetchPage('/admin')
  assert('Admin route reachable (HTTP 200, 307 or 308)', adminRes.status === 200 || adminRes.status === 307 || adminRes.status === 308)
  const loginRes = await fetchPage('/admin/login')
  assert('Admin login page reachable (HTTP 200)', loginRes.status === 200)

  // 5. Blogs & News Articles
  console.log('\n--- 5. Blogs & News Articles ---')
  const blogSlugs = [
    'ai-in-manufacturing-quality-inspection-2026',
    'building-connected-factories-opc-ua-mqtt-edge',
    'snowflake-cortex-ai-manufacturing-data-platform',
    'no-code-ai-platforms-for-enterprise-workflows',
    'deep-tech-computer-vision-assembly-lines',
    'predictive-maintenance-iiot-sensor-fusion',
  ]

  for (const slug of blogSlugs) {
    const res = await fetchPage(`/blogs-and-news/${slug}`)
    assert(`Blog Article /blogs-and-news/${slug} (HTTP ${res.status})`, res.status === 200)
  }

  // 6. Case Studies Verification (All 31)
  console.log('\n--- 6. Exhaustive Case Studies Verification (All 31) ---')
  let csPassed = 0
  for (const cs of FALLBACK_CASE_STUDIES) {
    const res = await fetchPage(`/case-studies/${cs.slug}`)
    const expectedPng = path.resolve(process.cwd(), `public/images/case-studies/${cs.slug}.png`)
    const expectedSvg = path.resolve(process.cwd(), `public/images/case-studies/${cs.slug}.svg`)
    const imgOk = fs.existsSync(expectedPng) || fs.existsSync(expectedSvg)

    if (res.status === 200 && imgOk) {
      csPassed++
    } else {
      assert(`Case Study /case-studies/${cs.slug}`, false, `status=${res.status}, imgOk=${imgOk}`)
    }
  }
  assert(`All ${FALLBACK_CASE_STUDIES.length} Case Studies Verified (HTTP 200 + Image Asset exists)`, csPassed === FALLBACK_CASE_STUDIES.length)

  console.log('\n========================================================')
  console.log(`FINAL VERIFICATION SUMMARY:`)
  console.log(`Total Checks: ${totalTests}`)
  console.log(`Passed: ${passedTests}`)
  console.log(`Failed: ${failedTests}`)
  console.log('========================================================\n')

  process.exit(failedTests === 0 ? 0 : 1)
}

verifyAll().catch((err) => {
  console.error('Verification failed:', err)
  process.exit(1)
})
