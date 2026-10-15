import fs from 'fs'
import path from 'path'

// Load environment variables from .env.local or .env
for (const envFile of ['.env.local', '.env']) {
  const envPath = path.resolve(process.cwd(), envFile)
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
      if (match && !process.env[match[1].trim()]) {
        process.env[match[1].trim()] = match[2].trim()
      }
    })
  }
}

import { getMicrosoftGraphConfig, sendContactNotification } from '../lib/email'

async function run() {
  console.log('----------------------------------------------------')
  console.log('  IdentifYou — Microsoft Graph Email Diagnostic Tool')
  console.log('----------------------------------------------------\n')

  const tenantId = process.env.MS_GRAPH_TENANT_ID || process.env.AZURE_TENANT_ID
  const clientId = process.env.MS_GRAPH_CLIENT_ID || process.env.AZURE_CLIENT_ID
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET || process.env.AZURE_CLIENT_SECRET
  const senderEmail =
    process.env.MS_GRAPH_SENDER_EMAIL ||
    process.env.MS_GRAPH_FROM_EMAIL ||
    process.env.AZURE_SENDER_EMAIL ||
    process.env.CONTACT_EMAIL_FROM
  const recipientEmail = process.env.CONTACT_EMAIL_TO

  console.log('Configuration Check:')
  console.log(`  - Tenant ID:     ${tenantId ? '✅ ' + tenantId.substring(0, 8) + '...' : '❌ Missing (MS_GRAPH_TENANT_ID)'}`)
  console.log(`  - Client ID:     ${clientId ? '✅ ' + clientId.substring(0, 8) + '...' : '❌ Missing (MS_GRAPH_CLIENT_ID)'}`)
  console.log(`  - Client Secret: ${clientSecret ? '✅ [Configured, length: ' + clientSecret.length + ']' : '❌ Missing (MS_GRAPH_CLIENT_SECRET)'}`)
  console.log(`  - Sender Email:  ${senderEmail ? '✅ ' + senderEmail : '❌ Missing (MS_GRAPH_SENDER_EMAIL)'}`)
  console.log(`  - Recipient:     ${recipientEmail ? '✅ ' + recipientEmail : '❌ Missing (CONTACT_EMAIL_TO)'}`)

  const config = getMicrosoftGraphConfig()
  if (!config) {
    console.error('\n❌ Incomplete configuration. Please fill in these values in .env.local')
    process.exit(1)
  }

  console.log('\nSending test contact notification email...')
  const result = await sendContactNotification({
    name: 'Microsoft Graph Test Lead',
    email: 'test.lead@example.com',
    company: 'Test Corporation',
    selectedPath: 'Vision AI & Inspection',
    message: 'This is a test submission verifying Microsoft Graph OAuth 2.0 Client Credentials email delivery.',
    utmSource: 'diagnostic_script',
    utmMedium: 'cli',
    utmCampaign: 'email_verification',
  })

  if (result.success) {
    console.log('\n🎉 SUCCESS! Test email was successfully dispatched via Microsoft Graph API.')
    console.log(`   Check inbox of: ${config.recipientEmails.join(', ')}`)
  } else {
    console.error('\n❌ FAILED to send email:')
    console.error('  ', result.error)
    console.log('\nCommon troubleshooting steps:')
    console.log('  1. Check if "Mail.Send" Application permission is added in Azure App Registration.')
    console.log('  2. Ensure "Grant admin consent" was clicked in Azure Portal for Mail.Send.')
    console.log('  3. Ensure the MS_GRAPH_CLIENT_SECRET is the secret "Value" (not Secret ID).')
    console.log('  4. Ensure MS_GRAPH_SENDER_EMAIL is a valid active mailbox on your Microsoft 365 tenant.')
    process.exit(1)
  }
}

run().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
