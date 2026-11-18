import type { Metadata } from 'next'
import { getDocxContent } from '@/lib/docx-renderer'
import { LegalDocumentView } from '@/components/legal/LegalDocumentView'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Terms and Conditions — IdentifYou Technologies',
  description:
    'Review the Terms and Conditions for using the IdentifYou Technologies website, digital services, and deep-tech platforms.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
}

export default async function TermsAndConditionsPage() {
  const doc = await getDocxContent('terms-and-conditions.docx', 'terms-and-conditions')

  return (
    <LegalDocumentView
      title="Terms and Conditions"
      breadcrumbTitle="Terms & Conditions"
      doc={doc}
      badgeText="TERMS OF SERVICE"
    />
  )
}
