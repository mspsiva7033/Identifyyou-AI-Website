import type { Metadata } from 'next'
import { ContactClient } from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Our Deep Tech Team',
  description:
    'Connect with IdentifYou deep tech experts to explore custom Vision AI, IIoT industrial automation, and enterprise data solutions.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
