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

async function migrateUsersRBAC() {
  console.log('🔄 Synchronizing PostgreSQL database schema for RBAC Users & Roles...')
  const dbConfig = getDatabaseConfig()
  const client = new pg.Client({
    connectionString: dbConfig.connectionString,
    ssl: dbConfig.ssl,
  })

  await client.connect()

  // 1. Add "name" and "is_active" columns to users
  console.log('1. Adding "name" and "is_active" columns to "users" table...')
  await client.query(`
    ALTER TABLE "users" 
    ADD COLUMN IF NOT EXISTS "name" varchar DEFAULT 'IdentifYou Team Member';
    
    ALTER TABLE "users" 
    ADD COLUMN IF NOT EXISTS "is_active" boolean DEFAULT true;
  `)

  // 2. Create "enum_users_roles" type
  console.log('2. Creating "enum_users_roles" enum...')
  await client.query(`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_users_roles" AS ENUM('superadmin', 'editor', 'lead-manager', 'viewer');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  // 3. Create "users_roles" join table
  console.log('3. Creating "users_roles" table and indexes...')
  await client.query(`
    CREATE TABLE IF NOT EXISTS "users_roles" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
      "value" "public"."enum_users_roles",
      "id" serial PRIMARY KEY
    );

    CREATE INDEX IF NOT EXISTS "users_roles_order_idx" ON "users_roles" ("order");
    CREATE INDEX IF NOT EXISTS "users_roles_parent_id_idx" ON "users_roles" ("parent_id");
  `)

  // 4. Check existing users and assign superadmin role
  console.log('4. Checking existing registered users...')
  const usersRes = await client.query(`SELECT id, email, name FROM "users";`)
  
  if (usersRes.rows.length === 0) {
    console.log('✓ No users exist yet in database. /admin will prompt for First User Setup.')
  } else {
    for (const u of usersRes.rows) {
      const rolesCheck = await client.query(
        `SELECT * FROM "users_roles" WHERE "parent_id" = $1;`,
        [u.id]
      )
      if (rolesCheck.rows.length === 0) {
        console.log(`👑 Promoting existing user [${u.email}] (ID: ${u.id}) to Super Admin...`)
        await client.query(
          `INSERT INTO "users_roles" ("order", "parent_id", "value") VALUES (0, $1, 'superadmin');`,
          [u.id]
        )
      } else {
        const roles = rolesCheck.rows.map((r) => r.value)
        console.log(`User [${u.email}] already has role(s): [${roles.join(', ')}]`)
      }
    }
  }

  await client.end()
  console.log('✅ RBAC schema migration and role synchronization completed successfully!')
}

migrateUsersRBAC().catch((err) => {
  console.error('❌ Migration error:', err)
  process.exit(1)
})
