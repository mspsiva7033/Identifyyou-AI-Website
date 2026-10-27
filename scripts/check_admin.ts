import { getPayloadClient } from '../lib/payload'

async function checkAdminStatus() {
  try {
    const payload = await getPayloadClient()
    if (!payload) {
      console.log('Payload client unavailable')
      process.exit(1)
    }

    const users = await payload.find({
      collection: 'users',
      limit: 50,
    })

    if (users.docs.length > 0) {
      console.log(`\nFound ${users.docs.length} registered admin user(s):`)
      users.docs.forEach((u: any, idx: number) => {
        console.log(`  ${idx + 1}. ${u.email} (ID: ${u.id})`)
      })
    } else {
      console.log('\n✓ No admin users found in the database.')
      console.log('👉 Please open http://localhost:3000/admin in your browser.')
      console.log('   Payload CMS will automatically display the "Create First User" onboarding screen.\n')
    }
  } catch (err) {
    console.error('Error checking admin status:', err)
  }
  process.exit(0)
}

checkAdminStatus()

