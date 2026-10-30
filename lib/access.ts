/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Access, FieldAccess } from 'payload'

export type UserRole = 'superadmin' | 'admin' | 'editor' | 'author' | 'lead-manager' | 'viewer'

export const hasRole = (user: any, role: UserRole): boolean => {
  if (!user || user.isActive === false || !user.roles) return false
  if (Array.isArray(user.roles)) {
    return user.roles.includes(role)
  }
  return user.roles === role
}

/**
 * Super Admin: Complete elevated access across all collections and system settings.
 */
export const isSuperAdmin: Access = ({ req: { user } }) => {
  return hasRole(user, 'superadmin')
}

/**
 * Super Admin or Administrator: Allowed to manage users, settings, and delete records.
 */
export const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return hasRole(user, 'superadmin') || hasRole(user, 'admin')
}

/**
 * Editor or Admin: Allowed to create, edit, and publish marketing content.
 */
export const isEditorOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return hasRole(user, 'superadmin') || hasRole(user, 'admin') || hasRole(user, 'editor')
}

/**
 * Content Creation Guard:
 * Super Admins, Admins, Editors, and Authors can create content drafts.
 */
export const canCreateContent: Access = ({ req: { user } }) => {
  if (!user) return false
  return hasRole(user, 'superadmin') || hasRole(user, 'admin') || hasRole(user, 'editor') || hasRole(user, 'author')
}

/**
 * Content Update & Ownership Guard:
 * - Super Admins, Admins, and Editors can edit any record.
 * - Authors can ONLY edit records that they created themselves (createdBy === user.id).
 * - Viewers and unauthorized users cannot edit.
 */
export const canUpdateContent: Access = ({ req: { user } }) => {
  if (!user) return false
  if (hasRole(user, 'superadmin') || hasRole(user, 'admin') || hasRole(user, 'editor')) {
    return true
  }
  if (hasRole(user, 'author')) {
    return {
      createdBy: {
        equals: user.id,
      },
    }
  }
  return false
}

/**
 * Content Deletion Guard:
 * Only Super Admins and Administrators can delete content records.
 */
export const canDeleteContent: Access = ({ req: { user } }) => {
  if (!user) return false
  return hasRole(user, 'superadmin') || hasRole(user, 'admin')
}

/**
 * Lead Manager or Admin: Allowed to view and process incoming client inquiries and leads.
 */
export const canViewLeads: Access = ({ req: { user } }) => {
  if (!user) return false
  return hasRole(user, 'superadmin') || hasRole(user, 'admin') || hasRole(user, 'lead-manager')
}

/**
 * Self or Admin: Allows an authenticated user to read or update their own user profile.
 */
export const isSelfOrAdmin: Access = ({ req: { user } }) => {
  if (!user || user.isActive === false) return false
  if (hasRole(user, 'superadmin') || hasRole(user, 'admin')) return true
  return {
    id: {
      equals: user.id,
    },
  }
}

/**
 * User Creation Guard:
 * Allows creation if user is SuperAdmin or Admin, OR if no users exist in the database (Bootstrap).
 */
export const canCreateUser: Access = async ({ req }) => {
  if (req.user) {
    return hasRole(req.user, 'superadmin') || hasRole(req.user, 'admin')
  }
  try {
    const existing = await req.payload.find({
      collection: 'users',
      limit: 1,
    })
    return existing.totalDocs === 0
  } catch {
    return true
  }
}

/**
 * Admin Panel Access Guard:
 * Blocks deactivated accounts (isActive === false) from logging in or entering the admin portal.
 */
export const isAdminPanelUser = ({ req }: { req: { user?: any } }): boolean => {
  const user = req?.user
  if (!user) return false
  return user.isActive !== false
}

/**
 * Field-level access: Only Super Admin can change sensitive fields (e.g. roles, isActive).
 */
export const isSuperAdminField: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, 'superadmin')
}

