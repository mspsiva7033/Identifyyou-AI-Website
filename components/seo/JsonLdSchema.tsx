import React from 'react'

export function JsonLdSchema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://identifyyou.ai/#organization',
        name: 'IdentifYou Technologies',
        url: 'https://identifyyou.ai',
        logo: 'https://identifyyou.ai/images/identifyou-logo.png',
        description:
          'AI-powered solutions for intelligent manufacturing, connected industries and smarter businesses. Vision AI, Industry Automation, AI-Powered No-Code, Data Engineering and Digital Engineering.',
        address: [
          {
            '@type': 'PostalAddress',
            streetAddress: 'Pandi Kovil Ring Road',
            addressLocality: 'Madurai',
            addressRegion: 'Tamil Nadu',
            postalCode: '625107',
            addressCountry: 'IN',
          },
          {
            '@type': 'PostalAddress',
            streetAddress: '3 Northwood Avenue, Purley',
            addressLocality: 'London',
            postalCode: 'CR8 2ER',
            addressCountry: 'GB',
          },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-9597046682',
            contactType: 'customer support',
            email: 'ai.support@identifyyou.in',
            availableLanguage: ['English'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://identifyyou.ai/#website',
        url: 'https://identifyyou.ai',
        name: 'IdentifYou Technologies',
        publisher: {
          '@id': 'https://identifyyou.ai/#organization',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
