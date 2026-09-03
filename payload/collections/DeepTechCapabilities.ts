import type { CollectionConfig } from 'payload'

export const DeepTechCapabilities: CollectionConfig = {
  slug: 'deep-tech-capabilities',
  labels: {
    singular: 'Deep Tech Capability',
    plural: 'Deep Tech Capabilities',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['number', 'title', 'displayOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'number', type: 'text', label: 'Number (e.g. 01)', required: true },
    { name: 'title', type: 'text', label: 'Title', required: true },
    { name: 'href', type: 'text', label: 'Page URL', required: true },
    { name: 'linkLabel', type: 'text', label: 'Link Label', required: true },
    { name: 'challenge', type: 'textarea', label: 'Business Challenge', required: true },
    { name: 'solution', type: 'textarea', label: 'Solution', required: true },
    { name: 'deepTech', type: 'text', label: 'Deep Tech', required: true },
    { name: 'tech', type: 'text', label: 'Technology Stack', required: true },
    { name: 'outcome', type: 'textarea', label: 'Outcome', required: true },
    { name: 'displayOrder', type: 'number', label: 'Display Order', defaultValue: 0 },
  ],
}
