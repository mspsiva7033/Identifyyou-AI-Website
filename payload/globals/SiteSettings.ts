import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Site Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'siteName', type: 'text', label: 'Site Name', defaultValue: 'IdentifYou Technologies' },
    { name: 'defaultSEOTitle', type: 'text', label: 'Default SEO Title', defaultValue: 'IdentifYou Technologies — Deep Tech. Built Around Business.' },
    { name: 'defaultSEODescription', type: 'textarea', label: 'Default SEO Description', defaultValue: 'AI-powered solutions for intelligent manufacturing, connected industries and smarter businesses. Vision AI, Industry Automation, Data Engineering and Digital Engineering.' },
    { name: 'favicon', type: 'upload', relationTo: 'media', label: 'Favicon' },
    { name: 'socialImage', type: 'upload', relationTo: 'media', label: 'Default Social Sharing Image' },
    { name: 'contactEmail', type: 'email', defaultValue: 'Support@identifyyou.in' },
    { name: 'contactPhone', type: 'text', defaultValue: '+91 9597046682' },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
          ],
          required: true,
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
