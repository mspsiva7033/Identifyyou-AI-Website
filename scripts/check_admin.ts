import { getPayloadClient } from '../lib/payload'

async function resetAdminPassword() {
  try {
    const payload = await getPayloadClient()
    if (!payload) {
      console.log('Payload client unavailable')
      process.exit(1)
    }

    const users = await payload.find({
      collection: 'users',
    })

    if (users.docs.length > 0) {
      const adminUser = users.docs[0]
      await payload.update({
        collection: 'users',
        id: adminUser.id,
        data: {
          password: 'AdminPassword123!',
        },
      })
      console.log(`Updated password for admin user: ${adminUser.email}`)
    } else {
      const newAdmin = await payload.create({
        collection: 'users',
        data: {
          email: 'mspsiva5820@gmail.com',
          password: 'AdminPassword123!',
        },
      })
      console.log('Created admin user:', newAdmin.email)
    }
  } catch (err) {
    console.error('Error resetting password:', err)
  }
  process.exit(0)
}

resetAdminPassword()
