import fs from 'fs'
import path from 'path'
import pg from 'pg'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
    if (match) process.env[match[1].trim()] = match[2].trim()
  })
}

import { getPoolConfig } from '../lib/db-config'

async function run() {
  const poolConfig = getPoolConfig()
  console.log('Connecting with SSL:', JSON.stringify(poolConfig.ssl))
  const client = new pg.Client({
    connectionString: poolConfig.connectionString,
    ssl: poolConfig.ssl,
  })
  await client.connect()
  const dbInfo = await client.query('SELECT current_database(), current_schema()')
  console.log('Current DB / Schema:', dbInfo.rows[0])

  console.log('Ensuring analytics_events table exists...')
  await client.query(`
    CREATE TABLE IF NOT EXISTS "analytics_events" (
      "id" bigserial PRIMARY KEY NOT NULL,
      "event_name" varchar(100) NOT NULL DEFAULT 'pageview',
      "path" text NOT NULL,
      "title" text,
      "referrer" text,
      "visitor_id" varchar(64) NOT NULL,
      "session_id" varchar(64),
      "device_category" varchar(20) DEFAULT 'desktop',
      "browser" varchar(50) DEFAULT 'Other',
      "os" varchar(50) DEFAULT 'Other',
      "country" varchar(100) DEFAULT 'Direct / Unknown',
      "city" varchar(100),
      "utm_source" varchar(100),
      "utm_medium" varchar(100),
      "utm_campaign" varchar(100),
      "utm_term" varchar(100),
      "utm_content" varchar(100),
      "metadata" jsonb DEFAULT '{}'::jsonb,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "idx_analytics_created_at" ON "analytics_events" ("created_at");
    CREATE INDEX IF NOT EXISTS "idx_analytics_event_name" ON "analytics_events" ("event_name");
    CREATE INDEX IF NOT EXISTS "idx_analytics_path" ON "analytics_events" ("path");
    CREATE INDEX IF NOT EXISTS "idx_analytics_visitor_id" ON "analytics_events" ("visitor_id");
    CREATE INDEX IF NOT EXISTS "idx_analytics_session_id" ON "analytics_events" ("session_id");
  `)

  // Register in payload_migrations if exists
  const migCheck = await client.query("SELECT * FROM payload_migrations WHERE name = '20261009_101000_analytics_events'")
  if (migCheck.rows.length === 0) {
    await client.query(`
      INSERT INTO payload_migrations (name, batch, created_at, updated_at)
      VALUES ('20261009_101000_analytics_events', 1, NOW(), NOW())
    `)
  }

  console.log('✅ analytics_events table created and indexed successfully!')
  await client.end()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
