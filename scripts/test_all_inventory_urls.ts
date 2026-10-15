import http from 'http'

interface UrlTest {
  section: string
  url: string
  expectedStatus: number
}

const tests: UrlTest[] = [
  // Static Pages
  { section: 'Static Pages', url: '/', expectedStatus: 200 },
  { section: 'Static Pages', url: '/about', expectedStatus: 200 },
  { section: 'Static Pages', url: '/manufacturing', expectedStatus: 200 },
  { section: 'Static Pages', url: '/deep-tech', expectedStatus: 200 },
  { section: 'Static Pages', url: '/deep-tech/ai-intelligent-business', expectedStatus: 200 },
  { section: 'Static Pages', url: '/deep-tech/ai-no-code', expectedStatus: 200 },
  { section: 'Static Pages', url: '/deep-tech/data-engineering', expectedStatus: 200 },
  { section: 'Static Pages', url: '/deep-tech/default', expectedStatus: 200 },
  { section: 'Static Pages', url: '/deep-tech/digital-engineering', expectedStatus: 200 },
  { section: 'Static Pages', url: '/deep-tech/industry-automation', expectedStatus: 200 },
  { section: 'Static Pages', url: '/deep-tech/manufacturing', expectedStatus: 200 },
  { section: 'Static Pages', url: '/deep-tech/supply-chain', expectedStatus: 200 },
  { section: 'Static Pages', url: '/deep-tech/vision-ai', expectedStatus: 200 },
  { section: 'Static Pages', url: '/deep-tech/vision-ai/identifyou-visionai-intro', expectedStatus: 200 },
  { section: 'Static Pages', url: '/industrial-robots', expectedStatus: 200 },
  { section: 'Static Pages', url: '/thinking-factory', expectedStatus: 200 },
  { section: 'Static Pages', url: '/case-studies', expectedStatus: 200 },
  { section: 'Static Pages', url: '/blogs-and-news', expectedStatus: 200 },
  { section: 'Static Pages', url: '/contact', expectedStatus: 200 },

  // All 31 Case Studies
  { section: 'Case Studies', url: '/case-studies/ai-autonomous-inspection-cell-2026', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/test-case-study-topic', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/connected-intelligent-plant', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/towards-zero-inventory-variance-automation', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/industrial-edge-intelligence', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/industrial-edge-device-engineering', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/fluke-tv30', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/fluke-t40', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/tailored-enterprise-solutions', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/overcoming-data-access-challenges-in-a-multi-business-environment-for-streamlined-decision-making', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/deployment-management', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/business-portals-around-existing-erp', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/data-to-application-development', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/nlp-text-to-business-application', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/business-driven-software-system', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/towards-zero-inventory-variance-ai', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/strategic-procurement-intelligence', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/risk-insights-finance', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/procurement-operations-intelligence', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/optimizing-retail-demand-forecasting', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/migrating-hadoop-and-hana-to-snowflake', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/streamlining-shipment-planning-and-carrier-selection', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/revolutionizing-inventory-optimization', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/power-bi-abm', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/machine-vision', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/zebra-line-inspection', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/vision-ai-complex-dimension', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/vision-ai-bore-measurement', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/advanced-vision-inspection-surface', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/end-to-end-inspection-cell', expectedStatus: 200 },
  { section: 'Case Studies', url: '/case-studies/precision-vision-ai-setup', expectedStatus: 200 },

  // Blogs and News
  { section: 'Blogs & News', url: '/blogs-and-news/test-news-website-qa', expectedStatus: 200 },
  { section: 'Blogs & News', url: '/blogs-and-news/future-of-industrial-vision-ai', expectedStatus: 200 },
  { section: 'Blogs & News', url: '/blogs-and-news/test-blog-website-qa', expectedStatus: 200 },

  // Admin Routes (unauthenticated redirects to login or renders login)
  { section: 'Admin', url: '/admin/login', expectedStatus: 200 },
  { section: 'Admin', url: '/admin', expectedStatus: 200 },
  { section: 'Admin', url: '/admin/analytics', expectedStatus: 200 },

  // API Health Endpoints
  { section: 'API', url: '/api/health', expectedStatus: 200 },
  { section: 'API', url: '/api/health/live', expectedStatus: 200 },
  { section: 'API', url: '/api/health/ready', expectedStatus: 200 },
]

function testUrl(test: UrlTest): Promise<{ pass: boolean; status: number | string; size: number }> {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${test.url}`, (res) => {
      let bodyLen = 0
      res.on('data', (chunk) => {
        bodyLen += chunk.length
      })
      res.on('end', () => {
        const pass = res.statusCode === test.expectedStatus || (res.statusCode && res.statusCode >= 200 && res.statusCode < 400)
        resolve({ pass: !!pass, status: res.statusCode || 0, size: bodyLen })
      })
    })
    req.on('error', (err) => {
      resolve({ pass: false, status: err.message, size: 0 })
    })
    req.setTimeout(10000, () => {
      req.destroy()
      resolve({ pass: false, status: 'TIMEOUT', size: 0 })
    })
  })
}

async function run() {
  console.log(`Starting Exhaustive URL Audit of ${tests.length} routes...`)
  let passed = 0
  let failed = 0

  for (let i = 0; i < tests.length; i++) {
    const t = tests[i]
    const res = await testUrl(t)
    if (res.pass) {
      passed++
      console.log(`[PASS] (${i + 1}/${tests.length}) [${t.section}] ${t.url} -> ${res.status} (${res.size} bytes)`)
    } else {
      failed++
      console.error(`[FAIL] (${i + 1}/${tests.length}) [${t.section}] ${t.url} -> ${res.status}`)
    }
  }

  console.log(`\n========================================`)
  console.log(`Exhaustive URL Audit Complete:`)
  console.log(`Total: ${tests.length} | Passed: ${passed} | Failed: ${failed}`)
  console.log(`========================================`)

  if (failed > 0) process.exit(1)
  process.exit(0)
}

run().catch(console.error)
