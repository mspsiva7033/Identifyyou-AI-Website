import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'
import {
  isSuperAdmin,
  isSelfOrAdmin,
  canCreateUser,
  isAdminPanelUser,
  isSuperAdminField,
  hasRole,
} from '../../lib/access'
import { logAuditEvent } from '../../lib/audit'

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
    hidden: ({ user }) => !hasRole(user, 'superadmin') && !hasRole(user, 'admin'),
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
        { label: 'Administrator', value: 'admin' },
        { label: 'Content Editor', value: 'editor' },
        { label: 'Content Author', value: 'author' },
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
    afterChange: [
      async ({ doc, req, operation, previousDoc }) => {
        // Audit log user events
        if (operation === 'create') {
          await logAuditEvent({
            payload: req.payload,
            actor: req.user,
            action: 'user_create',
            resourceType: 'users',
            resourceId: doc.id,
            resourceTitle: doc.name || doc.email,
            outcome: 'success',
            details: {
              email: doc.email,
              roles: doc.roles,
              isActive: doc.isActive,
            },
          })
        } else if (operation === 'update') {
          const roleChanged = JSON.stringify(previousDoc?.roles) !== JSON.stringify(doc.roles)
          const statusChanged = previousDoc?.isActive !== doc.isActive

          if (roleChanged) {
            await logAuditEvent({
              payload: req.payload,
              actor: req.user,
              action: 'role_change',
              resourceType: 'users',
              resourceId: doc.id,
              resourceTitle: doc.name || doc.email,
              outcome: 'success',
              details: {
                previousRoles: previousDoc?.roles,
                newRoles: doc.roles,
              },
            })
          }

          if (statusChanged) {
            await logAuditEvent({
              payload: req.payload,
              actor: req.user,
              action: 'status_change',
              resourceType: 'users',
              resourceId: doc.id,
              resourceTitle: doc.name || doc.email,
              outcome: 'success',
              details: {
                previousStatus: previousDoc?.isActive,
                newStatus: doc.isActive,
              },
            })
          }

          await logAuditEvent({
            payload: req.payload,
            actor: req.user,
            action: 'user_update',
            resourceType: 'users',
            resourceId: doc.id,
            resourceTitle: doc.name || doc.email,
            outcome: 'success',
            details: {
              updatedFields: Object.keys(doc).filter(k => previousDoc && doc[k] !== previousDoc[k]),
            },
          })
        }
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        await logAuditEvent({
          payload: req.payload,
          actor: req.user,
          action: 'user_delete',
          resourceType: 'users',
          resourceId: doc.id,
          resourceTitle: doc.name || doc.email,
          outcome: 'success',
          details: {
            deletedEmail: doc.email,
          },
        })
      },
    ],
    beforeLogin: [
      ({ user }) => {
        if (user && user.isActive === false) {
          throw new APIError('This account has been deactivated. Please contact an administrator.', 401)
        }
        return user
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
