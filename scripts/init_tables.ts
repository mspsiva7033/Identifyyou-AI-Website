import path from 'path'
import fs from 'fs'
import pg from 'pg'

// Load .env or .env.local if DATABASE_URI is missing
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

// Ensure production mode is active for table initialization and migration checks
if (!process.env.NODE_ENV) {
  ;(process.env as Record<string, string | undefined>).NODE_ENV = 'production'
}

import { getPayload } from 'payload'
import config from '../payload.config'
import { getDatabaseConfig } from '../lib/db-config'

async function syncAndInitTables() {
  let dbConfig
  try {
    dbConfig = getDatabaseConfig()
    console.log(`📦 Connecting to database: ${dbConfig.maskedConnectionString} (SSL: ${JSON.stringify(dbConfig.ssl)})`)
  } catch (err) {
    console.error('❌ Database configuration error:', err instanceof Error ? err.message : err)
    process.exit(1)
  }

  console.log('📦 Verifying PostgreSQL database tables & baseline migrations...')

  let attempts = 0
  const maxAttempts = 10

  while (attempts < maxAttempts) {
    attempts++
    let client: pg.Client | null = null
    try {
      client = new pg.Client({
        connectionString: dbConfig.connectionString,
        ssl: dbConfig.ssl,
        connectionTimeoutMillis: 10000,
      })

      await client.connect()

      // 1. Check if core tables already exist
      const tablesRes = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'users';
      `)
      const usersTableExists = tablesRes.rows.length > 0

      // 2. Check if payload_migrations table exists
      const migTableRes = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'payload_migrations';
      `)
      const migTableExists = migTableRes.rows.length > 0

      // 3. Baseline synchronization for existing databases
      if (usersTableExists && migTableExists) {
        const devMigRes = await client.query(`
          SELECT * FROM "payload_migrations" WHERE batch = -1 OR batch = '-1';
        `)
        if (devMigRes.rows.length > 0) {
          console.log('🔄 Detected existing tables with dev baseline. Synchronizing migration state without data loss...')
          const initialMigRes = await client.query(`
            SELECT * FROM "payload_migrations" WHERE name = '20261009_073758_initial';
          `)
          if (initialMigRes.rows.length === 0) {
            await client.query(`
              INSERT INTO "payload_migrations" (name, batch, created_at, updated_at)
              VALUES ('20261009_073758_initial', 1, NOW(), NOW());
            `)
          }
          await client.query(`
            DELETE FROM "payload_migrations" WHERE batch = -1 OR batch = '-1';
          `)
          console.log('✅ Migration baseline synchronized successfully.')
        }
      }

      // 3b. Ensure RBAC columns and users_roles table exist
      await client.query(`
        ALTER TABLE "users" 
        ADD COLUMN IF NOT EXISTS "name" varchar DEFAULT 'IdentifYou Team Member';
        
        ALTER TABLE "users" 
        ADD COLUMN IF NOT EXISTS "is_active" boolean DEFAULT true;

        DO $$ BEGIN
          CREATE TYPE "public"."enum_users_roles" AS ENUM('superadmin', 'editor', 'lead-manager', 'viewer');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;

        CREATE TABLE IF NOT EXISTS "users_roles" (
          "order" integer NOT NULL,
          "parent_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
          "value" "public"."enum_users_roles",
          "id" serial PRIMARY KEY
        );

        CREATE INDEX IF NOT EXISTS "users_roles_order_idx" ON "users_roles" ("order");
        CREATE INDEX IF NOT EXISTS "users_roles_parent_id_idx" ON "users_roles" ("parent_id");
      `)

      await client.end()
      client = null

      // 4. Initialize Payload CMS (applies any pending migrations automatically)
      const payload = await getPayload({ config })
      if (typeof payload.db.migrate === 'function') {
        await payload.db.migrate()
      }

      console.log('✅ PostgreSQL database tables and migrations verified successfully!')

      // 5. Automatically seed initial case studies if the database has 0 case studies
      try {
        const csCheck = await payload.find({
          collection: 'case-studies',
          limit: 1,
        })
        if (!csCheck.docs || csCheck.docs.length === 0) {
          console.log('🌱 No case studies found in database. Automatically seeding initial case studies...')
          const { seed } = await import('./seed')
          await seed()
          console.log('✅ Initial database seed completed successfully!')
        }
      } catch (seedErr) {
        console.warn('⚠️ Notice: Auto-seed skipped or encountered a non-fatal error:', seedErr instanceof Error ? seedErr.message : seedErr)
      }

      process.exit(0)
    } catch (err: unknown) {
      if (client) {
        try {
          await client.end()
        } catch {
          // ignore error
        }
      }

      const message = err instanceof Error ? err.message : String(err)
      if (attempts < maxAttempts) {
        console.warn(`⏳ Waiting for PostgreSQL to be ready (attempt ${attempts}/${maxAttempts}): ${message}`)
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } else {
        console.error('❌ Failed to initialize database tables after max attempts:', err)
        process.exit(1)
      }
    }
  }
}

syncAndInitTables()
