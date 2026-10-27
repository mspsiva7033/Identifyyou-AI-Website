import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin, isSuperAdmin } from '../../lib/access'

export const LeadershipTeam: CollectionConfig = {
  slug: 'leadership-team',
  labels: {
    singular: 'Leadership Member',
    plural: 'Leadership Team',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'role', 'category', 'displayOrder', 'status'],
  },
  access: {
    read: () => true,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'Designation / Title',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Leadership Category',
      defaultValue: 'Executive Leadership',
      options: [
        { label: 'Executive Leadership', value: 'Executive Leadership' },
        { label: 'Technology & Operations', value: 'Technology & Operations' },
        { label: 'Data & AI Engineering', value: 'Data & AI Engineering' },
        { label: 'Digital Engineering', value: 'Digital Engineering' },
        { label: 'Industrial Automation & IIOT', value: 'Industrial Automation & IIOT' },
        { label: 'Advisory Board', value: 'Advisory Board' },
      ],
      admin: {
        description: 'Category / Department for this team member',
      },
    },
    {
      name: 'experience',
      type: 'text',
      label: 'Prior Experience / Credential',
      admin: {
        placeholder: 'e.g. Ex Honeywell, JCI, TCS, Infosys or Stanford Certified ML Professional',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Member Photo / Headshot',
      admin: {
        description: 'Upload a portrait photo. Recommended aspect ratio 4:5 or 1:1 square.',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Display Order',
      defaultValue: 1,
      admin: {
        description: 'Order in which this person appears on the About page (1, 2, 3...)',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Publication Status',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
