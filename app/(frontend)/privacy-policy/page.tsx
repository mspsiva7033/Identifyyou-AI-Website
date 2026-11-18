import type { Metadata } from 'next'
import { getDocxContent } from '@/lib/docx-renderer'
import { LegalDocumentView } from '@/components/legal/LegalDocumentView'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privacy Policy — IdentifYou Technologies',
  description:
    'Review the Privacy Policy for IdentifYou Technologies. Understand how we collect, process, and protect your data across our deep-tech engineering and AI platforms.',
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default async function PrivacyPolicyPage() {
  const doc = await getDocxContent('privacy-policy.docx', 'privacy-policy')

  return (
    <LegalDocumentView
      title="Privacy Policy"
      breadcrumbTitle="Privacy Policy"
      doc={doc}
      badgeText="PRIVACY & DATA PROTECTION"
    />
  )
}
