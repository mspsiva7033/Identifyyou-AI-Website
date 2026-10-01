import { NextResponse } from 'next/server'
import { saveContactSubmission } from '@/lib/payload'

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

    return NextResponse.json({ success: true, message: 'Submission received.' })
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

