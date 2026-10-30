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

      // 3b. Ensure RBAC columns and users_roles table exist (if users table already exists)
      if (usersTableExists) {
        await client.query(`
          ALTER TABLE "users" 
          ADD COLUMN IF NOT EXISTS "name" varchar DEFAULT 'IdentifYou Team Member';
          
          ALTER TABLE "users" 
          ADD COLUMN IF NOT EXISTS "is_active" boolean DEFAULT true;

          DO $$ BEGIN
            CREATE TYPE "public"."enum_users_roles" AS ENUM('superadmin', 'admin', 'editor', 'author', 'lead-manager', 'viewer');
          EXCEPTION
            WHEN duplicate_object THEN null;
          END $$;

          DO $$ BEGIN
            ALTER TYPE "public"."enum_users_roles" ADD VALUE IF NOT EXISTS 'admin';
          EXCEPTION
            WHEN duplicate_object THEN null;
          END $$;

          DO $$ BEGIN
            ALTER TYPE "public"."enum_users_roles" ADD VALUE IF NOT EXISTS 'author';
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

          -- Ownership columns on blogs_and_news
          ALTER TABLE "blogs_and_news" 
          ADD COLUMN IF NOT EXISTS "created_by_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
          ADD COLUMN IF NOT EXISTS "updated_by_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
          ADD COLUMN IF NOT EXISTS "published_by_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
          ADD COLUMN IF NOT EXISTS "author" varchar DEFAULT 'IdentifYou Team';

          ALTER TABLE "_blogs_and_news_v" 
          ADD COLUMN IF NOT EXISTS "version_created_by_id" integer,
          ADD COLUMN IF NOT EXISTS "version_updated_by_id" integer,
          ADD COLUMN IF NOT EXISTS "version_published_by_id" integer,
          ADD COLUMN IF NOT EXISTS "version_author" varchar DEFAULT 'IdentifYou Team';

          -- Ownership columns on case_studies
          ALTER TABLE "case_studies" 
          ADD COLUMN IF NOT EXISTS "created_by_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
          ADD COLUMN IF NOT EXISTS "updated_by_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
          ADD COLUMN IF NOT EXISTS "published_by_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
          ADD COLUMN IF NOT EXISTS "published_at" timestamp with time zone,
          ADD COLUMN IF NOT EXISTS "author" varchar DEFAULT 'IdentifYou Team';

          ALTER TABLE "_case_studies_v" 
          ADD COLUMN IF NOT EXISTS "version_created_by_id" integer,
          ADD COLUMN IF NOT EXISTS "version_updated_by_id" integer,
          ADD COLUMN IF NOT EXISTS "version_published_by_id" integer,
          ADD COLUMN IF NOT EXISTS "version_published_at" timestamp with time zone,
          ADD COLUMN IF NOT EXISTS "version_author" varchar DEFAULT 'IdentifYou Team';

          -- Audit logs table
          DO $$ BEGIN
            CREATE TYPE "public"."enum_audit_logs_action" AS ENUM(
              'create', 'update', 'delete', 'publish', 'unpublish', 
              'user_create', 'user_update', 'user_delete', 'role_change', 'status_change', 'security_denied'
            );
          EXCEPTION
            WHEN duplicate_object THEN null;
          END $$;

          DO $$ BEGIN
            CREATE TYPE "public"."enum_audit_logs_outcome" AS ENUM('success', 'failure');
          EXCEPTION
            WHEN duplicate_object THEN null;
          END $$;

          CREATE TABLE IF NOT EXISTS "audit_logs" (
            "id" serial PRIMARY KEY,
            "timestamp" timestamp with time zone DEFAULT now() NOT NULL,
            "actor_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
            "actor_email" varchar,
            "actor_role" varchar,
            "action" "public"."enum_audit_logs_action" NOT NULL,
            "resource_type" varchar NOT NULL,
            "resource_id" varchar NOT NULL,
            "resource_title" varchar,
            "outcome" "public"."enum_audit_logs_outcome" DEFAULT 'success' NOT NULL,
            "details" jsonb DEFAULT '{}'::jsonb,
            "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
            "created_at" timestamp with time zone DEFAULT now() NOT NULL
          );

          CREATE INDEX IF NOT EXISTS "idx_audit_logs_timestamp" ON "audit_logs" ("timestamp");
          CREATE INDEX IF NOT EXISTS "idx_audit_logs_actor_id" ON "audit_logs" ("actor_id");
          CREATE INDEX IF NOT EXISTS "idx_audit_logs_action" ON "audit_logs" ("action");
          CREATE INDEX IF NOT EXISTS "idx_audit_logs_resource" ON "audit_logs" ("resource_type", "resource_id");

          ALTER TABLE "payload_locked_documents_rels" 
          ADD COLUMN IF NOT EXISTS "leadership_team_id" integer,
          ADD COLUMN IF NOT EXISTS "audit_logs_id" integer;

          ALTER TABLE "payload_preferences_rels" 
          ADD COLUMN IF NOT EXISTS "leadership_team_id" integer,
          ADD COLUMN IF NOT EXISTS "audit_logs_id" integer;

          -- Sync _status with status for published entries
          UPDATE "case_studies" SET "_status" = 'published' WHERE "status" = 'published' AND ("_status" IS NULL OR "_status" != 'published');
          UPDATE "blogs_and_news" SET "_status" = 'published' WHERE "status" = 'published' AND ("_status" IS NULL OR "_status" != 'published');
          UPDATE "_case_studies_v" SET "version__status" = 'published' WHERE "version_status" = 'published' AND ("version__status" IS NULL OR "version__status" != 'published');
          UPDATE "_blogs_and_news_v" SET "version__status" = 'published' WHERE "version_status" = 'published' AND ("version__status" IS NULL OR "version__status" != 'published');
        `)
      }

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

      // 6. Automatically seed leadership team if 0 exist
      try {
        const leadCheck = await payload.find({
          collection: 'leadership-team' as any,
          limit: 1,
        })
        if (!leadCheck.docs || leadCheck.docs.length === 0) {
          console.log('🌱 No leadership team found in database. Automatically seeding leadership team...')
          const { seedLeadership } = await import('./seed_leadership_all')
          if (typeof seedLeadership === 'function') {
            await seedLeadership()
            console.log('✅ Initial leadership team seed completed successfully!')
          }
        }
      } catch (leadErr) {
        console.warn('⚠️ Notice: Leadership auto-seed skipped or encountered a non-fatal error:', leadErr instanceof Error ? leadErr.message : leadErr)
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
