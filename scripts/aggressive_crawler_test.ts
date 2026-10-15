import fs from 'fs'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
    if (match) process.env[match[1].trim()] = match[2].trim()
  })
}

import { getPayload } from 'payload'
import config from '../payload.config'

const BASE_URL = 'http://localhost:3000'

interface CrawlResult {
  url: string
  status: number
  ok: boolean
  error?: string
}

async function testUrl(pathname: string): Promise<CrawlResult> {
  const fullUrl = `${BASE_URL}${pathname}`
  try {
    const res = await fetch(fullUrl, { redirect: 'follow' })
    return {
      url: pathname,
      status: res.status,
      ok: res.status === 200,
    }
  } catch (err: any) {
    return {
      url: pathname,
      status: 0,
      ok: false,
      error: err.message,
    }
  }
}

async function runAggressiveTest() {
  console.log('\n=============================================================')
  console.log('🚀 AGGRESSIVE FULL-SITE CRAWLER & CATEGORY VERIFICATION')
  console.log('=============================================================\n')

  const payload = await getPayload({ config })

  // 1. Static & Core Pages
  console.log('--- 1. Testing Core Top-Level Pages ---')
  const corePages = [
    '/',
    '/about',
    '/contact',
    '/case-studies',
    '/blogs-and-news',
    '/manufacturing',
    '/industrial-robots',
    '/deep-tech/vision-ai',
    '/deep-tech/supply-chain',
    '/deep-tech/digital-engineering',
    '/deep-tech/data-engineering',
    '/deep-tech/ai-no-code',
    '/deep-tech/ai-intelligent-business',
    '/deep-tech/industry-automation',
    '/admin',
    '/admin/login',
  ]

  let corePassed = 0
  for (const page of corePages) {
    const res = await testUrl(page)
    if (res.ok) {
      corePassed++
      console.log(`  ✅ [200 OK] ${page}`)
    } else {
      console.error(`  ❌ [FAIL ${res.status}] ${page} ${res.error || ''}`)
    }
  }
  console.log(`Core Pages Summary: ${corePassed}/${corePages.length} passed.\n`)

  // 2. All Case Studies & Category Verification
  console.log('--- 2. Testing ALL Case Studies & Category Mapping ---')
  const caseStudies = await payload.find({
    collection: 'case-studies',
    limit: 100,
    depth: 1,
  })

  console.log(`Found ${caseStudies.docs.length} Case Studies in Payload CMS.\n`)
  let csPassed = 0

  for (const cs of caseStudies.docs as any[]) {
    const csUrl = `/case-studies/${cs.slug}`
    const res = await testUrl(csUrl)
    const categoryName = cs.category?.name || (typeof cs.category === 'string' ? cs.category : 'General')

    if (res.ok) {
      csPassed++
      console.log(`  ✅ [200 OK] [Cat: ${categoryName}] ${csUrl} — "${cs.title.slice(0, 45)}..."`)
    } else {
      console.error(`  ❌ [FAIL ${res.status}] ${csUrl}`)
    }
  }
  console.log(`Case Studies Summary: ${csPassed}/${caseStudies.docs.length} passed.\n`)

  // 3. All Blog Posts Verification
  console.log('--- 3. Testing ALL Blog Posts & Categories ---')
  const blogs = await payload.find({
    collection: 'blogs-and-news',
    limit: 50,
  })

  console.log(`Found ${blogs.docs.length} Blogs in Payload CMS.\n`)
  let blogsPassed = 0

  for (const blog of blogs.docs as any[]) {
    const blogUrl = `/blogs-and-news/${blog.slug}`
    const res = await testUrl(blogUrl)
    if (res.ok) {
      blogsPassed++
      console.log(`  ✅ [200 OK] [Cat: ${blog.category}] ${blogUrl} — "${blog.title.slice(0, 45)}..."`)
    } else {
      console.error(`  ❌ [FAIL ${res.status}] ${blogUrl}`)
    }
  }
  console.log(`Blogs Summary: ${blogsPassed}/${blogs.docs.length} passed.\n`)

  // 4. Analytics Tracking & Report Verification
  console.log('--- 4. Testing Analytics Tracking & Report Engine ---')
  const trackSession = `crawl_test_${Date.now()}`

  // Send a pageview beacon
  const trackRes = await fetch(`${BASE_URL}/api/analytics/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    },
    body: JSON.stringify({
      eventName: 'pageview',
      path: '/about',
      title: 'About Us — Leadership Team',
      sessionId: trackSession,
      utms: { source: 'automated_test', medium: 'crawler' },
    }),
  })

  if (trackRes.status === 200) {
    console.log('  ✅ [PASS] /api/analytics/track accepted pageview event')
  } else {
    console.error(`  ❌ [FAIL] /api/analytics/track returned ${trackRes.status}`)
  }

  // Verify /api/admin/analytics returns valid metrics
  const analyticsDataRes = await fetch(`${BASE_URL}/api/admin/analytics?range=today`)
  if (analyticsDataRes.status === 200) {
    const json = await analyticsDataRes.json()
    console.log(`  ✅ [PASS] /api/admin/analytics returned: ${json.summary?.pageViews || 0} pageviews, active users: ${json.summary?.activeUsers || 0}`)
  } else {
    console.error(`  ❌ [FAIL] /api/admin/analytics returned ${analyticsDataRes.status}`)
  }

  console.log('\n=============================================================')
  const totalTests = corePages.length + caseStudies.docs.length + blogs.docs.length + 2
  const totalPassed = corePassed + csPassed + blogsPassed + (trackRes.status === 200 ? 1 : 0) + (analyticsDataRes.status === 200 ? 1 : 0)
  console.log(`🏁 Total Aggressive Crawl Results: ${totalPassed}/${totalTests} URLs & Tests Passed!`)
  console.log('=============================================================\n')

  process.exit(totalPassed === totalTests ? 0 : 1)
}

runAggressiveTest().catch((err) => {
  console.error('Crawler failed:', err)
  process.exit(1)
})
