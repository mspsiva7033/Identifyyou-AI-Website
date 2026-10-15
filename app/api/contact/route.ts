import { NextResponse } from 'next/server'
import { saveContactSubmission } from '@/lib/payload'
import { sendContactNotification } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, company, selectedPath, message, utmSource, utmMedium, utmCampaign, utmTerm, utmContent, referrer } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    // Save to Payload CMS (or fallback gracefully)
    const saved = await saveContactSubmission({
      name,
      email,
      company,
      selectedPath,
      message,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      referrer,
    })
    console.log('Contact Form Submission:', { name, email, company, selectedPath, utmSource, utmMedium, utmCampaign, savedToPayload: saved })

    // If saving to CMS failed or was skipped, ensure lead notification is still sent
    if (!saved) {
      console.warn('CMS save did not succeed; dispatching email notification directly via Microsoft Graph API.')
      await sendContactNotification({
        name,
        email,
        company,
        selectedPath,
        message,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
        referrer,
      })
    }

    return NextResponse.json({ success: true, message: 'Submission received.' })
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

