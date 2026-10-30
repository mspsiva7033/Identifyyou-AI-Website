import fs from 'fs'
import path from 'path'

// Ensure env variables are loaded
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

import { getPayload } from 'payload'
import config from '../payload.config'
import {
  isSuperAdmin,
  isAdmin,
  isEditorOrAdmin,
  canCreateContent,
  canUpdateContent,
  canDeleteContent,
  canViewLeads,
  isAdminPanelUser,
  isSelfOrAdmin,
} from '../lib/access'

interface TestResult {
  role: string
  test: string
  passed: boolean
  detail?: string
}

const results: TestResult[] = []

function assert(role: string, test: string, condition: boolean, detail?: string) {
  results.push({
    role,
    test,
    passed: condition,
    detail,
  })
}

async function runRBACTests() {
  console.log('🛡️  IdentifYou RBAC Comprehensive Security & Verification Suite')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  const payload = await getPayload({ config })

  // Setup Mock User Personas
  const superadminUser = {
    id: 3,
    name: 'Test Super Admin',
    email: 'superadmin@identifyyou.in',
    roles: ['superadmin'],
    isActive: true,
  }

  const adminUser = {
    id: 7,
    name: 'Test Administrator',
    email: 'admin@identifyyou.in',
    roles: ['admin'],
    isActive: true,
  }

  const editorUser = {
    id: 4,
    name: 'Test Content Editor',
    email: 'editor@identifyyou.in',
    roles: ['editor'],
    isActive: true,
  }

  const authorUser = {
    id: 8,
    name: 'Test Content Author',
    email: 'author@identifyyou.in',
    roles: ['author'],
    isActive: true,
  }

  const leadManagerUser = {
    id: 5,
    name: 'Test Lead Manager',
    email: 'leadmgr@identifyyou.in',
    roles: ['lead-manager'],
    isActive: true,
  }

  const viewerUser = {
    id: 6,
    name: 'Test Read Viewer',
    email: 'viewer@identifyyou.in',
    roles: ['viewer'],
    isActive: true,
  }

  const inactiveUser = {
    id: 99,
    name: 'Deactivated Employee',
    email: 'inactive@identifyyou.in',
    roles: ['editor'],
    isActive: false,
  }

  const anonymousUser = null

  console.log('👤 Testing Category 1: Super Admin')
  assert('superadmin', 'isSuperAdmin predicate passes', isSuperAdmin({ req: { user: superadminUser } as any }) === true)
  assert('superadmin', 'isAdmin predicate passes', isAdmin({ req: { user: superadminUser } as any }) === true)
  assert('superadmin', 'Can create content', canCreateContent({ req: { user: superadminUser } as any }) === true)
  assert('superadmin', 'Can edit all marketing content', canUpdateContent({ req: { user: superadminUser } as any }) === true)
  assert('superadmin', 'Can delete content', canDeleteContent({ req: { user: superadminUser } as any }) === true)
  assert('superadmin', 'Can view client leads', canViewLeads({ req: { user: superadminUser } as any }) === true)
  assert('superadmin', 'Can enter Admin Panel', isAdminPanelUser({ req: { user: superadminUser } as any }) === true)
  assert('superadmin', 'Has self/admin user access', isSelfOrAdmin({ req: { user: superadminUser } as any }) === true)

  console.log('👤 Testing Category 2: Administrator')
  assert('admin', 'Cannot act as SuperAdmin', isSuperAdmin({ req: { user: adminUser } as any }) === false)
  assert('admin', 'isAdmin predicate passes', isAdmin({ req: { user: adminUser } as any }) === true)
  assert('admin', 'Can create content', canCreateContent({ req: { user: adminUser } as any }) === true)
  assert('admin', 'Can edit all marketing content', canUpdateContent({ req: { user: adminUser } as any }) === true)
  assert('admin', 'Can delete content', canDeleteContent({ req: { user: adminUser } as any }) === true)
  assert('admin', 'Can view client leads', canViewLeads({ req: { user: adminUser } as any }) === true)
  assert('admin', 'Can enter Admin Panel', isAdminPanelUser({ req: { user: adminUser } as any }) === true)

  console.log('👤 Testing Category 3: Content Editor')
  assert('editor', 'Cannot act as SuperAdmin', isSuperAdmin({ req: { user: editorUser } as any }) === false)
  assert('editor', 'Cannot act as Admin', isAdmin({ req: { user: editorUser } as any }) === false)
  assert('editor', 'Can create content', canCreateContent({ req: { user: editorUser } as any }) === true)
  assert('editor', 'Can edit any marketing content', canUpdateContent({ req: { user: editorUser } as any }) === true)
  assert('editor', 'FORBIDDEN from deleting content', canDeleteContent({ req: { user: editorUser } as any }) === false)
  assert('editor', 'FORBIDDEN from viewing client leads', canViewLeads({ req: { user: editorUser } as any }) === false)
  assert('editor', 'Can enter Admin Panel', isAdminPanelUser({ req: { user: editorUser } as any }) === true)

  console.log('👤 Testing Category 4: Content Author')
  assert('author', 'Cannot act as SuperAdmin', isSuperAdmin({ req: { user: authorUser } as any }) === false)
  assert('author', 'Can create content', canCreateContent({ req: { user: authorUser } as any }) === true)
  const authorUpdateScope = canUpdateContent({ req: { user: authorUser } as any })
  const isScopedToOwn = typeof authorUpdateScope === 'object' && authorUpdateScope !== null && (authorUpdateScope as any)?.createdBy?.equals === 8
  assert('author', 'Can ONLY edit owned content (scoped by createdBy)', isScopedToOwn)
  assert('author', 'FORBIDDEN from deleting content', canDeleteContent({ req: { user: authorUser } as any }) === false)
  assert('author', 'FORBIDDEN from viewing client leads', canViewLeads({ req: { user: authorUser } as any }) === false)
  assert('author', 'Can enter Admin Panel', isAdminPanelUser({ req: { user: authorUser } as any }) === true)

  console.log('👤 Testing Category 5: Lead Manager (Sales)')
  assert('lead-manager', 'Cannot act as SuperAdmin', isSuperAdmin({ req: { user: leadManagerUser } as any }) === false)
  assert('lead-manager', 'FORBIDDEN from editing marketing content', canUpdateContent({ req: { user: leadManagerUser } as any }) === false)
  assert('lead-manager', 'Can view client leads', canViewLeads({ req: { user: leadManagerUser } as any }) === true)
  assert('lead-manager', 'Can enter Admin Panel', isAdminPanelUser({ req: { user: leadManagerUser } as any }) === true)

  console.log('👤 Testing Category 6: Read-Only Viewer')
  assert('viewer', 'Cannot act as SuperAdmin', isSuperAdmin({ req: { user: viewerUser } as any }) === false)
  assert('viewer', 'FORBIDDEN from creating content', canCreateContent({ req: { user: viewerUser } as any }) === false)
  assert('viewer', 'FORBIDDEN from editing content', canUpdateContent({ req: { user: viewerUser } as any }) === false)
  assert('viewer', 'FORBIDDEN from deleting content', canDeleteContent({ req: { user: viewerUser } as any }) === false)
  assert('viewer', 'FORBIDDEN from viewing client leads', canViewLeads({ req: { user: viewerUser } as any }) === false)
  assert('viewer', 'Can enter Admin Panel as viewer', isAdminPanelUser({ req: { user: viewerUser } as any }) === true)

  console.log('👤 Testing Category 7: Deactivated Account (isActive: false)')
  assert('inactive', 'Access to Admin Panel immediately BLOCKED', isAdminPanelUser({ req: { user: inactiveUser } as any }) === false)
  assert('inactive', 'Content creation immediately BLOCKED', canCreateContent({ req: { user: inactiveUser } as any }) === false)
  assert('inactive', 'Content editing immediately BLOCKED', canUpdateContent({ req: { user: inactiveUser } as any }) === false)

  console.log('👤 Testing Category 8: Anonymous Public Visitor')
  assert('anonymous', 'Admin access BLOCKED', isAdminPanelUser({ req: { user: anonymousUser } as any }) === false)
  assert('anonymous', 'Content creation BLOCKED', canCreateContent({ req: { user: anonymousUser } as any }) === false)
  assert('anonymous', 'Content editing BLOCKED', canUpdateContent({ req: { user: anonymousUser } as any }) === false)
  assert('anonymous', 'Leads viewing BLOCKED', canViewLeads({ req: { user: anonymousUser } as any }) === false)

  // Print Summary Table
  console.log('\n============================================================')
  console.log('               RBAC VERIFICATION RESULTS MATRIX             ')
  console.log('============================================================')
  let allPassed = true
  for (const r of results) {
    const badge = r.passed ? '✅ PASS' : '❌ FAIL'
    console.log(`${badge} | [${r.role.padEnd(12)}] | ${r.test}`)
    if (!r.passed) allPassed = false
  }

  console.log('============================================================')
  if (allPassed) {
    console.log(`🎉 ALL ${results.length} RBAC SECURITY CHECKS PASSED SUCCESSFULLY!`)
  } else {
    console.error('⚠️ Some RBAC security checks failed.')
    process.exit(1)
  }

  process.exit(0)
}

runRBACTests().catch((err) => {
  console.error('Fatal error running RBAC test suite:', err)
  process.exit(1)
})
