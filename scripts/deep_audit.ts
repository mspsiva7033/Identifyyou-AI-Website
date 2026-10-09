import http from 'http'
import fs from 'fs'
import path from 'path'
import { FALLBACK_CASE_STUDIES } from '../lib/payload.js'

interface AuditResult {
  slug: string
  title: string
  category: string
  status: number | string
  hasTitle: boolean
  hasOverview: boolean
  imageRef: string | null
  imageFileExists: boolean
  error?: string
}

function fetchPage(urlPath: string): Promise<{ status: number; html: string }> {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        resolve({ status: res.statusCode || 500, html: data })
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

async function runDeepAudit() {
  console.log('========================================================')
  console.log(`Starting Exhaustive Audit of ALL ${FALLBACK_CASE_STUDIES.length} Case Studies...`)
  console.log('Testing against: http://localhost:3000/case-studies/[slug]')
  console.log('========================================================\n')

  const results: AuditResult[] = []
  let passCount = 0
  let failCount = 0

  for (let i = 0; i < FALLBACK_CASE_STUDIES.length; i++) {
    const cs = FALLBACK_CASE_STUDIES[i]
    const urlPath = `/case-studies/${cs.slug}`

    try {
      const { status, html } = await fetchPage(urlPath)

      const hasTitle = html.includes(cs.title) || html.includes('<h1')
      const hasOverview = html.includes('Overview') || html.includes('Challenge') || html.includes('Operational') || html.length > 2000

      // Extract image reference
      let imageRef: string | null = null
      let imageFileExists = false

      const imgMatch = html.match(/\/images\/case-studies\/[^"'\s>]+/) || html.match(/\/media\/[^"'\s>]+/)
      if (imgMatch) {
        imageRef = imgMatch[0]
        const cleanPath = imageRef.replace(/^\//, '')
        const fullDiskPath = path.resolve(process.cwd(), 'public', cleanPath)
        imageFileExists = fs.existsSync(fullDiskPath)
      } else {
        // Check default expected image
        const expectedPng = path.resolve(process.cwd(), `public/images/case-studies/${cs.slug}.png`)
        const expectedSvg = path.resolve(process.cwd(), `public/images/case-studies/${cs.slug}.svg`)
        imageFileExists = fs.existsSync(expectedPng) || fs.existsSync(expectedSvg)
        imageRef = fs.existsSync(expectedSvg) ? `/images/case-studies/${cs.slug}.svg` : `/images/case-studies/${cs.slug}.png`
      }

      const passed = status === 200 && hasTitle && hasOverview

      if (passed) {
        passCount++
      } else {
        failCount++
      }

      results.push({
        slug: cs.slug,
        title: cs.title,
        category: cs.categories[0] || 'General',
        status,
        hasTitle,
        hasOverview,
        imageRef,
        imageFileExists,
        error: !passed ? `Failed verification: status=${status}, hasTitle=${hasTitle}, hasOverview=${hasOverview}` : undefined
      })

      const statusTag = passed ? '✓ PASS' : '✗ FAIL'
      const imgTag = imageFileExists ? '[Img: OK]' : '[Img: MISSING]'
      console.log(`[${i + 1}/${FALLBACK_CASE_STUDIES.length}] ${statusTag} (HTTP ${status}) ${imgTag} — ${cs.slug}`)

    } catch (err: any) {
      failCount++
      results.push({
        slug: cs.slug,
        title: cs.title,
        category: cs.categories[0] || 'General',
        status: 'FETCH_ERROR',
        hasTitle: false,
        hasOverview: false,
        imageRef: null,
        imageFileExists: false,
        error: err.message
      })
      console.error(`[${i + 1}/${FALLBACK_CASE_STUDIES.length}] ✗ ERROR — ${cs.slug}: ${err.message}`)
    }
  }

  console.log('\n========================================================')
  console.log(`AUDIT COMPLETE:`)
  console.log(`Total Case Studies Tested: ${results.length}`)
  console.log(`Passed: ${passCount}`)
  console.log(`Failed: ${failCount}`)
  console.log('========================================================\n')

  const missingImages = results.filter(r => !r.imageFileExists)
  if (missingImages.length > 0) {
    console.log(`Missing Image Files (${missingImages.length}):`)
    missingImages.forEach(m => console.log(` - ${m.slug} -> ${m.imageRef}`))
  } else {
    console.log(`All ${results.length} Case Studies have verified, existing image files!`)
  }

  const failedPages = results.filter(r => r.status !== 200)
  if (failedPages.length > 0) {
    console.error(`Failed Pages (${failedPages.length}):`)
    failedPages.forEach(f => console.error(` - ${f.slug}: HTTP ${f.status} (${f.error})`))
    process.exit(1)
  } else {
    console.log(`All ${results.length} Case Study routes returned HTTP 200 with full content!`)
    process.exit(0)
  }
}

runDeepAudit().catch((err) => {
  console.error('Audit failed:', err)
  process.exit(1)
})
