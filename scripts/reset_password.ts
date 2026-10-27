import { getPayloadClient } from '../lib/payload'

async function resetPassword() {
  const args = process.argv.slice(2)
  const targetEmail = args[0]
  const newPassword = args[1]

  if (!targetEmail || !newPassword) {
    console.log('\n--------------------------------------------------------------')
    console.log('  IdentifYou — Emergency Admin Password Reset Tool')
    console.log('--------------------------------------------------------------')
    console.log('\nUsage:')
    console.log('  npx tsx scripts/reset_password.ts <email> <newPassword>\n')
    console.log('Example:')
    console.log('  npx tsx scripts/reset_password.ts admin@identifyyou.com NewPass123!\n')
    process.exit(1)
  }

  try {
    const payload = await getPayloadClient()
    if (!payload) {
      console.error('❌ Could not connect to Payload CMS.')
      process.exit(1)
    }

    const result = await payload.find({
      collection: 'users',
      where: {
        email: { equals: targetEmail.trim().toLowerCase() },
      },
    })

    if (result.docs.length === 0) {
      console.error(`\n❌ User with email "${targetEmail}" was not found in the database.`)
      console.log('Run "npx tsx scripts/check_admin.ts" to see all registered emails.\n')
      process.exit(1)
    }

    const user = result.docs[0]
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: newPassword,
      },
    })

    console.log(`\n🎉 SUCCESS! Password for user "${user.email}" has been updated.`)
    console.log('👉 You can now log into: http://localhost:3000/admin with your new password.\n')
  } catch (err) {
    console.error('\n❌ Error updating password:', err)
  }
  process.exit(0)
}

resetPassword()
