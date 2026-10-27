/**
 * lib/email.ts
 *
 * Microsoft Graph API Email Integration for Contact Form Notifications.
 * Replaces traditional SMTP with secure OAuth 2.0 Client Credentials flow
 * via Microsoft 365 / Entra ID (Azure AD).
 */

export interface ContactNotificationData {
  name: string
  email: string
  company?: string | null
  selectedPath?: string | null
  message?: string | null
  utmSource?: string | null
  utmMedium?: string | null
  utmCampaign?: string | null
  utmTerm?: string | null
  utmContent?: string | null
  referrer?: string | null
}

export interface MicrosoftGraphConfig {
  tenantId: string
  clientId: string
  clientSecret: string
  senderEmail: string
  recipientEmails: string[]
  saveToSentItems: boolean
}

// In-memory token cache to avoid requesting an access token on every submission
let tokenCache: {
  accessToken: string
  expiresAt: number
} | null = null

/**
 * Retrieve and validate Microsoft Graph configuration from environment variables.
 */
export function getMicrosoftGraphConfig(): MicrosoftGraphConfig | null {
  const tenantId = process.env.MS_GRAPH_TENANT_ID || process.env.AZURE_TENANT_ID
  const clientId = process.env.MS_GRAPH_CLIENT_ID || process.env.AZURE_CLIENT_ID
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET || process.env.AZURE_CLIENT_SECRET
  const senderEmail =
    process.env.MS_GRAPH_SENDER_EMAIL ||
    process.env.MS_GRAPH_FROM_EMAIL ||
    process.env.AZURE_SENDER_EMAIL ||
    process.env.CONTACT_EMAIL_FROM ||
    process.env.SMTP_FROM ||
    process.env.SMTP_USER

  const rawRecipients = process.env.CONTACT_EMAIL_TO || senderEmail

  if (!tenantId || !clientId || !clientSecret || !senderEmail || !rawRecipients) {
    return null
  }

  // Parse comma-separated recipient addresses
  const recipientEmails = rawRecipients
    .split(',')
    .map((addr) => addr.trim())
    .filter(Boolean)

  const saveToSentItems = process.env.MS_GRAPH_SAVE_TO_SENT_ITEMS !== 'false'

  return {
    tenantId,
    clientId,
    clientSecret,
    senderEmail,
    recipientEmails,
    saveToSentItems,
  }
}

/**
 * Obtain an OAuth 2.0 Client Credentials Bearer Token for Microsoft Graph API.
 */
async function getGraphAccessToken(config: MicrosoftGraphConfig): Promise<string> {
  const now = Date.now()

  // Return cached token if valid (with 5-minute safety buffer)
  if (tokenCache && tokenCache.expiresAt > now + 300 * 1000) {
    return tokenCache.accessToken
  }

  const tokenUrl = `https://login.microsoftonline.com/${encodeURIComponent(config.tenantId)}/oauth2/v2.0/token`

  const bodyParams = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  })

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyParams.toString(),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(
      `Failed to obtain Microsoft Graph access token (HTTP ${res.status}): ${errorText}`
    )
  }

  const data = (await res.json()) as {
    access_token: string
    expires_in: number
    token_type: string
  }

  tokenCache = {
    accessToken: data.access_token,
    expiresAt: now + (data.expires_in || 3600) * 1000,
  }

  return tokenCache.accessToken
}

/**
 * Escape HTML special characters for safe email rendering.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Build rich responsive HTML and Plain-Text representations for the submission.
 */
