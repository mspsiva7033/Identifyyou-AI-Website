/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Payload } from 'payload'

export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'publish'
  | 'unpublish'
  | 'user_create'
  | 'user_update'
  | 'user_delete'
  | 'role_change'
  | 'status_change'
  | 'security_denied'

export interface LogAuditParams {
  payload: Payload
  actor?: {
    id?: number | string
    email?: string
    roles?: string[] | string
    name?: string
  } | null
  action: AuditAction
  resourceType: string
  resourceId: string | number
  resourceTitle?: string
  outcome?: 'success' | 'failure'
  details?: Record<string, any>
}

/**
 * Server-side audit event logging service.
 * Inserts an immutable audit record directly into the audit_logs collection.
 */
export async function logAuditEvent({
  payload,
  actor,
  action,
  resourceType,
  resourceId,
  resourceTitle,
  outcome = 'success',
  details = {},
}: LogAuditParams): Promise<void> {
  try {
    const actorRole = Array.isArray(actor?.roles) ? actor.roles.join(', ') : (actor?.roles || 'anonymous')
    const actorId = actor?.id ? Number(actor.id) : undefined

    await payload.create({
      collection: 'audit-logs' as any,
      data: {
        timestamp: new Date().toISOString(),
        actor: actorId || null,
        actorEmail: actor?.email || 'system / anonymous',
        actorRole: actorRole || 'none',
        action,
        resourceType,
        resourceId: String(resourceId),
        resourceTitle: resourceTitle || `Record #${resourceId}`,
        outcome,
        details,
      } as any,
      overrideAccess: true, // Internal server audit writer
    })
  } catch (err) {
    // Audit logging should never crash the main transaction, but log clearly for security auditing
    console.error(`⚠️ [AUDIT LOG ERROR] Failed to record audit log for action ${action} on ${resourceType}:`, err)
  }
}
