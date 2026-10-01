import type { GlobalConfig } from 'payload'

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Site Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'brand',
      label: 'Brand',
      fields: [
        { name: 'name', type: 'text', defaultValue: 'IdentifYou Technologies' },
        { name: 'tagline', type: 'text', defaultValue: 'Deep Tech. Built Around Business.' },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Contact Info',
      fields: [
        { name: 'email', type: 'email', defaultValue: 'ai.support@identifyyou.in' },
        { name: 'phone', type: 'text', defaultValue: '+91 9597046682' },
        { name: 'indiaAddress', type: 'text', defaultValue: 'Pandi Kovil Ring Road, Madurai, Tamil Nadu 625107' },
        { name: 'ukAddress', type: 'text', defaultValue: '3 Northwood Avenue, Purley, London CR8 2ER' },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© 2026 IdentifYou Technologies. All rights reserved.',
    },
  ],
}
