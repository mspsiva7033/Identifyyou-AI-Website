import { NextResponse } from 'next/server'
import { getDatabaseConfig } from '@/lib/db-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  const envCheck = {
    hasDatabaseUri: Boolean(process.env.DATABASE_URI || process.env.DATABASE_URL),
    hasPayloadSecret: Boolean(process.env.PAYLOAD_SECRET && process.env.PAYLOAD_SECRET.length >= 32),
    hasServerUrl: Boolean(process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL),
    nodeEnv: process.env.NODE_ENV || 'development',
  }

  let dbValid = false
  try {
    getDatabaseConfig()
    dbValid = true
  } catch {
    dbValid = false
  }

  const allPassed = envCheck.hasPayloadSecret && dbValid

  return NextResponse.json(
    {
      status: allPassed ? 'healthy' : 'degraded',
      environment: envCheck.nodeEnv,
      checks: {
        envConfig: allPassed,
        databaseConfig: dbValid,
        secretConfig: envCheck.hasPayloadSecret,
      },
      timestamp: new Date().toISOString(),
    },
    { status: allPassed ? 200 : 500 }
  )
}
