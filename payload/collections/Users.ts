import type { CollectionConfig } from 'payload'
import {
  isSuperAdmin,
  isSelfOrAdmin,
  canCreateUser,
  isAdminPanelUser,
  isSuperAdminField,
  hasRole,
} from '../../lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  auth: {
    tokenExpiration: 7200, // 2 hours
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes lockout on brute-force
  },
  admin: {
    useAsTitle: 'name',
    group: 'Administration',
    defaultColumns: ['name', 'email', 'roles', 'isActive'],
    hidden: ({ user }) => !hasRole(user, 'superadmin'),
  },
  access: {
    admin: isAdminPanelUser,
    read: isSelfOrAdmin,
    create: canCreateUser,
    update: isSelfOrAdmin,
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
      admin: {
        placeholder: 'e.g. John Doe',
      },
    },
    {
      name: 'roles',
      type: 'select',
      label: 'Assigned Roles',
      hasMany: true,
      required: true,
      options: [
        { label: 'Super Admin', value: 'superadmin' },
        { label: 'Content Editor', value: 'editor' },
        { label: 'Lead Manager (Sales)', value: 'lead-manager' },
        { label: 'Read-only Viewer', value: 'viewer' },
      ],
      access: {
        update: isSuperAdminField,
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active Status',
      defaultValue: true,
      admin: {
        description: 'Uncheck to immediately block login access without deleting historical references.',
      },
      access: {
        update: isSuperAdminField,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Automatically make the very first user a Super Admin during setup
        if (operation === 'create') {
          try {
            const count = await req.payload.count({ collection: 'users' })
            if (count.totalDocs === 0) {
              data.roles = ['superadmin']
            }
          } catch {
            // Fallback: keep existing data.roles
          }
        }
        return data
      },
    ],
    beforeValidate: [
      ({ data, operation }) => {
        // Enforce corporate email domain in production environment
        if (process.env.NODE_ENV === 'production' && operation === 'create' && data?.email) {
          const allowedDomains = ['@identifyyou.in', '@identifyyou.com']
          const isValid = allowedDomains.some((domain) => data.email.toLowerCase().endsWith(domain))
          if (!isValid) {
            throw new Error('Only official corporate email addresses (@identifyyou.in or @identifyyou.com) are permitted.')
          }
        }
        return data
      },
    ],
  },
}
