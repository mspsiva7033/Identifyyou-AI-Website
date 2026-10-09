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
  if (!globalThis.__pgPool) {
    const config = getPoolConfig()
    globalThis.__pgPool = new pg.Pool({
      connectionString: config.connectionString,
      ssl: config.ssl,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    })

    globalThis.__pgPool.on('error', (err) => {
      console.error('Unexpected error on idle pg client pool:', err)
    })
  }

  return globalThis.__pgPool
}
