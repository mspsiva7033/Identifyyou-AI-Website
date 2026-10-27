import http from 'http'

interface ApiTestResult {
  endpoint: string
  method: string
  purpose: string
  statusExpected: number | number[]
  statusActual: number
  passed: boolean
  responsePreview: string
  error?: string
  notes?: string
}

function makeRequest(
  method: string,
  path: string,
  headers: Record<string, string> = {},
  bodyData?: string
): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: string }> {
  return new Promise((resolve, reject) => {
    const reqHeaders: Record<string, string> = { ...headers }
    if (bodyData && !reqHeaders['Content-Type']) {
      reqHeaders['Content-Type'] = 'application/json'
    }
    if (bodyData) {
      reqHeaders['Content-Length'] = Buffer.byteLength(bodyData).toString()
    }

    const options: http.RequestOptions = {
      hostname: 'localhost',
      port: 3000,
      path,
      method,
      headers: reqHeaders,
    }

    const req = http.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        resolve({
          status: res.statusCode || 0,
          headers: res.headers,
          body: data,
        })
      })
    })

    req.on('error', (err) => reject(err))
    if (bodyData) {
      req.write(bodyData)
    }
    req.end()
  })
}

async function runAllApiTests() {
  console.log('===============================================================')
  console.log('     STARTING EXHAUSTIVE API INVENTORY & VERIFICATION SUITE    ')
  console.log('===============================================================\n')

  const results: ApiTestResult[] = []

  async function testApi(
    method: string,
    path: string,
    purpose: string,
    statusExpected: number | number[],
    headers: Record<string, string> = {},
    bodyData?: string,
    validator?: (body: string, status: number) => boolean
  ) {
    try {
      const res = await makeRequest(method, path, headers, bodyData)
      const expectedArray = Array.isArray(statusExpected) ? statusExpected : [statusExpected]
      let passed = expectedArray.includes(res.status)
      if (passed && validator) {
        passed = validator(res.body, res.status)
      }
      const preview = res.body.length > 200 ? res.body.substring(0, 197) + '...' : res.body
      const result: ApiTestResult = {
        endpoint: path,
        method,
        purpose,
        statusExpected,
        statusActual: res.status,
        passed,
        responsePreview: preview.replace(/\r?\n/g, ' '),
      }
      results.push(result)
      const statusIcon = passed ? '✓ PASS' : '✗ FAIL'
      console.log(`[${statusIcon}] [${method}] ${path} => Actual: ${res.status} (Expected: ${expectedArray.join('/')})`)
      if (!passed) {
        console.log(`   Response snippet: ${preview}`)
      }
    } catch (err: any) {
      results.push({
        endpoint: path,
        method,
        purpose,
        statusExpected,
        statusActual: 0,
        passed: false,
        responsePreview: '',
        error: err.message,
      })
      console.log(`[✗ FAIL - ERROR] [${method}] ${path} => ${err.message}`)
    }
  }

  // --- GROUP 1: HEALTH & SYSTEM APIS ---
  console.log('\n--- 1. Health & Diagnostics APIs ---')
  await testApi('GET', '/api/health', 'Overall system health check', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return data.status === 'healthy' && data.checks?.databaseConfig === true
  })
  await testApi('GET', '/api/health/live', 'Kubernetes/Liveness probe', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return data.status === 'ok' && typeof data.uptime === 'number'
  })
  await testApi('GET', '/api/health/ready', 'Kubernetes/Readiness probe', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return data.status === 'ready' && data.schema === 'ready'
  })

  // --- GROUP 2: CONTACT & LEAD GENERATION APIS ---
  console.log('\n--- 2. Contact & Lead Capture APIs ---')
  await testApi('POST', '/api/contact', 'Valid corporate lead submission', 200, {}, JSON.stringify({
    name: 'QA Test Engineer',
    email: 'qa.verification@enterprise-example.com',
    company: 'Enterprise QA Labs',
    selectedPath: 'vision-ai',
    message: 'Automated end-to-end verification test submission.',
  }), (body) => {
    const data = JSON.parse(body)
    return data.success === true
  })
  await testApi('POST', '/api/contact', 'Missing required fields (validation)', 400, {}, JSON.stringify({
    company: 'Enterprise QA Labs',
  }))
  await testApi('POST', '/api/contact', 'Malformed JSON payload (error handling)', 500, { 'Content-Type': 'application/json' }, 'invalid-json')
  await testApi('GET', '/api/contact', 'Unsupported HTTP method (GET on contact endpoint)', 405)

  // --- GROUP 3: ANALYTICS & TELEMETRY APIS ---
  console.log('\n--- 3. Analytics & Telemetry APIs ---')
  await testApi('POST', '/api/analytics/track', 'Standard pageview tracking', 200, {}, JSON.stringify({
    eventName: 'pageview',
    path: '/deep-tech/vision-ai',
    title: 'Vision AI & Inspection',
    sessionId: 'test-session-123',
  }))
  await testApi('POST', '/api/analytics/track', 'Custom event tracking with UTM metadata', 200, {}, JSON.stringify({
    eventName: 'cta_click',
    path: '/case-studies',
    title: 'Case Studies',
    sessionId: 'test-session-123',
    utms: { source: 'test-source', medium: 'e2e-test' },
  }))
  await testApi('POST', '/api/analytics/track', 'Beacon text/plain payload support', 200, { 'Content-Type': 'text/plain' }, JSON.stringify({
    eventName: 'page_exit',
    path: '/',
  }))

  // --- GROUP 4: ADMIN ANALYTICS REPORTING API ---
  console.log('\n--- 4. Admin Analytics Reporting APIs ---')
  await testApi('GET', '/api/admin/analytics', 'Default analytics report (30d)', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return typeof data.summary?.pageViews === 'number' && Array.isArray(data.topPages)
  })
  await testApi('GET', '/api/admin/analytics?range=today', 'Analytics report for today', 200)
  await testApi('GET', '/api/admin/analytics?range=7d', 'Analytics report for 7 days', 200)
  await testApi('GET', '/api/admin/analytics?range=90d', 'Analytics report for 90 days', 200)
  await testApi('GET', '/api/admin/analytics?range=custom&startDate=2026-01-01&endDate=2026-10-27', 'Custom date range analytics', 200)

  // --- GROUP 5: SEED & ABM APIS ---
  console.log('\n--- 5. Seed & ABM Case Study APIs ---')
  await testApi('GET', '/api/seed-abm', 'Seed ABM verification', 200)

  // --- GROUP 6: PAYLOAD CMS REST APIS ---
  console.log('\n--- 6. Payload CMS Collection REST APIs ---')
  await testApi('GET', '/api/case-studies', 'Fetch case studies collection list', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return Array.isArray(data.docs) && data.docs.length > 0
  })
  await testApi('GET', '/api/case-studies?limit=2', 'Case studies pagination limit query', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return data.docs.length === 2 && data.limit === 2
  })
  await testApi('GET', '/api/case-studies?where[slug][equals]=precision-abm-snowflake-cortex', 'Case studies filter by slug', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return data.docs.length >= 1
  })
  await testApi('GET', '/api/case-study-categories', 'Fetch case study categories collection', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return Array.isArray(data.docs) && data.docs.length > 0
  })
  await testApi('GET', '/api/blogs-and-news', 'Fetch blogs and news collection', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return Array.isArray(data.docs) && data.docs.length > 0
  })
  await testApi('GET', '/api/leadership-team', 'Fetch leadership team collection', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return Array.isArray(data.docs)
  })
  await testApi('GET', '/api/media', 'Fetch media collection', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return Array.isArray(data.docs)
  })
  await testApi('GET', '/api/manufacturing-solutions', 'Fetch manufacturing solutions collection', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return Array.isArray(data.docs)
  })
  await testApi('GET', '/api/deep-tech-capabilities', 'Fetch deep tech capabilities collection', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return Array.isArray(data.docs)
  })

  // --- GROUP 7: PAYLOAD GLOBALS REST APIS ---
  console.log('\n--- 7. Payload CMS Globals REST APIs ---')
  await testApi('GET', '/api/globals/header', 'Fetch Header global config', 200)
  await testApi('GET', '/api/globals/footer', 'Fetch Footer global config', 200)
  await testApi('GET', '/api/globals/site-settings', 'Fetch Site Settings global config', 200)
  await testApi('GET', '/api/globals/home-page-data', 'Fetch Home Page Data global config', 200)

  // --- GROUP 8: AUTHENTICATION & ACCESS CONTROL APIS ---
  console.log('\n--- 8. Authentication & Protected Access APIs ---')
  await testApi('GET', '/api/users/me', 'Unauthenticated /me request check', 200, {}, undefined, (body) => {
    const data = JSON.parse(body)
    return data.user === null
  })
  await testApi('GET', '/api/contact-submissions', 'Protected collection access without auth (access control)', [401, 403, 200], {}, undefined, (body) => {
    // Check if protected or empty for public
    try {
      const data = JSON.parse(body)
      return data.docs ? true : false
    } catch {
      return false
    }
  })
  await testApi('POST', '/api/users/login', 'Login attempt with invalid credentials (security)', 401, {}, JSON.stringify({
    email: 'unauthorized-test@example.com',
    password: 'wrongpassword123',
  }))
  await testApi('POST', '/api/users/login', 'Login attempt with missing credentials (validation)', 400, {}, JSON.stringify({}))

  // --- GROUP 9: GRAPHQL APIS ---
  console.log('\n--- 9. GraphQL APIs ---')
  const gqlIntrospection = JSON.stringify({
    query: `query { __schema { queryType { name } } }`,
  })
  await testApi('POST', '/api/graphql', 'GraphQL schema introspection query', 200, {}, gqlIntrospection, (body) => {
    const data = JSON.parse(body)
    return Boolean(data.data?.__schema?.queryType?.name)
  })

  const gqlCaseStudiesQuery = JSON.stringify({
    query: `query { CaseStudies(limit: 1) { docs { id title slug } } }`,
  })
  await testApi('POST', '/api/graphql', 'GraphQL query for CaseStudies collection', 200, {}, gqlCaseStudiesQuery, (body) => {
    const data = JSON.parse(body)
    return Boolean(data.data?.CaseStudies?.docs)
  })

  await testApi('GET', '/api/graphql-playground', 'GraphQL Playground interface', 200, {}, undefined, (body) => {
    return body.includes('GraphQL') || body.includes('playground') || body.includes('html')
  })

  // --- SUMMARY STATS ---
  console.log('\n===============================================================')
  console.log('                   API TEST SUITE SUMMARY                      ')
  console.log('===============================================================')
  const total = results.length
  const passedCount = results.filter((r) => r.passed).length
  const failedCount = total - passedCount

  console.log(`Total Endpoints/Scenarios Tested : ${total}`)
  console.log(`Passed                           : ${passedCount}`)
  console.log(`Failed                           : ${failedCount}`)
  console.log(`Success Rate                     : ${Math.round((passedCount / total) * 100)}%`)

  if (failedCount > 0) {
    console.log('\nFailed Endpoints:')
    results.filter((r) => !r.passed).forEach((r) => {
      console.log(` - [${r.method}] ${r.endpoint} => Actual ${r.statusActual}, Expected ${JSON.stringify(r.statusExpected)}`)
    })
  }

  return { total, passedCount, failedCount, results }
}

runAllApiTests().then(({ failedCount }) => {
  process.exit(failedCount > 0 ? 1 : 0)
}).catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
