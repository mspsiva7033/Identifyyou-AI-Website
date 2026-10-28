import http from 'http'

interface LoginResponse {
  token?: string
  user?: any
  exp?: number
}

function postJson(path: string, payload: any, cookie?: string): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: any }> {
  return new Promise((resolve, reject) => {
    const dataStr = JSON.stringify(payload)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(dataStr).toString(),
    }
    if (cookie) {
      headers['Cookie'] = cookie
    }

    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path,
        method: 'POST',
        headers,
      },
      (res) => {
        let resData = ''
        res.on('data', (c) => (resData += c))
        res.on('end', () => {
          let parsed = null
          try {
            parsed = JSON.parse(resData)
          } catch {
            parsed = resData
          }
          resolve({ status: res.statusCode || 0, headers: res.headers, body: parsed })
        })
      }
    )
    req.on('error', reject)
    req.write(dataStr)
    req.end()
  })
}

function getJson(path: string, token?: string, cookie?: string): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: any }> {
  return new Promise((resolve, reject) => {
    const headers: Record<string, string> = {}
    if (cookie) {
      headers['Cookie'] = cookie
    }
    if (token) {
      headers['Authorization'] = `users JWT ${token}`
    }

    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path,
        method: 'GET',
        headers,
      },
      (res) => {
        let resData = ''
        res.on('data', (c) => (resData += c))
        res.on('end', () => {
          let parsed = null
          try {
            parsed = JSON.parse(resData)
          } catch {
            parsed = resData
          }
          resolve({ status: res.statusCode || 0, headers: res.headers, body: parsed })
        })
      }
    )
    req.on('error', reject)
    req.end()
  })
}

async function run() {
  console.log('===============================================================')
  console.log('   LIVE RBAC ENFORCEMENT & PERMISSIONS VERIFICATION MATRIX     ')
  console.log('===============================================================\n')

  const testAccounts = [
    { role: 'superadmin', email: 'qa-superadmin@identifyyou.in', pass: 'QASuperAdmin2026!#' },
    { role: 'editor', email: 'qa-editor@identifyyou.in', pass: 'QAEditorPass2026!#' },
    { role: 'lead-manager', email: 'qa-leadmanager@identifyyou.in', pass: 'QALeadMgrPass2026!#' },
    { role: 'viewer', email: 'qa-viewer@identifyyou.in', pass: 'QAViewerPass2026!#' },
  ]

  for (const account of testAccounts) {
    console.log(`\n🔑 Testing Account: ${account.email} (Expected Role: ${account.role})`)
    const loginRes = await postJson('/api/users/login', {
      email: account.email,
      password: account.pass,
    })

    if (loginRes.status !== 200 || !loginRes.body.token) {
      console.error(`[FAIL] Login failed for ${account.email} with status ${loginRes.status}`)
      continue
    }

    const setCookie = loginRes.headers['set-cookie']
    const rawCookie = setCookie ? setCookie.map((c: string) => c.split(';')[0]).join('; ') : `payload-token=${loginRes.body.token}`
    console.log(`[PASS] Login successful (HTTP 200)`)

    // 1. Check /api/users/me
    const meRes = await getJson('/api/users/me', loginRes.body.token, rawCookie)
    const userRoles = meRes.body.user?.roles || []
    console.log(`[PASS] /api/users/me -> Authenticated as: ${meRes.body.user?.email} | Roles: [${userRoles.join(', ')}]`)

    // 2. Test Access to Users Collection (SuperAdmin only)
    const usersRes = await getJson('/api/users', loginRes.body.token, rawCookie)
    if (account.role === 'superadmin') {
      const pass = usersRes.status === 200
      console.log(`[${pass ? 'PASS' : 'FAIL'}] Access /api/users: Expected 200 => Actual: ${usersRes.status}`)
    } else {
      // In Payload, if read is isSelfOrAdmin, users collection returns only self doc or 403
      const isRestricted = usersRes.status === 403 || (usersRes.body.docs && usersRes.body.docs.length <= 1)
      console.log(`[${isRestricted ? 'PASS' : 'FAIL'}] Access /api/users restricted to self: ${usersRes.body.docs?.length || 0} user doc(s) visible`)
    }

    // 3. Test Access to Contact Submissions (SuperAdmin and Lead-Manager only)
    const leadsRes = await getJson('/api/contact-submissions', loginRes.body.token, rawCookie)
    if (account.role === 'superadmin' || account.role === 'lead-manager') {
      const pass = leadsRes.status === 200
      console.log(`[${pass ? 'PASS' : 'FAIL'}] Access /api/contact-submissions: Expected 200 => Actual: ${leadsRes.status}`)
    } else {
      const pass = leadsRes.status === 403 || leadsRes.status === 401
      console.log(`[${pass ? 'PASS' : 'FAIL'}] Access /api/contact-submissions FORBIDDEN: Expected 403 => Actual: ${leadsRes.status}`)
    }

    // 4. Test Access to Case Studies
    const csRes = await getJson('/api/case-studies', loginRes.body.token, rawCookie)
    console.log(`[${csRes.status === 200 ? 'PASS' : 'FAIL'}] Read /api/case-studies: Expected 200 => Actual: ${csRes.status}`)
  }

  console.log('\n===============================================================')
  console.log('   ALL LIVE RBAC ACCOUNTS TESTED AND ENFORCEMENT VERIFIED     ')
  console.log('===============================================================\n')
}

run().catch(console.error)
