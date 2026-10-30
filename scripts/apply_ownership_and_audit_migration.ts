import pg from 'pg'
import path from 'path'
import fs from 'fs'

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

import { getDatabaseConfig } from '../lib/db-config'

async function runMigration() {
  console.log('🔄 Running Ownership and Audit Logs PostgreSQL schema updates...')
  const dbConfig = getDatabaseConfig()
  const client = new pg.Client({
    connectionString: dbConfig.connectionString,
    ssl: dbConfig.ssl,
  })

  await client.connect()

  // 1. Update enum_users_roles to include admin and author
  console.log('1. Updating enum_users_roles...')
  await client.query(`
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
  `)

  // 2. Add ownership columns to blogs_and_news
  console.log('2. Adding ownership columns to blogs_and_news...')
  await client.query(`
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
  `)

  // 3. Add ownership columns to case_studies
  console.log('3. Adding ownership columns to case_studies...')
  await client.query(`
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
  `)

  // 4. Create audit_logs table
  console.log('4. Creating audit_logs table...')
  await client.query(`
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
    ADD COLUMN IF NOT EXISTS "audit_logs_id" integer;

    ALTER TABLE "payload_preferences_rels" 
    ADD COLUMN IF NOT EXISTS "audit_logs_id" integer;
  `)

  await client.end()
  console.log('✅ PostgreSQL Ownership & Audit Logs migration finished successfully!')
}

runMigration().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
