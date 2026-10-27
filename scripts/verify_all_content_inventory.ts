import http from 'http'
import { getPayloadClient } from '../lib/payload'

interface ContentItemResult {
  collection: 'case-studies' | 'blogs-and-news'
  slug: string
  title: string
  url: string
  status: number
  h1: string
  hasTitle: boolean
  hasDescInHead: boolean
  hasCanonicalInHead: boolean
  hasContent: boolean
  hasImage: boolean
  passed: boolean
  error?: string
}

function fetchHtml(urlPath: string): Promise<{ status: number; html: string }> {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => resolve({ status: res.statusCode || 0, html: data }))
    }).on('error', (err) => reject(err))
  })
}

async function verifyAllContent() {
  console.log('===============================================================')
  console.log('   VERIFYING EVERY CASE STUDY, BLOG & NEWS ARTICLE INVENTORY   ')
  console.log('===============================================================\n')

  const payload = await getPayloadClient()
  if (!payload) {
    console.error('Payload client not available')
    process.exit(1)
  }

  // 1. Fetch all case studies
  const csResult = await payload.find({
    collection: 'case-studies',
    limit: 200,
    depth: 2,
  })

  // 2. Fetch all blogs and news
  const blogResult = await payload.find({
    collection: 'blogs-and-news',
    limit: 200,
    depth: 2,
  })

  console.log(`Discovered ${csResult.docs.length} Case Studies in Payload database.`)
  console.log(`Discovered ${blogResult.docs.length} Blogs & News in Payload database.\n`)

  const results: ContentItemResult[] = []

  // Check all Case Studies
  console.log('--- Checking Case Studies ---')
  for (const cs of csResult.docs as any[]) {
    const url = `/case-studies/${cs.slug}`
    try {
      const { status, html } = await fetchHtml(url)
      const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
      const head = headMatch ? headMatch[1] : ''

      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
      const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : ''

      const hasTitle = html.includes('<title')
      const hasDescInHead = html.includes('name="description"')
      const hasCanonicalInHead = html.includes('rel="canonical"')
      const hasContent = html.length > 2000
      const hasImage = html.includes('<img')

      const passed = status === 200 && h1.length > 0 && hasTitle && hasDescInHead && hasCanonicalInHead && hasContent

      results.push({
        collection: 'case-studies',
        slug: cs.slug,
        title: cs.title,
        url,
        status,
        h1,
        hasTitle,
        hasDescInHead,
        hasCanonicalInHead,
        hasContent,
        hasImage,
        passed,
      })

      const mark = passed ? '✓ PASS' : '✗ FAIL'
      console.log(`[${mark}] ${url} | Status: ${status} | H1: "${h1.substring(0, 45)}..."`)
    } catch (err: any) {
      results.push({
        collection: 'case-studies',
        slug: cs.slug,
        title: cs.title,
        url,
        status: 0,
        h1: '',
        hasTitle: false,
        hasDescInHead: false,
        hasCanonicalInHead: false,
        hasContent: false,
        hasImage: false,
        passed: false,
        error: err.message,
      })
      console.log(`[✗ FAIL] ${url} | Error: ${err.message}`)
    }
  }

  // Check all Blogs & News
  console.log('\n--- Checking Blogs & News Articles ---')
  for (const b of blogResult.docs as any[]) {
    const url = `/blogs-and-news/${b.slug}`
    try {
      const { status, html } = await fetchHtml(url)
      const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
      const head = headMatch ? headMatch[1] : ''

      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
      const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : ''

      const hasTitle = html.includes('<title')
      const hasDescInHead = html.includes('name="description"')
      const hasCanonicalInHead = html.includes('rel="canonical"')
      const hasContent = html.length > 2000
      const hasImage = html.includes('<img')

      const passed = status === 200 && h1.length > 0 && hasTitle && hasDescInHead && hasCanonicalInHead && hasContent

      results.push({
        collection: 'blogs-and-news',
        slug: b.slug,
        title: b.title,
        url,
        status,
        h1,
        hasTitle,
        hasDescInHead,
        hasCanonicalInHead,
        hasContent,
        hasImage,
        passed,
      })

      const mark = passed ? '✓ PASS' : '✗ FAIL'
      console.log(`[${mark}] ${url} | Status: ${status} | H1: "${h1.substring(0, 45)}..."`)
    } catch (err: any) {
      results.push({
        collection: 'blogs-and-news',
        slug: b.slug,
        title: b.title,
        url,
        status: 0,
        h1: '',
        hasTitle: false,
        hasDescInHead: false,
        hasCanonicalInHead: false,
        hasContent: false,
        hasImage: false,
        passed: false,
        error: err.message,
      })
      console.log(`[✗ FAIL] ${url} | Error: ${err.message}`)
    }
  }

  // Listing Pages & Pagination Checks
  console.log('\n--- Checking Content Listing & Hub Pages ---')
  const hubPages = [
    '/case-studies',
    '/blogs-and-news',
  ]
  for (const hub of hubPages) {
    const { status, html } = await fetchHtml(hub)
    const passed = status === 200 && html.length > 2000
    const mark = passed ? '✓ PASS' : '✗ FAIL'
    console.log(`[${mark}] ${hub} | Status: ${status}`)
  }

  console.log('\n===============================================================')
  console.log('                 CONTENT VERIFICATION SUMMARY                  ')
  console.log('===============================================================')
  const totalItems = results.length
  const passedItems = results.filter((r) => r.passed).length
  const failedItems = totalItems - passedItems

  console.log(`Total Case Studies & Articles Tested : ${totalItems}`)
  console.log(`Passed                               : ${passedItems}`)
  console.log(`Failed                               : ${failedItems}`)
  console.log(`Success Rate                         : ${Math.round((passedItems / totalItems) * 100)}%`)

  if (failedItems > 0) {
    console.log('\nFailed Items:')
    results.filter((r) => !r.passed).forEach((r) => console.log(` - ${r.url} (Status: ${r.status})`))
  }

  process.exit(failedItems > 0 ? 1 : 0)
}

verifyAllContent().catch((err) => {
  console.error('Fatal error during content verification:', err)
  process.exit(1)
})