function buildEmailContent(data: ContactNotificationData): { html: string; text: string } {
  const safeName = escapeHtml(data.name || 'Anonymous')
  const safeEmail = escapeHtml(data.email || 'N/A')
  const safeCompany = escapeHtml(data.company || 'Not provided')
  const safePath = escapeHtml(data.selectedPath || 'General / Unspecified')
  const safeMessage = data.message ? escapeHtml(data.message).replace(/\n/g, '<br/>') : '<em>No message provided</em>'

  const hasMarketingData = Boolean(
    data.utmSource ||
    data.utmMedium ||
    data.utmCampaign ||
    data.utmTerm ||
    data.utmContent ||
    data.referrer
  )

  const textMarketingLines: string[] = []
  if (data.utmSource) textMarketingLines.push(`UTM Source: ${data.utmSource}`)
  if (data.utmMedium) textMarketingLines.push(`UTM Medium: ${data.utmMedium}`)
  if (data.utmCampaign) textMarketingLines.push(`UTM Campaign: ${data.utmCampaign}`)
  if (data.utmTerm) textMarketingLines.push(`UTM Term: ${data.utmTerm}`)
  if (data.utmContent) textMarketingLines.push(`UTM Content: ${data.utmContent}`)
  if (data.referrer) textMarketingLines.push(`Referrer: ${data.referrer}`)

  const text = `
New Contact Form Submission - IdentifYou Technologies
=====================================================

Name: ${data.name}
Work Email: ${data.email}
Company: ${data.company || 'Not provided'}
Area of Interest: ${data.selectedPath || 'General / Unspecified'}

Message:
${data.message || 'No message provided'}

${hasMarketingData ? `\nAttribution & Tracking:\n${textMarketingLines.join('\n')}\n` : ''}
Sent at: ${new Date().toISOString()}
`.trim()

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0f172a; padding: 24px 32px; border-bottom: 2px solid #3b82f6;">
              <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: -0.025em;">
                IdentifYou Technologies
              </h2>
              <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">
                New Website Lead & Contact Submission
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <h3 style="margin: 0 0 20px 0; font-size: 18px; color: #0f172a; font-weight: 600;">
                Submission Details
              </h3>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 14px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 10px 0; width: 140px; color: #64748b; font-weight: 500; vertical-align: top;">Name</td>
                  <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-weight: 500; vertical-align: top;">Work Email</td>
                  <td style="padding: 10px 0;">
                    <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-weight: 500; vertical-align: top;">Company</td>
                  <td style="padding: 10px 0; color: #0f172a;">${safeCompany}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-weight: 500; vertical-align: top;">Area of Interest</td>
                  <td style="padding: 10px 0;">
                    <span style="display: inline-block; background-color: #eff6ff; color: #1d4ed8; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 9999px;">
                      ${safePath}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Message Box -->
              <div style="margin-top: 16px; margin-bottom: 24px;">
                <div style="font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
                  Message
                </div>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155;">
                  ${safeMessage}
                </div>
              </div>

              <!-- Quick Reply CTA -->
              <div style="margin-top: 24px; text-align: left;">
                <a href="mailto:${safeEmail}?subject=Re:%20Inquiry%20regarding%20IdentifYou%20Technologies" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; padding: 10px 20px; border-radius: 6px;">
                  Reply to ${safeName}
                </a>
              </div>

              ${
                hasMarketingData
                  ? `
              <!-- Marketing / UTM Details -->
              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px dashed #e2e8f0;">
                <div style="font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
                  Attribution & Marketing Context
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 12px; color: #64748b;">
                  ${data.utmSource ? `<tr><td style="padding: 4px 0; width: 120px;">Source:</td><td style="color: #334155;">${escapeHtml(data.utmSource)}</td></tr>` : ''}
                  ${data.utmMedium ? `<tr><td style="padding: 4px 0;">Medium:</td><td style="color: #334155;">${escapeHtml(data.utmMedium)}</td></tr>` : ''}
                  ${data.utmCampaign ? `<tr><td style="padding: 4px 0;">Campaign:</td><td style="color: #334155;">${escapeHtml(data.utmCampaign)}</td></tr>` : ''}
                  ${data.utmTerm ? `<tr><td style="padding: 4px 0;">Term:</td><td style="color: #334155;">${escapeHtml(data.utmTerm)}</td></tr>` : ''}
                  ${data.utmContent ? `<tr><td style="padding: 4px 0;">Content:</td><td style="color: #334155;">${escapeHtml(data.utmContent)}</td></tr>` : ''}
                  ${data.referrer ? `<tr><td style="padding: 4px 0;">Referrer:</td><td style="color: #334155;">${escapeHtml(data.referrer)}</td></tr>` : ''}
                </table>
              </div>
              `
                  : ''
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              This notification was generated automatically by IdentifYou Website via Microsoft Graph API.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim()

  return { html, text }
}

/**
 * Send an email notification using Microsoft Graph API /v1.0/users/{sender}/sendMail.
 */
export async function sendEmailViaMicrosoftGraph(
  data: ContactNotificationData,
  config: MicrosoftGraphConfig
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getGraphAccessToken(config)
    const { html, text } = buildEmailContent(data)

    const subject = `New Contact Submission from ${data.name}${data.company ? ` (${data.company})` : ''}`

    const sendMailEndpoint = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      config.senderEmail
    )}/sendMail`

    const messagePayload = {
      message: {
        subject,
        body: {
          contentType: 'HTML',
          content: html,
        },
        toRecipients: config.recipientEmails.map((email) => ({
          emailAddress: {
            address: email,
          },
        })),
        replyTo: data.email
          ? [
              {
                emailAddress: {
                  address: data.email,
                  name: data.name,
                },
              },
            ]
          : undefined,
      },
      saveToSentItems: config.saveToSentItems,
    }

    const response = await fetch(sendMailEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messagePayload),
    })

    if (!response.ok) {
      const errBody = await response.text()
      console.error(
        `[Microsoft Graph API] Error sending email (HTTP ${response.status}):`,
        errBody
      )
      return {
        success: false,
        error: `Graph API returned HTTP ${response.status}: ${errBody}`,
      }
    }

    console.log(
      `[Microsoft Graph API] Contact notification email successfully dispatched to ${config.recipientEmails.join(', ')} for submission from ${data.email}`
    )
    return { success: true }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[Microsoft Graph API] Failed to send contact notification:', errorMsg)
    return { success: false, error: errorMsg }
  }
}

/**
 * High-level contact notification handler.
 * Validates Microsoft Graph API configuration and sends the notification email.
 */
export async function sendContactNotification(
  data: ContactNotificationData
): Promise<{ success: boolean; error?: string }> {
  const config = getMicrosoftGraphConfig()

  if (!config) {
    const missing = [
      !(process.env.MS_GRAPH_TENANT_ID || process.env.AZURE_TENANT_ID) && 'MS_GRAPH_TENANT_ID',
      !(process.env.MS_GRAPH_CLIENT_ID || process.env.AZURE_CLIENT_ID) && 'MS_GRAPH_CLIENT_ID',
      !(process.env.MS_GRAPH_CLIENT_SECRET || process.env.AZURE_CLIENT_SECRET) && 'MS_GRAPH_CLIENT_SECRET',
      !(
        process.env.MS_GRAPH_SENDER_EMAIL ||
        process.env.MS_GRAPH_FROM_EMAIL ||
        process.env.AZURE_SENDER_EMAIL ||
        process.env.CONTACT_EMAIL_FROM ||
        process.env.SMTP_FROM ||
        process.env.SMTP_USER
      ) && 'MS_GRAPH_SENDER_EMAIL',
      !process.env.CONTACT_EMAIL_TO && 'CONTACT_EMAIL_TO',
    ].filter(Boolean)

    console.warn(
      `[Microsoft Graph API] Contact notification skipped: Missing environment configuration: ${missing.join(
        ', '
      )}. Please configure these in your environment (.env.local).`
    )
    return {
      success: false,
      error: `Missing Microsoft Graph configuration: ${missing.join(', ')}`,
    }
  }

  return sendEmailViaMicrosoftGraph(data, config)
}

/**
 * Low-level function to send any generic email (such as Password Reset) via Microsoft Graph API.
 */
export async function sendRawGraphEmail(options: {
  to: string | string[]
  subject: string
  html?: string
  text?: string
}): Promise<{ success: boolean; error?: string }> {
  const config = getMicrosoftGraphConfig()
  if (!config) {
    return { success: false, error: 'Microsoft Graph configuration is missing.' }
  }

  const token = await getGraphAccessToken(config)
  const sendMailEndpoint = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
    config.senderEmail
  )}/sendMail`

  const recipients = (Array.isArray(options.to) ? options.to : [options.to])
    .map((item) => {
      if (typeof item === 'string') {
        const match = item.match(/<([^>]+)>/)
        return match ? match[1].trim() : item.trim()
      } else if (item && typeof item === 'object' && 'address' in item) {
        return (item as any).address.trim()
      }
      return ''
    })
    .filter(Boolean)

  if (recipients.length === 0) {
    return { success: false, error: 'No valid recipient email addresses provided.' }
  }

  const messagePayload = {
    message: {
      subject: options.subject,
      body: {
        contentType: options.html ? 'HTML' : 'Text',
        content: options.html || options.text || '',
      },
      toRecipients: recipients.map((email) => ({
        emailAddress: {
          address: email,
        },
      })),
    },
    saveToSentItems: config.saveToSentItems,
  }

  const response = await fetch(sendMailEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messagePayload),
  })

  if (!response.ok) {
    const errText = await response.text()
    console.error(`[Microsoft Graph API] Error sending email (HTTP ${response.status}):`, errText)
    return { success: false, error: `HTTP ${response.status}: ${errText}` }
  }

  return { success: true }
}

