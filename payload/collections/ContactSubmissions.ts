import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'
import nodemailer from 'nodemailer'

const sendEmailHook: CollectionAfterChangeHook = async ({ doc, operation }) => {
  if (operation === 'create') {
    const { name, email, company, selectedPath, message } = doc

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_EMAIL_TO) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        const mailOptions = {
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL_TO,
          subject: `New Contact Submission from ${name}`,
          text: `
You have received a new contact submission:

Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Selected Path: ${selectedPath || 'N/A'}
Message:
${message || 'N/A'}
          `,
        }

        await transporter.sendMail(mailOptions)
        console.log(`Email successfully sent for contact submission from ${email}`)
      } catch (error) {
        console.error('Error sending contact submission email:', error)
      }
    } else {
      console.warn('SMTP credentials or CONTACT_EMAIL_TO not configured. Skipping email notification.')
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

