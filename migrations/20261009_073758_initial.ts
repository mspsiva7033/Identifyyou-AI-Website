import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_case_studies_doc_items_type" AS ENUM('p', 'h2', 'h3', 'h4', 'bullet', 'image');
  CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_case_studies_template" AS ENUM('classic', 'tech-deep-dive', 'visual-showcase', 'executive-brief');
  CREATE TYPE "public"."enum__case_studies_v_version_doc_items_type" AS ENUM('p', 'h2', 'h3', 'h4', 'bullet', 'image');
  CREATE TYPE "public"."enum__case_studies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__case_studies_v_version_template" AS ENUM('classic', 'tech-deep-dive', 'visual-showcase', 'executive-brief');
  CREATE TYPE "public"."enum_blogs_and_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_blogs_and_news_category" AS ENUM('Vision AI & Quality', 'Industrial Automation', 'Data Engineering', 'Digital Engineering', 'Industry Insights');
  CREATE TYPE "public"."enum__blogs_and_news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blogs_and_news_v_version_category" AS ENUM('Vision AI & Quality', 'Industrial Automation', 'Data Engineering', 'Digital Engineering', 'Industry Insights');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('linkedin', 'twitter', 'youtube');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "case_study_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"display_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "case_studies_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "case_studies_filter_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "case_studies_doc_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_case_studies_doc_items_type",
  	"text" varchar,
  	"src" varchar,
  	"alt" varchar
  );
  
  CREATE TABLE "case_studies_detail_challenges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "case_studies_detail_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stat" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "case_studies_detail_solution_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"challenge" varchar,
  	"solution" varchar,
  	"outcome" varchar
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_case_studies_status" DEFAULT 'draft',
  	"template" "enum_case_studies_template" DEFAULT 'classic',
  	"display_order" numeric DEFAULT 0,
  	"title" varchar,
  	"slug" varchar,
  	"category_id" integer,
  	"summary_challenge" varchar,
  	"summary_objective" varchar,
  	"summary_solution" varchar,
  	"summary_deep_tech" varchar,
  	"summary_tech" varchar,
  	"summary_integration" varchar,
  	"summary_outcome" varchar,
  	"comparison_table" jsonb,
  	"table_block" jsonb,
  	"custom_c_t_a" jsonb,
  	"detail_short_description" varchar,
  	"detail_overview" jsonb,
  	"detail_technology_used" varchar,
  	"detail_hero_image_id" integer,
  	"detail_thumbnail_id" integer,
  	"client" varchar,
  	"industry" varchar,
  	"project_date" timestamp(3) with time zone,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_case_studies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "case_studies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "_case_studies_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_filter_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_doc_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__case_studies_v_version_doc_items_type",
  	"text" varchar,
  	"src" varchar,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_detail_challenges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_detail_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stat" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_detail_solution_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"challenge" varchar,
  	"solution" varchar,
  	"outcome" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_status" "enum__case_studies_v_version_status" DEFAULT 'draft',
  	"version_template" "enum__case_studies_v_version_template" DEFAULT 'classic',
  	"version_display_order" numeric DEFAULT 0,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category_id" integer,
  	"version_summary_challenge" varchar,
  	"version_summary_objective" varchar,
  	"version_summary_solution" varchar,
  	"version_summary_deep_tech" varchar,
  	"version_summary_tech" varchar,
  	"version_summary_integration" varchar,
  	"version_summary_outcome" varchar,
  	"version_comparison_table" jsonb,
  	"version_table_block" jsonb,
  	"version_custom_c_t_a" jsonb,
  	"version_detail_short_description" varchar,
  	"version_detail_overview" jsonb,
  	"version_detail_technology_used" varchar,
  	"version_detail_hero_image_id" integer,
  	"version_detail_thumbnail_id" integer,
  	"version_client" varchar,
  	"version_industry" varchar,
  	"version_project_date" timestamp(3) with time zone,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__case_studies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_case_studies_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "manufacturing_solutions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"href" varchar DEFAULT '/case-studies',
  	"image_id" integer,
  	"image_placeholder" varchar NOT NULL,
  	"featured" boolean DEFAULT false,
  	"display_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "deep_tech_capabilities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"link_label" varchar NOT NULL,
  	"challenge" varchar NOT NULL,
  	"solution" varchar NOT NULL,
  	"deep_tech" varchar NOT NULL,
  	"tech" varchar NOT NULL,
  	"outcome" varchar NOT NULL,
  	"display_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"company" varchar,
  	"selected_path" varchar,
  	"message" varchar,
  	"utm_source" varchar,
  	"utm_medium" varchar,
  	"utm_campaign" varchar,
  	"utm_term" varchar,
  	"utm_content" varchar,
  	"referrer" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blogs_and_news_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar
  );
  
  CREATE TABLE "blogs_and_news_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "blogs_and_news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_blogs_and_news_status" DEFAULT 'published',
  	"published_at" timestamp(3) with time zone,
  	"read_time" varchar DEFAULT '5 min read',
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_blogs_and_news_category" DEFAULT 'Vision AI & Quality',
  	"excerpt" varchar,
  	"featured_image_id" integer,
  	"overview" varchar,
  	"topics" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blogs_and_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_blogs_and_news_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blogs_and_news_v_version_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blogs_and_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_status" "enum__blogs_and_news_v_version_status" DEFAULT 'published',
  	"version_published_at" timestamp(3) with time zone,
  	"version_read_time" varchar DEFAULT '5 min read',
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__blogs_and_news_v_version_category" DEFAULT 'Vision AI & Quality',
  	"version_excerpt" varchar,
  	"version_featured_image_id" integer,
  	"version_overview" varchar,
  	"version_topics" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blogs_and_news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"case_study_categories_id" integer,
  	"case_studies_id" integer,
  	"manufacturing_solutions_id" integer,
  	"deep_tech_capabilities_id" integer,
  	"contact_submissions_id" integer,
  	"blogs_and_news_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_brand_name" varchar DEFAULT 'IdentifYou',
  	"logo_tagline" varchar DEFAULT 'Technologies',
  	"logo_href" varchar DEFAULT '/',
  	"cta_button_label" varchar DEFAULT 'Talk to an Expert',
  	"cta_button_href" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'IdentifYou Technologies',
  	"brand_tagline" varchar DEFAULT 'Deep Tech. Built Around Business.',
  	"contact_email" varchar DEFAULT 'ai.support@identifyyou.in',
  	"contact_phone" varchar DEFAULT '+91 9597046682',
  	"contact_india_address" varchar DEFAULT 'Pandi Kovil Ring Road, Madurai, Tamil Nadu 625107',
  	"contact_uk_address" varchar DEFAULT '3 Northwood Avenue, Purley, London CR8 2ER',
  	"copyright" varchar DEFAULT '© 2026 IdentifYou Technologies. All rights reserved.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'IdentifYou Technologies',
  	"default_s_e_o_title" varchar DEFAULT 'IdentifYou Technologies — Deep Tech. Built Around Business.',
  	"default_s_e_o_description" varchar DEFAULT 'AI-powered solutions for intelligent manufacturing, connected industries and smarter businesses. Vision AI, Industry Automation, Data Engineering and Digital Engineering.',
  	"favicon_id" integer,
  	"social_image_id" integer,
  	"contact_email" varchar DEFAULT 'ai.support@identifyyou.in',
  	"contact_phone" varchar DEFAULT '+91 9597046682',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_data_ai_sees_think_acts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"flow" varchar NOT NULL,
  	"image_id" integer,
  	"image_placeholder" varchar
  );
  
  CREATE TABLE "home_page_data_business_first_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_data_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stat" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_data_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"company" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_data_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer
  );
  
  CREATE TABLE "home_page_data_differentiators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_data_insight_categories_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_data_insight_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_data_lead_c_t_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"href" varchar DEFAULT '/contact'
  );
  
  CREATE TABLE "home_page_data" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge" varchar DEFAULT 'Business First. Technology That Delivers.',
  	"hero_headline1" varchar DEFAULT 'Deep Tech.',
  	"hero_headline2" varchar DEFAULT 'Built Around Business.',
  	"hero_subheading" varchar DEFAULT 'AI-powered solutions for intelligent manufacturing, connected industries and smarter businesses.',
  	"hero_description" varchar DEFAULT 'IdentifYou engineers AI-powered, connected and intelligent solutions using Vision AI, Industry Automation, AI-Powered No-Code, Data Engineering and Digital Engineering.',
  	"hero_primary_button_label" varchar DEFAULT 'Explore Our Deep Tech',
  	"hero_primary_button_href" varchar DEFAULT '/deep-tech',
  	"hero_secondary_button_label" varchar DEFAULT 'Talk to an Expert',
  	"hero_secondary_button_href" varchar DEFAULT '/contact',
  	"hero_hero_image_id" integer,
  	"intro_statement" varchar DEFAULT 'We don''t start with technology. We start with the business problem, operational challenge or growth opportunity — with deep expertise in Manufacturing and Integrated Supply Chain, and extensive experience across Financial Services, Investment, FinTech and Healthcare — and engineer the right AI-powered solution around it.',
  	"main_c_t_a_headline" varchar DEFAULT 'Let''s Solve a Business Problem',
  	"main_c_t_a_description" varchar DEFAULT 'Tell us what you''re trying to improve. We''ll help identify where Deep Tech can create measurable business value.',
  	"main_c_t_a_button_label" varchar DEFAULT 'Talk to a Deep Tech Expert',
  	"main_c_t_a_button_href" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_tags" ADD CONSTRAINT "case_studies_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_filter_categories" ADD CONSTRAINT "case_studies_filter_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_doc_items" ADD CONSTRAINT "case_studies_doc_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_detail_challenges" ADD CONSTRAINT "case_studies_detail_challenges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_detail_results" ADD CONSTRAINT "case_studies_detail_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_detail_solution_steps" ADD CONSTRAINT "case_studies_detail_solution_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_category_id_case_study_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."case_study_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_detail_hero_image_id_media_id_fk" FOREIGN KEY ("detail_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_detail_thumbnail_id_media_id_fk" FOREIGN KEY ("detail_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_tags" ADD CONSTRAINT "_case_studies_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_filter_categories" ADD CONSTRAINT "_case_studies_v_version_filter_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_doc_items" ADD CONSTRAINT "_case_studies_v_version_doc_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_detail_challenges" ADD CONSTRAINT "_case_studies_v_version_detail_challenges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_detail_results" ADD CONSTRAINT "_case_studies_v_version_detail_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_detail_solution_steps" ADD CONSTRAINT "_case_studies_v_version_detail_solution_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_category_id_case_study_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."case_study_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_detail_hero_image_id_media_id_fk" FOREIGN KEY ("version_detail_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_detail_thumbnail_id_media_id_fk" FOREIGN KEY ("version_detail_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "manufacturing_solutions" ADD CONSTRAINT "manufacturing_solutions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs_and_news_sections" ADD CONSTRAINT "blogs_and_news_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs_and_news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_and_news_takeaways" ADD CONSTRAINT "blogs_and_news_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs_and_news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_and_news" ADD CONSTRAINT "blogs_and_news_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_and_news_v_version_sections" ADD CONSTRAINT "_blogs_and_news_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogs_and_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_and_news_v_version_takeaways" ADD CONSTRAINT "_blogs_and_news_v_version_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogs_and_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_and_news_v" ADD CONSTRAINT "_blogs_and_news_v_parent_id_blogs_and_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs_and_news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_and_news_v" ADD CONSTRAINT "_blogs_and_news_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_study_categories_fk" FOREIGN KEY ("case_study_categories_id") REFERENCES "public"."case_study_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_manufacturing_solutions_fk" FOREIGN KEY ("manufacturing_solutions_id") REFERENCES "public"."manufacturing_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_deep_tech_capabilities_fk" FOREIGN KEY ("deep_tech_capabilities_id") REFERENCES "public"."deep_tech_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_and_news_fk" FOREIGN KEY ("blogs_and_news_id") REFERENCES "public"."blogs_and_news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items" ADD CONSTRAINT "header_nav_items_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_social_image_id_media_id_fk" FOREIGN KEY ("social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_data_ai_sees_think_acts" ADD CONSTRAINT "home_page_data_ai_sees_think_acts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_data_ai_sees_think_acts" ADD CONSTRAINT "home_page_data_ai_sees_think_acts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_data_business_first_steps" ADD CONSTRAINT "home_page_data_business_first_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_data_stats" ADD CONSTRAINT "home_page_data_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_data_testimonials" ADD CONSTRAINT "home_page_data_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_data_partners" ADD CONSTRAINT "home_page_data_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_data_partners" ADD CONSTRAINT "home_page_data_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_data_differentiators" ADD CONSTRAINT "home_page_data_differentiators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_data_insight_categories_tags" ADD CONSTRAINT "home_page_data_insight_categories_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_data_insight_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_data_insight_categories" ADD CONSTRAINT "home_page_data_insight_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_data_lead_c_t_as" ADD CONSTRAINT "home_page_data_lead_c_t_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_data" ADD CONSTRAINT "home_page_data_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "case_study_categories_slug_idx" ON "case_study_categories" USING btree ("slug");
  CREATE INDEX "case_study_categories_updated_at_idx" ON "case_study_categories" USING btree ("updated_at");
  CREATE INDEX "case_study_categories_created_at_idx" ON "case_study_categories" USING btree ("created_at");
  CREATE INDEX "case_studies_tags_order_idx" ON "case_studies_tags" USING btree ("_order");
  CREATE INDEX "case_studies_tags_parent_id_idx" ON "case_studies_tags" USING btree ("_parent_id");
  CREATE INDEX "case_studies_filter_categories_order_idx" ON "case_studies_filter_categories" USING btree ("_order");
  CREATE INDEX "case_studies_filter_categories_parent_id_idx" ON "case_studies_filter_categories" USING btree ("_parent_id");
  CREATE INDEX "case_studies_doc_items_order_idx" ON "case_studies_doc_items" USING btree ("_order");
  CREATE INDEX "case_studies_doc_items_parent_id_idx" ON "case_studies_doc_items" USING btree ("_parent_id");
  CREATE INDEX "case_studies_detail_challenges_order_idx" ON "case_studies_detail_challenges" USING btree ("_order");
  CREATE INDEX "case_studies_detail_challenges_parent_id_idx" ON "case_studies_detail_challenges" USING btree ("_parent_id");
  CREATE INDEX "case_studies_detail_results_order_idx" ON "case_studies_detail_results" USING btree ("_order");
  CREATE INDEX "case_studies_detail_results_parent_id_idx" ON "case_studies_detail_results" USING btree ("_parent_id");
  CREATE INDEX "case_studies_detail_solution_steps_order_idx" ON "case_studies_detail_solution_steps" USING btree ("_order");
  CREATE INDEX "case_studies_detail_solution_steps_parent_id_idx" ON "case_studies_detail_solution_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_category_idx" ON "case_studies" USING btree ("category_id");
  CREATE INDEX "case_studies_detail_detail_hero_image_idx" ON "case_studies" USING btree ("detail_hero_image_id");
  CREATE INDEX "case_studies_detail_detail_thumbnail_idx" ON "case_studies" USING btree ("detail_thumbnail_id");
  CREATE INDEX "case_studies_seo_seo_og_image_idx" ON "case_studies" USING btree ("seo_og_image_id");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "case_studies__status_idx" ON "case_studies" USING btree ("_status");
  CREATE INDEX "case_studies_rels_order_idx" ON "case_studies_rels" USING btree ("order");
  CREATE INDEX "case_studies_rels_parent_idx" ON "case_studies_rels" USING btree ("parent_id");
  CREATE INDEX "case_studies_rels_path_idx" ON "case_studies_rels" USING btree ("path");
  CREATE INDEX "case_studies_rels_case_studies_id_idx" ON "case_studies_rels" USING btree ("case_studies_id");
  CREATE INDEX "_case_studies_v_version_tags_order_idx" ON "_case_studies_v_version_tags" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_tags_parent_id_idx" ON "_case_studies_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_filter_categories_order_idx" ON "_case_studies_v_version_filter_categories" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_filter_categories_parent_id_idx" ON "_case_studies_v_version_filter_categories" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_doc_items_order_idx" ON "_case_studies_v_version_doc_items" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_doc_items_parent_id_idx" ON "_case_studies_v_version_doc_items" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_detail_challenges_order_idx" ON "_case_studies_v_version_detail_challenges" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_detail_challenges_parent_id_idx" ON "_case_studies_v_version_detail_challenges" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_detail_results_order_idx" ON "_case_studies_v_version_detail_results" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_detail_results_parent_id_idx" ON "_case_studies_v_version_detail_results" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_detail_solution_steps_order_idx" ON "_case_studies_v_version_detail_solution_steps" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_detail_solution_steps_parent_id_idx" ON "_case_studies_v_version_detail_solution_steps" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_parent_idx" ON "_case_studies_v" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_version_version_slug_idx" ON "_case_studies_v" USING btree ("version_slug");
  CREATE INDEX "_case_studies_v_version_version_category_idx" ON "_case_studies_v" USING btree ("version_category_id");
  CREATE INDEX "_case_studies_v_version_detail_version_detail_hero_image_idx" ON "_case_studies_v" USING btree ("version_detail_hero_image_id");
  CREATE INDEX "_case_studies_v_version_detail_version_detail_thumbnail_idx" ON "_case_studies_v" USING btree ("version_detail_thumbnail_id");
  CREATE INDEX "_case_studies_v_version_seo_version_seo_og_image_idx" ON "_case_studies_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_case_studies_v_version_version_updated_at_idx" ON "_case_studies_v" USING btree ("version_updated_at");
  CREATE INDEX "_case_studies_v_version_version_created_at_idx" ON "_case_studies_v" USING btree ("version_created_at");
  CREATE INDEX "_case_studies_v_version_version__status_idx" ON "_case_studies_v" USING btree ("version__status");
  CREATE INDEX "_case_studies_v_created_at_idx" ON "_case_studies_v" USING btree ("created_at");
  CREATE INDEX "_case_studies_v_updated_at_idx" ON "_case_studies_v" USING btree ("updated_at");
  CREATE INDEX "_case_studies_v_latest_idx" ON "_case_studies_v" USING btree ("latest");
  CREATE INDEX "_case_studies_v_rels_order_idx" ON "_case_studies_v_rels" USING btree ("order");
  CREATE INDEX "_case_studies_v_rels_parent_idx" ON "_case_studies_v_rels" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_rels_path_idx" ON "_case_studies_v_rels" USING btree ("path");
  CREATE INDEX "_case_studies_v_rels_case_studies_id_idx" ON "_case_studies_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "manufacturing_solutions_image_idx" ON "manufacturing_solutions" USING btree ("image_id");
  CREATE INDEX "manufacturing_solutions_updated_at_idx" ON "manufacturing_solutions" USING btree ("updated_at");
  CREATE INDEX "manufacturing_solutions_created_at_idx" ON "manufacturing_solutions" USING btree ("created_at");
  CREATE INDEX "deep_tech_capabilities_updated_at_idx" ON "deep_tech_capabilities" USING btree ("updated_at");
  CREATE INDEX "deep_tech_capabilities_created_at_idx" ON "deep_tech_capabilities" USING btree ("created_at");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "blogs_and_news_sections_order_idx" ON "blogs_and_news_sections" USING btree ("_order");
  CREATE INDEX "blogs_and_news_sections_parent_id_idx" ON "blogs_and_news_sections" USING btree ("_parent_id");
  CREATE INDEX "blogs_and_news_takeaways_order_idx" ON "blogs_and_news_takeaways" USING btree ("_order");
  CREATE INDEX "blogs_and_news_takeaways_parent_id_idx" ON "blogs_and_news_takeaways" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blogs_and_news_slug_idx" ON "blogs_and_news" USING btree ("slug");
  CREATE INDEX "blogs_and_news_featured_image_idx" ON "blogs_and_news" USING btree ("featured_image_id");
  CREATE INDEX "blogs_and_news_updated_at_idx" ON "blogs_and_news" USING btree ("updated_at");
  CREATE INDEX "blogs_and_news_created_at_idx" ON "blogs_and_news" USING btree ("created_at");
  CREATE INDEX "blogs_and_news__status_idx" ON "blogs_and_news" USING btree ("_status");
  CREATE INDEX "_blogs_and_news_v_version_sections_order_idx" ON "_blogs_and_news_v_version_sections" USING btree ("_order");
  CREATE INDEX "_blogs_and_news_v_version_sections_parent_id_idx" ON "_blogs_and_news_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_blogs_and_news_v_version_takeaways_order_idx" ON "_blogs_and_news_v_version_takeaways" USING btree ("_order");
  CREATE INDEX "_blogs_and_news_v_version_takeaways_parent_id_idx" ON "_blogs_and_news_v_version_takeaways" USING btree ("_parent_id");
  CREATE INDEX "_blogs_and_news_v_parent_idx" ON "_blogs_and_news_v" USING btree ("parent_id");
  CREATE INDEX "_blogs_and_news_v_version_version_slug_idx" ON "_blogs_and_news_v" USING btree ("version_slug");
  CREATE INDEX "_blogs_and_news_v_version_version_featured_image_idx" ON "_blogs_and_news_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blogs_and_news_v_version_version_updated_at_idx" ON "_blogs_and_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_blogs_and_news_v_version_version_created_at_idx" ON "_blogs_and_news_v" USING btree ("version_created_at");
  CREATE INDEX "_blogs_and_news_v_version_version__status_idx" ON "_blogs_and_news_v" USING btree ("version__status");
  CREATE INDEX "_blogs_and_news_v_created_at_idx" ON "_blogs_and_news_v" USING btree ("created_at");
  CREATE INDEX "_blogs_and_news_v_updated_at_idx" ON "_blogs_and_news_v" USING btree ("updated_at");
  CREATE INDEX "_blogs_and_news_v_latest_idx" ON "_blogs_and_news_v" USING btree ("latest");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_case_study_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("case_study_categories_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_manufacturing_solutions_id_idx" ON "payload_locked_documents_rels" USING btree ("manufacturing_solutions_id");
  CREATE INDEX "payload_locked_documents_rels_deep_tech_capabilities_id_idx" ON "payload_locked_documents_rels" USING btree ("deep_tech_capabilities_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_blogs_and_news_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_and_news_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_sub_items_order_idx" ON "header_nav_items_sub_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_sub_items_parent_id_idx" ON "header_nav_items_sub_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_social_image_idx" ON "site_settings" USING btree ("social_image_id");
  CREATE INDEX "home_page_data_ai_sees_think_acts_order_idx" ON "home_page_data_ai_sees_think_acts" USING btree ("_order");
  CREATE INDEX "home_page_data_ai_sees_think_acts_parent_id_idx" ON "home_page_data_ai_sees_think_acts" USING btree ("_parent_id");
  CREATE INDEX "home_page_data_ai_sees_think_acts_image_idx" ON "home_page_data_ai_sees_think_acts" USING btree ("image_id");
  CREATE INDEX "home_page_data_business_first_steps_order_idx" ON "home_page_data_business_first_steps" USING btree ("_order");
  CREATE INDEX "home_page_data_business_first_steps_parent_id_idx" ON "home_page_data_business_first_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_data_stats_order_idx" ON "home_page_data_stats" USING btree ("_order");
  CREATE INDEX "home_page_data_stats_parent_id_idx" ON "home_page_data_stats" USING btree ("_parent_id");
  CREATE INDEX "home_page_data_testimonials_order_idx" ON "home_page_data_testimonials" USING btree ("_order");
  CREATE INDEX "home_page_data_testimonials_parent_id_idx" ON "home_page_data_testimonials" USING btree ("_parent_id");
  CREATE INDEX "home_page_data_partners_order_idx" ON "home_page_data_partners" USING btree ("_order");
  CREATE INDEX "home_page_data_partners_parent_id_idx" ON "home_page_data_partners" USING btree ("_parent_id");
  CREATE INDEX "home_page_data_partners_logo_idx" ON "home_page_data_partners" USING btree ("logo_id");
  CREATE INDEX "home_page_data_differentiators_order_idx" ON "home_page_data_differentiators" USING btree ("_order");
  CREATE INDEX "home_page_data_differentiators_parent_id_idx" ON "home_page_data_differentiators" USING btree ("_parent_id");
  CREATE INDEX "home_page_data_insight_categories_tags_order_idx" ON "home_page_data_insight_categories_tags" USING btree ("_order");
  CREATE INDEX "home_page_data_insight_categories_tags_parent_id_idx" ON "home_page_data_insight_categories_tags" USING btree ("_parent_id");
  CREATE INDEX "home_page_data_insight_categories_order_idx" ON "home_page_data_insight_categories" USING btree ("_order");
  CREATE INDEX "home_page_data_insight_categories_parent_id_idx" ON "home_page_data_insight_categories" USING btree ("_parent_id");
  CREATE INDEX "home_page_data_lead_c_t_as_order_idx" ON "home_page_data_lead_c_t_as" USING btree ("_order");
  CREATE INDEX "home_page_data_lead_c_t_as_parent_id_idx" ON "home_page_data_lead_c_t_as" USING btree ("_parent_id");
  CREATE INDEX "home_page_data_hero_hero_hero_image_idx" ON "home_page_data" USING btree ("hero_hero_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "case_study_categories" CASCADE;
  DROP TABLE "case_studies_tags" CASCADE;
  DROP TABLE "case_studies_filter_categories" CASCADE;
  DROP TABLE "case_studies_doc_items" CASCADE;
  DROP TABLE "case_studies_detail_challenges" CASCADE;
  DROP TABLE "case_studies_detail_results" CASCADE;
  DROP TABLE "case_studies_detail_solution_steps" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "case_studies_rels" CASCADE;
  DROP TABLE "_case_studies_v_version_tags" CASCADE;
  DROP TABLE "_case_studies_v_version_filter_categories" CASCADE;
  DROP TABLE "_case_studies_v_version_doc_items" CASCADE;
  DROP TABLE "_case_studies_v_version_detail_challenges" CASCADE;
  DROP TABLE "_case_studies_v_version_detail_results" CASCADE;
  DROP TABLE "_case_studies_v_version_detail_solution_steps" CASCADE;
  DROP TABLE "_case_studies_v" CASCADE;
  DROP TABLE "_case_studies_v_rels" CASCADE;
  DROP TABLE "manufacturing_solutions" CASCADE;
  DROP TABLE "deep_tech_capabilities" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "blogs_and_news_sections" CASCADE;
  DROP TABLE "blogs_and_news_takeaways" CASCADE;
  DROP TABLE "blogs_and_news" CASCADE;
  DROP TABLE "_blogs_and_news_v_version_sections" CASCADE;
  DROP TABLE "_blogs_and_news_v_version_takeaways" CASCADE;
  DROP TABLE "_blogs_and_news_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_sub_items" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "home_page_data_ai_sees_think_acts" CASCADE;
  DROP TABLE "home_page_data_business_first_steps" CASCADE;
  DROP TABLE "home_page_data_stats" CASCADE;
  DROP TABLE "home_page_data_testimonials" CASCADE;
  DROP TABLE "home_page_data_partners" CASCADE;
  DROP TABLE "home_page_data_differentiators" CASCADE;
  DROP TABLE "home_page_data_insight_categories_tags" CASCADE;
  DROP TABLE "home_page_data_insight_categories" CASCADE;
  DROP TABLE "home_page_data_lead_c_t_as" CASCADE;
  DROP TABLE "home_page_data" CASCADE;
  DROP TYPE "public"."enum_case_studies_doc_items_type";
  DROP TYPE "public"."enum_case_studies_status";
  DROP TYPE "public"."enum_case_studies_template";
  DROP TYPE "public"."enum__case_studies_v_version_doc_items_type";
  DROP TYPE "public"."enum__case_studies_v_version_status";
  DROP TYPE "public"."enum__case_studies_v_version_template";
  DROP TYPE "public"."enum_blogs_and_news_status";
  DROP TYPE "public"."enum_blogs_and_news_category";
  DROP TYPE "public"."enum__blogs_and_news_v_version_status";
  DROP TYPE "public"."enum__blogs_and_news_v_version_category";
  DROP TYPE "public"."enum_site_settings_social_links_platform";`)
}
