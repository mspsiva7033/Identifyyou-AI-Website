import { NextResponse } from 'next/server'
import pg from 'pg'
import { getPoolConfig } from '@/lib/db-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  let client: pg.Client | null = null
  try {
    const poolConfig = getPoolConfig()
    client = new pg.Client({
      connectionString: poolConfig.connectionString,
      ssl: poolConfig.ssl,
      connectionTimeoutMillis: 5000,
    })

    await client.connect()

    // 1. Basic query check
    await client.query('SELECT 1')

    // 2. Schema check: verify that the core 'users' table exists
    const tableRes = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      ) as exists;
    `)

    const schemaReady = tableRes.rows[0]?.exists === true

    await client.end()

    if (!schemaReady) {
      return NextResponse.json(
        {
          status: 'degraded',
          database: 'connected',
          schema: 'pending_migrations',
          message: 'Database is reachable but tables are pending migration.',
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        status: 'ready',
        database: 'connected',
        schema: 'ready',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (err: unknown) {
    if (client) {
      try {
        await client.end()
      } catch {
        // ignore disconnect error
      }
    }

    // Log diagnostic error on server without leaking details to public client
    console.error(
      '[Health Check Error]: Database readiness check failed:',
      err instanceof Error ? err.message : err
    )

    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'disconnected',
        error: 'Database connection failed or timed out',
      },
      { status: 503 }
    )
  }
}
