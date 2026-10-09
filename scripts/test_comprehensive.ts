import http from 'http'
import fs from 'fs'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
    if (match) {
      process.env[match[1].trim()] = match[2].trim()
    }
  })
}

import { getPayload } from 'payload'
import config from '../payload.config.js'

function fetchUrl(urlPath: string): Promise<{ url: string; status: number | string }> {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      resolve({ url: urlPath, status: res.statusCode || 500 })
    }).on('error', (err) => {
      resolve({ url: urlPath, status: 'ERROR: ' + err.message })
    })
  })
}

async function run() {
  const payload = await getPayload({ config })
  const caseStudies = await payload.find({ collection: 'case-studies', limit: 100 })
  const categories = await payload.find({ collection: 'case-study-categories', limit: 100 })

  const routesToTest = [
    '/',
    '/about',
    '/contact',
    '/manufacturing',
    '/thinking-factory',
    '/industrial-robots',
    '/case-studies',
    '/case-studies/precision-vision-ai-setup',
    '/case-studies/end-to-end-inspection-cell',
    '/case-studies/power-bi-abm',
    '/deep-tech',
    '/deep-tech/vision-ai',
    '/deep-tech/ai-intelligent-business',
    '/deep-tech/ai-no-code',
    '/deep-tech/industry-automation',
    '/deep-tech/data-engineering',
    '/deep-tech/digital-engineering',
    '/deep-tech/supply-chain',
    '/blogs-and-news',
    '/blogs-and-news/snowflake-cortex-ai-manufacturing-data-platform',
    '/blogs-and-news/no-code-ai-platforms-for-enterprise-workflows',
    '/blogs-and-news/deep-tech-computer-vision-assembly-lines',
    '/admin',
  ]

  // Add all case studies from DB
  caseStudies.docs.forEach((cs: any) => {
    if (cs.slug) {
      routesToTest.push(`/case-studies/${cs.slug}`)
    }
  })

  console.log(`Testing ${routesToTest.length} routes against http://localhost:3000...\n`)
  let passCount = 0
  let failCount = 0
  const failures: string[] = []

  for (const url of Array.from(new Set(routesToTest))) {
    const res = await fetchUrl(url)
    const isOk = res.status === 200 || res.status === 307 || res.status === 308 || (url === '/admin' && (res.status === 200 || res.status === 307 || res.status === 308))
    if (isOk) {
      passCount++
      console.log(`[PASS ${res.status}] ${res.url}`)
    } else {
      failCount++
      failures.push(`${res.url} (Status: ${res.status})`)
      console.error(`[FAIL ${res.status}] ${res.url}`)
    }
  }

  console.log(`\n========================================`)
  console.log(`Total Tested: ${passCount + failCount}`)
  console.log(`Passed: ${passCount}`)
  console.log(`Failed: ${failCount}`)
  if (failures.length > 0) {
    console.log(`Failures:\n${failures.join('\n')}`)
  }
  console.log(`========================================\n`)

  process.exit(failCount === 0 ? 0 : 1)
}

run().catch((err) => {
  console.error('Test execution failed:', err)
  process.exit(1)
})
