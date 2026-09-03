import type { GlobalConfig } from 'payload'

export const HeaderGlobal: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: {
    group: 'Site Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'logo',
      label: 'Logo',
      fields: [
        { name: 'brandName', type: 'text', label: 'Brand Name', defaultValue: 'IdentifYou' },
        { name: 'tagline', type: 'text', label: 'Tagline', defaultValue: 'Technologies' },
        { name: 'href', type: 'text', label: 'Logo Link', defaultValue: '/' },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'subItems',
          type: 'array',
          label: 'Sub-menu Items',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'ctaButton',
      label: 'CTA Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Talk to an Expert' },
        { name: 'href', type: 'text', defaultValue: '/contact' },
      ],
    },
  ],
}
