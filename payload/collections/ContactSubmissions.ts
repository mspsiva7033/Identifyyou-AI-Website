import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Contact Submission',
    plural: 'Contact Submissions',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Operations',
    defaultColumns: ['name', 'email', 'selectedPath', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'company', type: 'text', label: 'Company' },
    { name: 'selectedPath', type: 'text', label: 'Selected Area of Interest' },
    { name: 'message', type: 'textarea', label: 'Message' },
  ],
  timestamps: true,
}
