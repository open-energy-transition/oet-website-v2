import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_projects_overview_units_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_overview_units_button_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_hero_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_tools_we_support_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"model_id" integer
  );
  
  CREATE TABLE "pages_blocks_tools_we_support" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_overview_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer
  );
  
  CREATE TABLE "pages_blocks_projects_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"units_button_link_type" "enum_pages_blocks_projects_overview_units_button_link_type" DEFAULT 'reference',
  	"units_button_link_new_tab" boolean,
  	"units_button_link_url" varchar,
  	"units_button_link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tools_we_support_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"model_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tools_we_support" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_overview_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"units_button_link_type" "enum__pages_v_blocks_projects_overview_units_button_link_type" DEFAULT 'reference',
  	"units_button_link_new_tab" boolean,
  	"units_button_link_url" varchar,
  	"units_button_link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "icons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"svg" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "icon_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "icons_id" integer;
  ALTER TABLE "pages_hero_columns" ADD CONSTRAINT "pages_hero_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_hero_columns" ADD CONSTRAINT "pages_hero_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tools_we_support_services" ADD CONSTRAINT "pages_blocks_tools_we_support_services_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tools_we_support_services" ADD CONSTRAINT "pages_blocks_tools_we_support_services_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tools_we_support_services" ADD CONSTRAINT "pages_blocks_tools_we_support_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tools_we_support"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tools_we_support" ADD CONSTRAINT "pages_blocks_tools_we_support_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_overview_projects" ADD CONSTRAINT "pages_blocks_projects_overview_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_overview_projects" ADD CONSTRAINT "pages_blocks_projects_overview_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_overview" ADD CONSTRAINT "pages_blocks_projects_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_columns" ADD CONSTRAINT "_pages_v_version_hero_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_columns" ADD CONSTRAINT "_pages_v_version_hero_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tools_we_support_services" ADD CONSTRAINT "_pages_v_blocks_tools_we_support_services_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tools_we_support_services" ADD CONSTRAINT "_pages_v_blocks_tools_we_support_services_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tools_we_support_services" ADD CONSTRAINT "_pages_v_blocks_tools_we_support_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tools_we_support"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD CONSTRAINT "_pages_v_blocks_tools_we_support_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_overview_projects" ADD CONSTRAINT "_pages_v_blocks_projects_overview_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_overview_projects" ADD CONSTRAINT "_pages_v_blocks_projects_overview_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_projects_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_overview" ADD CONSTRAINT "_pages_v_blocks_projects_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_columns_order_idx" ON "pages_hero_columns" USING btree ("_order");
  CREATE INDEX "pages_hero_columns_parent_id_idx" ON "pages_hero_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_columns_media_idx" ON "pages_hero_columns" USING btree ("media_id");
  CREATE INDEX "pages_blocks_tools_we_support_services_order_idx" ON "pages_blocks_tools_we_support_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_tools_we_support_services_parent_id_idx" ON "pages_blocks_tools_we_support_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tools_we_support_services_icon_idx" ON "pages_blocks_tools_we_support_services" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_tools_we_support_services_model_idx" ON "pages_blocks_tools_we_support_services" USING btree ("model_id");
  CREATE INDEX "pages_blocks_tools_we_support_order_idx" ON "pages_blocks_tools_we_support" USING btree ("_order");
  CREATE INDEX "pages_blocks_tools_we_support_parent_id_idx" ON "pages_blocks_tools_we_support" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tools_we_support_path_idx" ON "pages_blocks_tools_we_support" USING btree ("_path");
  CREATE INDEX "pages_blocks_projects_overview_projects_order_idx" ON "pages_blocks_projects_overview_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_overview_projects_parent_id_idx" ON "pages_blocks_projects_overview_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_overview_projects_project_idx" ON "pages_blocks_projects_overview_projects" USING btree ("project_id");
  CREATE INDEX "pages_blocks_projects_overview_order_idx" ON "pages_blocks_projects_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_overview_parent_id_idx" ON "pages_blocks_projects_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_overview_path_idx" ON "pages_blocks_projects_overview" USING btree ("_path");
  CREATE INDEX "_pages_v_version_hero_columns_order_idx" ON "_pages_v_version_hero_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_columns_parent_id_idx" ON "_pages_v_version_hero_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_columns_media_idx" ON "_pages_v_version_hero_columns" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_tools_we_support_services_order_idx" ON "_pages_v_blocks_tools_we_support_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tools_we_support_services_parent_id_idx" ON "_pages_v_blocks_tools_we_support_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tools_we_support_services_icon_idx" ON "_pages_v_blocks_tools_we_support_services" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_tools_we_support_services_model_idx" ON "_pages_v_blocks_tools_we_support_services" USING btree ("model_id");
  CREATE INDEX "_pages_v_blocks_tools_we_support_order_idx" ON "_pages_v_blocks_tools_we_support" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tools_we_support_parent_id_idx" ON "_pages_v_blocks_tools_we_support" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tools_we_support_path_idx" ON "_pages_v_blocks_tools_we_support" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_projects_overview_projects_order_idx" ON "_pages_v_blocks_projects_overview_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_overview_projects_parent_id_idx" ON "_pages_v_blocks_projects_overview_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_overview_projects_project_idx" ON "_pages_v_blocks_projects_overview_projects" USING btree ("project_id");
  CREATE INDEX "_pages_v_blocks_projects_overview_order_idx" ON "_pages_v_blocks_projects_overview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_overview_parent_id_idx" ON "_pages_v_blocks_projects_overview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_overview_path_idx" ON "_pages_v_blocks_projects_overview" USING btree ("_path");
  CREATE INDEX "icons_updated_at_idx" ON "icons" USING btree ("updated_at");
  CREATE INDEX "icons_created_at_idx" ON "icons" USING btree ("created_at");
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_icons_fk" FOREIGN KEY ("icons_id") REFERENCES "public"."icons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_columns_icon_idx" ON "pages_blocks_content_columns" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_content_columns_icon_idx" ON "_pages_v_blocks_content_columns" USING btree ("icon_id");
  CREATE INDEX "payload_locked_documents_rels_icons_id_idx" ON "payload_locked_documents_rels" USING btree ("icons_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_tools_we_support_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_tools_we_support" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects_overview_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects_overview" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tools_we_support_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tools_we_support" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_projects_overview_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_projects_overview" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "icons" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_columns" CASCADE;
  DROP TABLE "pages_blocks_tools_we_support_services" CASCADE;
  DROP TABLE "pages_blocks_tools_we_support" CASCADE;
  DROP TABLE "pages_blocks_projects_overview_projects" CASCADE;
  DROP TABLE "pages_blocks_projects_overview" CASCADE;
  DROP TABLE "_pages_v_version_hero_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_tools_we_support_services" CASCADE;
  DROP TABLE "_pages_v_blocks_tools_we_support" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_overview_projects" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_overview" CASCADE;
  DROP TABLE "icons" CASCADE;
  ALTER TABLE "pages_blocks_content_columns" DROP CONSTRAINT "pages_blocks_content_columns_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_content_columns" DROP CONSTRAINT "_pages_v_blocks_content_columns_icon_id_icons_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_icons_fk";
  
  DROP INDEX "pages_blocks_content_columns_icon_idx";
  DROP INDEX "_pages_v_blocks_content_columns_icon_idx";
  DROP INDEX "payload_locked_documents_rels_icons_id_idx";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "icon_id";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "icon_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "icons_id";
  DROP TYPE "public"."enum_pages_blocks_projects_overview_units_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_projects_overview_units_button_link_type";`)
}