/**
 * Native Payload CMS 3.x Email Adapter backed by Microsoft Graph API.
 * Automatically sends Payload emails (Password Reset, Admin Invitations)
 * using the existing Azure / Microsoft 365 OAuth 2.0 Client Credentials.
 */
export const microsoftGraphEmailAdapter = () => {
  const config = getMicrosoftGraphConfig()
  const defaultFrom = config?.senderEmail || process.env.SMTP_FROM || 'ai.support@identifyyou.in'

  return ({ payload }: { payload: any }) => ({
    name: 'microsoft-graph',
    defaultFromAddress: defaultFrom,
    defaultFromName: 'IdentifYou Technologies',
    sendEmail: async (message: any) => {
      try {
        const toList: string[] = []
        if (typeof message.to === 'string') {
          toList.push(message.to)
        } else if (Array.isArray(message.to)) {
          message.to.forEach((t: any) => {
            if (typeof t === 'string') toList.push(t)
            else if (t && typeof t === 'object' && 'address' in t) toList.push(t.address)
          })
        }

        const res = await sendRawGraphEmail({
          to: toList,
          subject: message.subject || 'Notification from IdentifYou',
          html: typeof message.html === 'string' ? message.html : undefined,
          text: typeof message.text === 'string' ? message.text : undefined,
        })

        if (!res.success) {
          payload.logger?.error?.({ msg: `[MS Graph Email Adapter] Send failed: ${res.error}` })
          throw new Error(res.error)
        }

        payload.logger?.info?.({ msg: `[MS Graph Email Adapter] Successfully sent email to ${toList.join(', ')}` })
        return res
      } catch (err) {
        payload.logger?.error?.({ msg: `[MS Graph Email Adapter] Error: ${err}` })
        throw err
      }
    },
  })
}

