import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_event_tabs_default_tab" AS ENUM('highlights', 'upcoming');
  CREATE TYPE "public"."enum__pages_v_blocks_event_tabs_default_tab" AS ENUM('highlights', 'upcoming');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_event_cta_panels_variant" AS ENUM('muted', 'light');
  CREATE TYPE "public"."enum_event_cta_panels_button_style" AS ENUM('outline', 'solid');
  CREATE TABLE "pages_blocks_event_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro_content" jsonb,
  	"tab_labels_highlights_label" varchar DEFAULT 'Event Highlights',
  	"tab_labels_upcoming_label" varchar DEFAULT 'Upcoming Events',
  	"default_tab" "enum_pages_blocks_event_tabs_default_tab" DEFAULT 'highlights',
  	"page_size" numeric DEFAULT 12,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_event_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_event_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro_content" jsonb,
  	"tab_labels_highlights_label" varchar DEFAULT 'Event Highlights',
  	"tab_labels_upcoming_label" varchar DEFAULT 'Upcoming Events',
  	"default_tab" "enum__pages_v_blocks_event_tabs_default_tab" DEFAULT 'highlights',
  	"page_size" numeric DEFAULT 12,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_event_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "events_documentation_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"excerpt" varchar,
  	"author_id" integer,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"timezone_label" varchar DEFAULT 'CET',
  	"location" varchar,
  	"duration_label" varchar,
  	"hero_image_id" integer,
  	"about" jsonb,
  	"documentation_heading" varchar DEFAULT 'Event Documentation',
  	"documentation_featured_image_id" integer,
  	"video_url" varchar,
  	"recap_url" varchar,
  	"registration_url" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"featured_as_highlight" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_members_id" integer,
  	"event_categories_id" integer
  );
  
  CREATE TABLE "_events_v_version_documentation_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_subtitle" varchar,
  	"version_excerpt" varchar,
  	"version_author_id" integer,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_timezone_label" varchar DEFAULT 'CET',
  	"version_location" varchar,
  	"version_duration_label" varchar,
  	"version_hero_image_id" integer,
  	"version_about" jsonb,
  	"version_documentation_heading" varchar DEFAULT 'Event Documentation',
  	"version_documentation_featured_image_id" integer,
  	"version_video_url" varchar,
  	"version_recap_url" varchar,
  	"version_registration_url" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_featured_as_highlight" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_events_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_members_id" integer,
  	"event_categories_id" integer
  );

  CREATE TABLE "event_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "event_cta_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_event_cta_panels_variant" DEFAULT 'muted',
  	"heading" varchar NOT NULL,
  	"lead" varchar NOT NULL,
  	"note" varchar,
  	"button_label" varchar NOT NULL,
  	"button_url" varchar,
  	"button_style" "enum_event_cta_panels_button_style" DEFAULT 'outline',
  	"button_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "event_cta" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "event_categories_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "event_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "event_categories_id" integer;
  ALTER TABLE "pages_blocks_event_tabs" ADD CONSTRAINT "pages_blocks_event_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_cta" ADD CONSTRAINT "pages_blocks_event_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_tabs" ADD CONSTRAINT "_pages_v_blocks_event_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_cta" ADD CONSTRAINT "_pages_v_blocks_event_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_documentation_gallery" ADD CONSTRAINT "events_documentation_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_documentation_gallery" ADD CONSTRAINT "events_documentation_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_documentation_featured_image_id_media_id_fk" FOREIGN KEY ("documentation_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_event_categories_fk" FOREIGN KEY ("event_categories_id") REFERENCES "public"."event_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_documentation_gallery" ADD CONSTRAINT "_events_v_version_documentation_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_documentation_gallery" ADD CONSTRAINT "_events_v_version_documentation_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_documentation_featured_image_id_media_id_fk" FOREIGN KEY ("version_documentation_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_event_categories_fk" FOREIGN KEY ("event_categories_id") REFERENCES "public"."event_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_cta_panels" ADD CONSTRAINT "event_cta_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."event_cta"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_event_tabs_order_idx" ON "pages_blocks_event_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_tabs_parent_id_idx" ON "pages_blocks_event_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_tabs_path_idx" ON "pages_blocks_event_tabs" USING btree ("_path");
  CREATE INDEX "pages_blocks_event_cta_order_idx" ON "pages_blocks_event_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_cta_parent_id_idx" ON "pages_blocks_event_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_cta_path_idx" ON "pages_blocks_event_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_event_tabs_order_idx" ON "_pages_v_blocks_event_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_tabs_parent_id_idx" ON "_pages_v_blocks_event_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_tabs_path_idx" ON "_pages_v_blocks_event_tabs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_event_cta_order_idx" ON "_pages_v_blocks_event_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_cta_parent_id_idx" ON "_pages_v_blocks_event_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_cta_path_idx" ON "_pages_v_blocks_event_cta" USING btree ("_path");
  CREATE INDEX "events_documentation_gallery_order_idx" ON "events_documentation_gallery" USING btree ("_order");
  CREATE INDEX "events_documentation_gallery_parent_id_idx" ON "events_documentation_gallery" USING btree ("_parent_id");
  CREATE INDEX "events_documentation_gallery_image_idx" ON "events_documentation_gallery" USING btree ("image_id");
  CREATE INDEX "events_author_idx" ON "events" USING btree ("author_id");
  CREATE INDEX "events_hero_image_idx" ON "events" USING btree ("hero_image_id");
  CREATE INDEX "events_documentation_documentation_featured_image_idx" ON "events" USING btree ("documentation_featured_image_id");
  CREATE INDEX "events_meta_meta_image_idx" ON "events" USING btree ("meta_image_id");
  CREATE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_team_members_id_idx" ON "events_rels" USING btree ("team_members_id");
  CREATE INDEX "events_rels_event_categories_id_idx" ON "events_rels" USING btree ("event_categories_id");
  CREATE INDEX "_events_v_version_documentation_gallery_order_idx" ON "_events_v_version_documentation_gallery" USING btree ("_order");
  CREATE INDEX "_events_v_version_documentation_gallery_parent_id_idx" ON "_events_v_version_documentation_gallery" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_documentation_gallery_image_idx" ON "_events_v_version_documentation_gallery" USING btree ("image_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_author_idx" ON "_events_v" USING btree ("version_author_id");
  CREATE INDEX "_events_v_version_version_hero_image_idx" ON "_events_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_events_v_version_documentation_version_documentation_featured_image_idx" ON "_events_v" USING btree ("version_documentation_featured_image_id");
  CREATE INDEX "_events_v_version_meta_version_meta_image_idx" ON "_events_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "_events_v_autosave_idx" ON "_events_v" USING btree ("autosave");
  CREATE INDEX "_events_v_rels_order_idx" ON "_events_v_rels" USING btree ("order");
  CREATE INDEX "_events_v_rels_parent_idx" ON "_events_v_rels" USING btree ("parent_id");
  CREATE INDEX "_events_v_rels_path_idx" ON "_events_v_rels" USING btree ("path");
  CREATE INDEX "_events_v_rels_team_members_id_idx" ON "_events_v_rels" USING btree ("team_members_id");
  CREATE INDEX "_events_v_rels_event_categories_id_idx" ON "_events_v_rels" USING btree ("event_categories_id");
  CREATE INDEX "event_categories__order_idx" ON "event_categories" USING btree ("_order");
  CREATE INDEX "event_categories_slug_idx" ON "event_categories" USING btree ("slug");
  CREATE INDEX "event_categories_updated_at_idx" ON "event_categories" USING btree ("updated_at");
  CREATE INDEX "event_categories_created_at_idx" ON "event_categories" USING btree ("created_at");
  CREATE INDEX "event_cta_panels_order_idx" ON "event_cta_panels" USING btree ("_order");
  CREATE INDEX "event_cta_panels_parent_id_idx" ON "event_cta_panels" USING btree ("_parent_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_event_categories_fk" FOREIGN KEY ("event_categories_id") REFERENCES "public"."event_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_event_categories_fk" FOREIGN KEY ("event_categories_id") REFERENCES "public"."event_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_categories_fk" FOREIGN KEY ("event_categories_id") REFERENCES "public"."event_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_event_categories_id_idx" ON "pages_rels" USING btree ("event_categories_id");
  CREATE INDEX "_pages_v_rels_event_categories_id_idx" ON "_pages_v_rels" USING btree ("event_categories_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_event_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("event_categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_event_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_event_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_event_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_event_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_documentation_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_version_documentation_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "event_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "event_cta_panels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "event_cta" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_event_tabs" CASCADE;
  DROP TABLE "pages_blocks_event_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_event_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_event_cta" CASCADE;
  DROP TABLE "events_documentation_gallery" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "_events_v_version_documentation_gallery" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_rels" CASCADE;
  DROP TABLE "event_categories" CASCADE;
  DROP TABLE "event_cta_panels" CASCADE;
  DROP TABLE "event_cta" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_event_categories_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_event_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_event_categories_fk";
  
  DROP INDEX "pages_rels_event_categories_id_idx";
  DROP INDEX "_pages_v_rels_event_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_event_categories_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "event_categories_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "event_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "event_categories_id";
  DROP TYPE "public"."enum_pages_blocks_event_tabs_default_tab";
  DROP TYPE "public"."enum__pages_v_blocks_event_tabs_default_tab";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_event_cta_panels_variant";
  DROP TYPE "public"."enum_event_cta_panels_button_style";`)
}
