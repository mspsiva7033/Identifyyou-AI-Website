import pg from 'pg'
import { getPoolConfig } from './db-config'

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: pg.Pool | undefined
}

/**
 * Returns a singleton pg.Pool instance for direct SQL queries in Next.js
 */
export function getDbPool(): pg.Pool {
  const config = getPoolConfig()
  const connStr = config.connectionString || ''
  const poolKey = `${connStr}::${JSON.stringify(config.ssl)}`
  
  if (!globalThis.__pgPool || (globalThis as any).__lastPoolKey !== poolKey) {
    if (globalThis.__pgPool) {
      try { globalThis.__pgPool.end() } catch {}
    }
    const host = connStr.split('@')[1]?.split('/')[0] || 'localhost'
    console.log(`[DB Pool] Initializing pool for host: ${host}`)
    globalThis.__pgPool = new pg.Pool({
      connectionString: connStr,
      ssl: config.ssl,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    })
    ;(globalThis as any).__lastPoolKey = poolKey

    globalThis.__pgPool.on('error', (err) => {
      console.warn('[DB Pool Warning] Background idle connection issue:', (err as any)?.message || err)
    })
  }

  return globalThis.__pgPool
}
