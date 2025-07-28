import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_jobs_status" AS ENUM('open', 'closed', 'paused', 'filled', 'draft', 'expired', 'cancelled', 'interviewing', 'offer_extended', 'on_hold');
  CREATE TYPE "public"."enum_footer_follow_us_link_actions_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_about_us_link_actions_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"job_title" varchar NOT NULL,
  	"description" jsonb,
  	"image_id" integer,
  	"linked_in" varchar,
  	"x" varchar,
  	"external_link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"department" varchar NOT NULL,
  	"job_title" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"location" varchar NOT NULL,
  	"contact_type" varchar NOT NULL,
  	"status" "enum_jobs_status" NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footer_follow_us_link_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"link_type" "enum_footer_follow_us_link_actions_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "footer_about_us_link_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_about_us_link_actions_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "jobs_id" integer;
  ALTER TABLE "footer" ADD COLUMN "description" jsonb;
  ALTER TABLE "footer" ADD COLUMN "follow_us_title" varchar;
  ALTER TABLE "footer" ADD COLUMN "follow_us_description" varchar;
  ALTER TABLE "footer" ADD COLUMN "about_us_title" varchar;
  ALTER TABLE "footer" ADD COLUMN "copyright" jsonb;
  ALTER TABLE "footer" ADD COLUMN "privacy_policy" jsonb;
  ALTER TABLE "footer" ADD COLUMN "terms_of_use" jsonb;
  ALTER TABLE "footer" ADD COLUMN "cookie_policy" jsonb;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_jobs" ADD CONSTRAINT "pages_blocks_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jobs" ADD CONSTRAINT "_pages_v_blocks_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_follow_us_link_actions" ADD CONSTRAINT "footer_follow_us_link_actions_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_follow_us_link_actions" ADD CONSTRAINT "footer_follow_us_link_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_about_us_link_actions" ADD CONSTRAINT "footer_about_us_link_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_path_idx" ON "pages_blocks_team_members" USING btree ("_path");
  CREATE INDEX "pages_blocks_jobs_order_idx" ON "pages_blocks_jobs" USING btree ("_order");
  CREATE INDEX "pages_blocks_jobs_parent_id_idx" ON "pages_blocks_jobs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_jobs_path_idx" ON "pages_blocks_jobs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_path_idx" ON "_pages_v_blocks_team_members" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_jobs_order_idx" ON "_pages_v_blocks_jobs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_jobs_parent_id_idx" ON "_pages_v_blocks_jobs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_jobs_path_idx" ON "_pages_v_blocks_jobs" USING btree ("_path");
  CREATE INDEX "team_members_image_idx" ON "team_members" USING btree ("image_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX "footer_follow_us_link_actions_order_idx" ON "footer_follow_us_link_actions" USING btree ("_order");
  CREATE INDEX "footer_follow_us_link_actions_parent_id_idx" ON "footer_follow_us_link_actions" USING btree ("_parent_id");
  CREATE INDEX "footer_follow_us_link_actions_icon_idx" ON "footer_follow_us_link_actions" USING btree ("icon_id");
  CREATE INDEX "footer_about_us_link_actions_order_idx" ON "footer_about_us_link_actions" USING btree ("_order");
  CREATE INDEX "footer_about_us_link_actions_parent_id_idx" ON "footer_about_us_link_actions" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_jobs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_jobs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "jobs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_follow_us_link_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_about_us_link_actions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "pages_blocks_jobs" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_jobs" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "footer_follow_us_link_actions" CASCADE;
  DROP TABLE "footer_about_us_link_actions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_jobs_fk";
  
  DROP INDEX "payload_locked_documents_rels_team_members_id_idx";
  DROP INDEX "payload_locked_documents_rels_jobs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "jobs_id";
  ALTER TABLE "footer" DROP COLUMN "description";
  ALTER TABLE "footer" DROP COLUMN "follow_us_title";
  ALTER TABLE "footer" DROP COLUMN "follow_us_description";
  ALTER TABLE "footer" DROP COLUMN "about_us_title";
  ALTER TABLE "footer" DROP COLUMN "copyright";
  ALTER TABLE "footer" DROP COLUMN "privacy_policy";
  ALTER TABLE "footer" DROP COLUMN "terms_of_use";
  ALTER TABLE "footer" DROP COLUMN "cookie_policy";
  DROP TYPE "public"."enum_jobs_status";
  DROP TYPE "public"."enum_footer_follow_us_link_actions_link_type";
  DROP TYPE "public"."enum_footer_about_us_link_actions_link_type";`)
}
