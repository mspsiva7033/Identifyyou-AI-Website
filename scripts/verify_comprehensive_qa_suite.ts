import pg from 'pg'
import path from 'path'
import fs from 'fs'

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

const BASE_URL = 'http://localhost:3000'

interface LoginResult {
  token: string
  user: any
}

async function login(email: string, pass: string): Promise<LoginResult> {
  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass }),
  })
  if (!res.ok) {
    throw new Error(`Login failed for ${email}: ${res.status} ${await res.text()}`)
  }
  const data = await res.json()
  return { token: data.token, user: data.user }
}

async function runSuite() {
  console.log('🧪 Starting End-to-End QA Testing Suite...')
  console.log('====================================================')

  const client = new pg.Client({ connectionString: process.env.DATABASE_URI })
  await client.connect()

  // 1. Log in all personas
  console.log('\n🔑 Step 1: Authenticating test accounts...')
  const superAdminAuth = await login('qa-superadmin@identifyyou.in', 'QASuperAdmin2026!#')
  const adminAuth = await login('qa-admin@identifyyou.in', 'QAAdminPass2026!#')
  const editorAuth = await login('qa-editor@identifyyou.in', 'QAEditorPass2026!#')
  const authorAuth = await login('qa-author@identifyyou.in', 'QAAuthorPass2026!#')
  const viewerAuth = await login('qa-viewer@identifyyou.in', 'QAViewerPass2026!#')
  console.log('✓ All 5 personas successfully authenticated.')

  // 2. Create Blog B and Case Study B as QA Editor (ID: 4)
  console.log('\n📝 Step 2: Creating Blog B and Case Study B as Editor (ID 4)...')
  const blogBRes = await fetch(`${BASE_URL}/api/blogs-and-news`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${editorAuth.token}`,
    },
    body: JSON.stringify({
      title: 'QA Audit - Blog Editing and Audit History',
      slug: 'qa-audit-blog-editing-audit-history',
      category: 'Deep Tech',
      excerpt: 'Identifiable QA test content for verifying editing workflow and change history.',
      status: 'draft',
      author: 'QA Editor Team',
    }),
  })
  const blogBData = await blogBRes.json()
  const blogBId = blogBData.doc?.id
  console.log(`✓ Blog B created: ID ${blogBId} (status: ${blogBRes.status})`)

  const csBRes = await fetch(`${BASE_URL}/api/case-studies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${editorAuth.token}`,
    },
    body: JSON.stringify({
      title: 'QA Audit - Case Study Role Permission Verification',
      slug: 'qa-audit-case-study-role-permission-verification',
      category: 58, // Industry Automation
      summary: {
        challenge: 'Test case study for verifying role-based content management and multi-user editing.',
      },
      status: 'draft',
      author: 'QA Editorial Group',
    }),
  })
  const csBData = await csBRes.json()
  const csBId = csBData.doc?.id
  console.log(`✓ Case Study B created: ID ${csBId} (status: ${csBRes.status})`)

  // 3. Edit Blog A (ID 11) as its original Creator (Author, ID 8)
  console.log('\n✏️ Step 3: Author self-editing Blog A (ID 11)...')
  const authorEditRes = await fetch(`${BASE_URL}/api/blogs-and-news/11`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authorAuth.token}`,
    },
    body: JSON.stringify({
      title: 'QA Audit - Blog Ownership Verification (Self-Edited by Author)',
      excerpt: 'Updated excerpt by author to verify self-edit persistence and audit tracking.',
    }),
  })
  console.log(`✓ Author edit on Blog A response status: ${authorEditRes.status}`)

  // 4. Edit Blog A (ID 11) as another authorized editor (Editor, ID 4)
  console.log('\n👥 Step 4: Editor editing Blog A (ID 11) created by Author...')
  const editorEditRes = await fetch(`${BASE_URL}/api/blogs-and-news/11`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${editorAuth.token}`,
    },
    body: JSON.stringify({
      title: 'QA Audit - Blog Ownership Verification (Multi-User Edited by Editor)',
      excerpt: 'Excerpt revised by QA Editor to verify last editor attribution.',
    }),
  })
  console.log(`✓ Editor edit on Blog A response status: ${editorEditRes.status}`)

  // 5. Database check on Blog A ownership fields
  console.log('\n🔍 Step 5: Verifying Blog A persisted creator and editor in database...')
  const blogADb = await client.query('SELECT id, title, created_by_id, updated_by_id, author, created_at, updated_at FROM blogs_and_news WHERE id = 11')
  const bA = blogADb.rows[0]
  console.log(`  Blog 11 Title: "${bA.title}"`)
  console.log(`  Blog 11 Creator ID: ${bA.created_by_id} (Expected: 8, Author) => ${bA.created_by_id === 8 ? 'PASS' : 'FAIL'}`)
  console.log(`  Blog 11 Last Editor ID: ${bA.updated_by_id} (Expected: 4, Editor) => ${bA.updated_by_id === 4 ? 'PASS' : 'FAIL'}`)
  console.log(`  Blog 11 Credited Author: "${bA.author}"`)

  // 6. Negative Test: Author (ID 8) attempts to edit Blog B (ID blogBId, created by Editor ID 4)
  console.log('\n🚫 Step 6: Negative test - Author attempting to edit Editor\'s Blog B...')
  const unauthorizedEditRes = await fetch(`${BASE_URL}/api/blogs-and-news/${blogBId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authorAuth.token}`,
    },
    body: JSON.stringify({
      title: 'MALICIOUS TAKEOVER ATTEMPT BY AUTHOR',
    }),
  })
  console.log(`  Unauthorized edit status: ${unauthorizedEditRes.status} (Expected: 403 or 404/not permitted)`)
  const blogBDbCheck = await client.query('SELECT title FROM blogs_and_news WHERE id = $1', [blogBId])
  const unauthBlocked = blogBDbCheck.rows[0].title !== 'MALICIOUS TAKEOVER ATTEMPT BY AUTHOR'
  console.log(`  Database record integrity preserved: ${unauthBlocked ? 'PASS' : 'FAIL'}`)

  // 7. Negative Test: Viewer attempts to create blog
  console.log('\n🚫 Step 7: Negative test - Read-only Viewer attempting to create a blog...')
  const viewerCreateRes = await fetch(`${BASE_URL}/api/blogs-and-news`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${viewerAuth.token}`,
    },
    body: JSON.stringify({
      title: 'Viewer Unauthorized Blog',
      slug: 'viewer-unauth-blog',
      excerpt: 'Should be rejected',
      status: 'draft',
    }),
  })
  console.log(`  Viewer create blog status: ${viewerCreateRes.status} (Expected: 403) => ${viewerCreateRes.status === 403 ? 'PASS' : 'FAIL'}`)

  // 8. Negative Test: Forged createdBy payload submission
  console.log('\n🚫 Step 8: Negative test - Submitting forged createdBy ID in payload...')
  const forgeRes = await fetch(`${BASE_URL}/api/blogs-and-news`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authorAuth.token}`,
    },
    body: JSON.stringify({
      title: 'QA Audit - Forgery Test Blog',
      slug: `qa-audit-forgery-test-${Date.now()}`,
      excerpt: 'Attempting to spoof creator as SuperAdmin (ID 3)',
      status: 'draft',
      createdBy: 3, // Spoofed ID
      created_by_id: 3,
    }),
  })
  const forgeData = await forgeRes.json()
  const forgeBlogId = forgeData.doc?.id
  const forgeDb = await client.query('SELECT created_by_id FROM blogs_and_news WHERE id = $1', [forgeBlogId])
  const actualCreator = forgeDb.rows[0]?.created_by_id
  console.log(`  Submitted createdBy: 3, Persisted created_by_id: ${actualCreator} (Expected: 8, Author) => ${actualCreator === 8 ? 'PASS (Spoofing Defeated)' : 'FAIL'}`)

  // Clean up the forgery test record
  await client.query('DELETE FROM blogs_and_news WHERE id = $1', [forgeBlogId])

  // 9. Publication and unpublication tests for Blog A and Case Study A
  console.log('\n📢 Step 9: Publication tests for Blog A and Case Study A...')
  const publishBlogRes = await fetch(`${BASE_URL}/api/blogs-and-news/11`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${editorAuth.token}`,
    },
    body: JSON.stringify({
      status: 'published',
    }),
  })
  console.log(`  Blog 11 publish status: ${publishBlogRes.status}`)

  const publishCsRes = await fetch(`${BASE_URL}/api/case-studies/199`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${editorAuth.token}`,
    },
    body: JSON.stringify({
      status: 'published',
    }),
  })
  console.log(`  Case Study 199 publish status: ${publishCsRes.status}`)

  const pubCheckDb = await client.query('SELECT id, status, published_by_id, published_at FROM blogs_and_news WHERE id = 11')
  console.log(`  Blog 11 Published By ID: ${pubCheckDb.rows[0].published_by_id} (Expected: 4, Editor) => ${pubCheckDb.rows[0].published_by_id === 4 ? 'PASS' : 'FAIL'}`)
  console.log(`  Blog 11 Published At: ${pubCheckDb.rows[0].published_at}`)

  // 10. Audit logs verification
  console.log('\n📜 Step 10: Inspecting full audit log trail...')
  const auditRes = await client.query(`
    SELECT action, resource_type, resource_id, resource_title, actor_email, outcome, timestamp 
    FROM audit_logs 
    ORDER BY id ASC;
  `)
  console.log(`Total audit events recorded: ${auditRes.rows.length}`)
  console.table(auditRes.rows.map(r => ({
    time: r.timestamp.toISOString().substring(11, 19),
    action: r.action,
    type: r.resource_type,
    id: r.resource_id,
    actor: r.actor_email,
    outcome: r.outcome,
  })))

  // 11. Negative Test: Tampering with audit logs
  console.log('\n🚫 Step 11: Negative test - Attempting direct modification of audit logs...')
  const tamperRes = await fetch(`${BASE_URL}/api/audit-logs/1`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${superAdminAuth.token}`,
    },
  })
  console.log(`  Direct DELETE on /api/audit-logs: ${tamperRes.status} (Expected: 403 or 405) => ${tamperRes.status === 403 || tamperRes.status === 405 ? 'PASS (Immutable)' : 'FAIL'}`)

  await client.end()
  console.log('\n🎉 Comprehensive QA Suite Completed Successfully!')
}

runSuite().catch(console.error)
