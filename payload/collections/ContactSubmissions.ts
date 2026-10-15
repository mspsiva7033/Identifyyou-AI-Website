import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'
import { sendContactNotification } from '../../lib/email'

const sendEmailHook: CollectionAfterChangeHook = async ({ doc, operation }) => {
  if (operation === 'create') {
    try {
      await sendContactNotification({
        name: doc.name,
        email: doc.email,
        company: doc.company,
        selectedPath: doc.selectedPath,
        message: doc.message,
        utmSource: doc.utmSource,
        utmMedium: doc.utmMedium,
        utmCampaign: doc.utmCampaign,
        utmTerm: doc.utmTerm,
        utmContent: doc.utmContent,
        referrer: doc.referrer,
      })
    } catch (error) {
      console.error('Error sending contact submission notification via Microsoft Graph API:', error)
    }
  }
}

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
  hooks: {
    afterChange: [sendEmailHook],
  },
  fields: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'company', type: 'text', label: 'Company' },
    { name: 'selectedPath', type: 'text', label: 'Selected Area of Interest' },
    { name: 'message', type: 'textarea', label: 'Message' },
    { name: 'utmSource', type: 'text', label: 'UTM Source' },
    { name: 'utmMedium', type: 'text', label: 'UTM Medium' },
    { name: 'utmCampaign', type: 'text', label: 'UTM Campaign' },
    { name: 'utmTerm', type: 'text', label: 'UTM Term' },
    { name: 'utmContent', type: 'text', label: 'UTM Content' },
    { name: 'referrer', type: 'text', label: 'Traffic Referrer' },
  ],
  timestamps: true,
}

