import type { CollectionConfig } from 'payload'
import { hasRole } from '../../lib/access'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  labels: {
    singular: 'Audit Log',
    plural: 'Audit Logs',
  },
  admin: {
    useAsTitle: 'action',
    group: 'Administration',
    defaultColumns: ['timestamp', 'action', 'resourceType', 'resourceTitle', 'actorEmail', 'outcome'],
    hidden: ({ user }) => !hasRole(user, 'superadmin') && !hasRole(user, 'admin'),
  },
  access: {
    // Only Super Admins and Administrators can inspect audit logs
    read: ({ req: { user } }) => hasRole(user, 'superadmin') || hasRole(user, 'admin'),
    // Immutable audit trail: direct API creation, editing, or deletion is completely forbidden
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'timestamp',
      type: 'date',
      label: 'Timestamp (UTC)',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'action',
      type: 'select',
      label: 'Action Taken',
      required: true,
      options: [
        { label: 'Content Created', value: 'create' },
        { label: 'Content Updated', value: 'update' },
        { label: 'Content Deleted', value: 'delete' },
        { label: 'Content Published', value: 'publish' },
        { label: 'Content Unpublished', value: 'unpublish' },
        { label: 'User Created', value: 'user_create' },
        { label: 'User Updated', value: 'user_update' },
        { label: 'User Deleted', value: 'user_delete' },
        { label: 'Role Changed', value: 'role_change' },
        { label: 'Status Changed', value: 'status_change' },
        { label: 'Security Access Denied', value: 'security_denied' },
      ],
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'users',
      label: 'Acting User',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'actorEmail',
      type: 'text',
      label: 'Actor Email',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'actorRole',
      type: 'text',
      label: 'Actor Role',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'resourceType',
      type: 'text',
      label: 'Resource Type',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'resourceId',
      type: 'text',
      label: 'Resource ID',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'resourceTitle',
      type: 'text',
      label: 'Resource Title / Reference',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'outcome',
      type: 'select',
      label: 'Outcome',
      defaultValue: 'success',
      options: [
        { label: 'Success', value: 'success' },
        { label: 'Failure', value: 'failure' },
      ],
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'details',
      type: 'json',
      label: 'Event Details & Diff Snapshot',
      admin: {
        readOnly: true,
      },
    },
  ],
}
