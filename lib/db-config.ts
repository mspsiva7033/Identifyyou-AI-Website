import { URL } from 'url'
import type { PoolConfig } from 'pg'
import fs from 'fs'
import path from 'path'

// Ensure .env / .env.local is loaded if DATABASE_URI is not yet in process.env
if (!process.env.DATABASE_URI) {
  for (const envFile of ['.env', '.env.local']) {
    const envPath = path.resolve(process.cwd(), envFile)
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      envContent.split(/\r?\n/).forEach((line) => {
        const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
        if (match && !process.env[match[1].trim()]) {
          process.env[match[1].trim()] = match[2].trim()
        }
      })
      break
    }
  }
}

export interface DatabaseConfigResult {
  connectionString: string
  maskedConnectionString: string
  ssl: boolean | { rejectUnauthorized: boolean }
  host: string
  port: number
  database: string
  user: string
}

/**
 * Validates and normalizes database SSL settings.
 * Accepts: 'true' | 'false' | 'require' | 'disable' | 'allow-unauthorized' | 'no-verify' | boolean | undefined
 */
export function resolveDatabaseSSL(
  sslEnv?: string | boolean,
  host?: string,
  urlSearchParams?: URLSearchParams
): boolean | { rejectUnauthorized: boolean } {
  // 1. Explicit environment variable takes precedence
  if (sslEnv !== undefined && sslEnv !== '') {
    const normalized = String(sslEnv).trim().toLowerCase()
    if (['false', '0', 'disable', 'off', 'no'].includes(normalized)) {
      return false
    }
    if (['true', '1', 'require', 'on', 'yes'].includes(normalized)) {
      // Default to strict certificate verification for hosted databases
      return { rejectUnauthorized: true }
    }
    if (['allow-unauthorized', 'no-verify', 'insecure'].includes(normalized)) {
      return { rejectUnauthorized: false }
    }
    throw new Error(
      `Invalid DATABASE_SSL configuration: "${sslEnv}". ` +
      `Accepted values: "true", "false", "require", "disable", or "allow-unauthorized".`
    )
  }

  // 2. Query parameter check (sslmode)
  if (urlSearchParams) {
    const sslmode = urlSearchParams.get('sslmode')?.toLowerCase()
    if (sslmode === 'disable') {
      return false
    }
    if (sslmode === 'require' || sslmode === 'verify-full' || sslmode === 'verify-ca') {
      return { rejectUnauthorized: true }
    }
    if (sslmode === 'no-verify') {
      return { rejectUnauthorized: false }
    }
  }

  // 3. Fallback based on host heuristics
  if (host) {
    const lowerHost = host.toLowerCase()
    const isLocalOrContainer =
      lowerHost === 'localhost' ||
      lowerHost === '127.0.0.1' ||
      lowerHost === '::1' ||
      lowerHost === 'postgres' ||
      lowerHost === 'identifyyou_db' ||
      lowerHost.endsWith('.internal') ||
      lowerHost.endsWith('.local')

    if (isLocalOrContainer) {
      return false
    }

    // Hosted cloud providers require SSL by default
    const isHostedCloud =
      lowerHost.includes('supabase.co') ||
      lowerHost.includes('supabase.com') ||
      lowerHost.includes('neon.tech') ||
      lowerHost.includes('render.com') ||
      lowerHost.includes('aws.com') ||
      lowerHost.includes('azure.com') ||
      lowerHost.includes('elephantsql.com')

    if (isHostedCloud) {
      // Certificate validation remains enabled by default for secure hosted connections
      const rejectUnauth = process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false'
      return { rejectUnauthorized: rejectUnauth }
    }
  }

  return false
}

/**
 * Masks credentials in connection strings for safe logging
 */
export function maskConnectionString(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl)
    if (parsed.password) {
      parsed.password = '****'
    }
    return parsed.toString()
  } catch {
    // If not standard URL, regex mask
    return rawUrl.replace(/:([^:@/]+)@/, ':****@')
  }
}

/**
 * Validates, encodes, and resolves PostgreSQL connection options and connection string
 */
export function getDatabaseConfig(): DatabaseConfigResult {
  let connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL || ''

  // If no direct URI but discrete variables exist, build connection string safely
  if (!connectionString && (process.env.POSTGRES_USER || process.env.POSTGRES_PASSWORD)) {
    const user = encodeURIComponent(process.env.POSTGRES_USER || 'postgres')
    const pass = encodeURIComponent(process.env.POSTGRES_PASSWORD || '')
    const host = process.env.POSTGRES_HOST || 'localhost'
    const port = process.env.POSTGRES_PORT || '5432'
    const db = process.env.POSTGRES_DB || 'identifyyou'

    connectionString = `postgresql://${user}:${pass}@${host}:${port}/${db}`
  }

  if (!connectionString) {
    connectionString = 'postgresql://postgres:password@localhost:5432/identifyyou'
  }

  // Validate the connection string syntax
  let parsed: URL
  try {
    parsed = new URL(connectionString)
  } catch (err) {
    throw new Error(
      `Invalid database connection string: "${maskConnectionString(connectionString)}". ` +
      `Must be a valid URI starting with postgresql:// or postgres://.`
    )
  }

  if (parsed.protocol !== 'postgresql:' && parsed.protocol !== 'postgres:') {
    throw new Error(
      `Unsupported database protocol "${parsed.protocol}". Expected "postgresql:" or "postgres:".`
    )
  }

  // Detect and reject invalid hostnames like 'base' or empty hosts
  const host = parsed.hostname
  if (!host || host === 'base') {
    throw new Error(
      `Invalid database host "${host}". Please verify your DATABASE_URI in .env. ` +
      `If using Docker Compose, the internal database hostname is "postgres". ` +
      `If running locally or via PM2, use "127.0.0.1" or "localhost".`
    )
  }

  const database = parsed.pathname.replace(/^\//, '') || 'identifyyou'
  const port = parseInt(parsed.port || '5432', 10)
  const user = decodeURIComponent(parsed.username || '')

  const ssl = resolveDatabaseSSL(process.env.DATABASE_SSL, host, parsed.searchParams)
  const maskedConnectionString = maskConnectionString(connectionString)

  return {
    connectionString,
    maskedConnectionString,
    ssl,
    host,
    port,
    database,
    user,
  }
}

/**
 * Creates pg.Pool config object
 */
export function getPoolConfig(): PoolConfig {
  const config = getDatabaseConfig()
  return {
    connectionString: config.connectionString,
    ssl: config.ssl,
  }
}
