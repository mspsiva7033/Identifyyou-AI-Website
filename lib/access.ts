import type { Access, FieldAccess } from 'payload'

export type UserRole = 'superadmin' | 'editor' | 'lead-manager' | 'viewer'

export const hasRole = (user: any, role: UserRole): boolean => {
  if (!user || !user.roles) return false
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
 * Editor or Admin: Allowed to create, edit, and publish marketing content (Blogs, Case Studies, Media).
 */
export const isEditorOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return hasRole(user, 'superadmin') || hasRole(user, 'editor')
}

/**
 * Lead Manager or Admin: Allowed to view and process incoming client inquiries and leads.
 */
export const canViewLeads: Access = ({ req: { user } }) => {
  if (!user) return false
  return hasRole(user, 'superadmin') || hasRole(user, 'lead-manager')
}

/**
 * Self or Super Admin: Allows an authenticated user to read or update their own user profile.
 */
export const isSelfOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  if (hasRole(user, 'superadmin')) return true
  return {
    id: {
      equals: user.id,
    },
  }
}

/**
 * User Creation Guard:
 * Allows creation if user is SuperAdmin, OR if no users exist in the database (First User Setup Bootstrap).
 */
export const canCreateUser: Access = async ({ req }) => {
  if (req.user) {
    return hasRole(req.user, 'superadmin')
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
