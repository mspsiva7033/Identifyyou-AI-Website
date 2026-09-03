import type { CollectionConfig } from 'payload'

export const ManufacturingSolutions: CollectionConfig = {
  slug: 'manufacturing-solutions',
  labels: {
    singular: 'Manufacturing Solution',
    plural: 'Manufacturing Solutions',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'tagline', 'displayOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Title', required: true },
    { name: 'tagline', type: 'text', label: 'Tagline', required: true },
    { name: 'href', type: 'text', label: 'Link URL', defaultValue: '/case-studies' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    { name: 'imagePlaceholder', type: 'text', label: 'Image Description / Alt', required: true },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured (larger card)',
      defaultValue: false,
    },
    { name: 'displayOrder', type: 'number', label: 'Display Order', defaultValue: 0 },
  ],
}
