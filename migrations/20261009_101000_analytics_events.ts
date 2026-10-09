import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "analytics_events" CASCADE;
  `)
}
