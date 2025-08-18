import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_our_service_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_our_service_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_tools_we_support_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_tools_we_support_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_who_we_are_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_who_we_are_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_our_service_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_our_service_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_tools_we_support_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_tools_we_support_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_who_we_are_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_who_we_are_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "pages_blocks_who_we_are" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"link_type" "enum_pages_blocks_who_we_are_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_icon_id" integer,
  	"link_btn_bg_color" varchar DEFAULT '#ffffff',
  	"link_btn_text_color" varchar DEFAULT '#000000',
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_who_we_are_link_appearance" DEFAULT 'default',
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_who_we_are" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"link_type" "enum__pages_v_blocks_who_we_are_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_icon_id" integer,
  	"link_btn_bg_color" varchar DEFAULT '#ffffff',
  	"link_btn_text_color" varchar DEFAULT '#000000',
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_who_we_are_link_appearance" DEFAULT 'default',
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "models_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "models_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "models_links" CASCADE;
  DROP TABLE "models_rels" CASCADE;
  ALTER TABLE "footer_follow_us_link_actions" DROP CONSTRAINT "footer_follow_us_link_actions_icon_id_media_id_fk";
  
  ALTER TABLE "footer_follow_us_link_actions" DROP CONSTRAINT "footer_follow_us_link_actions_link_icon_id_icons_id_fk";
  
  DROP INDEX "footer_follow_us_link_actions_link_link_icon_idx";
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "pages_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_bg_color" DROP NOT NULL;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_text_color" DROP NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_bg_color" DROP NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_text_color" DROP NOT NULL;
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE varchar;
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff';
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_bg_color" DROP NOT NULL;
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_text_color" SET DATA TYPE varchar;
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000';
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_text_color" DROP NOT NULL;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "background_color" varchar DEFAULT '';
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "icon_id" integer;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_type" "enum_pages_blocks_our_service_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_btn_bg_color" varchar DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_btn_text_color" varchar DEFAULT '#000000';
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_appearance" "enum_pages_blocks_our_service_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_tools_we_support" ADD COLUMN "link_type" "enum_pages_blocks_tools_we_support_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_tools_we_support" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_tools_we_support" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "pages_blocks_tools_we_support" ADD COLUMN "link_btn_bg_color" varchar DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_tools_we_support" ADD COLUMN "link_btn_text_color" varchar DEFAULT '#000000';
  ALTER TABLE "pages_blocks_tools_we_support" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_tools_we_support" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_tools_we_support" ADD COLUMN "link_appearance" "enum_pages_blocks_tools_we_support_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_partners" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "background_color" varchar DEFAULT '';
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_type" "enum__pages_v_blocks_our_service_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_btn_bg_color" varchar DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_btn_text_color" varchar DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_appearance" "enum__pages_v_blocks_our_service_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD COLUMN "link_type" "enum__pages_v_blocks_tools_we_support_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD COLUMN "link_btn_bg_color" varchar DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD COLUMN "link_btn_text_color" varchar DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD COLUMN "link_appearance" "enum__pages_v_blocks_tools_we_support_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_partners" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "models" ADD COLUMN "icon_id" integer;
  ALTER TABLE "models" ADD COLUMN "website" varchar;
  ALTER TABLE "models" ADD COLUMN "github" varchar;
  ALTER TABLE "models" ADD COLUMN "source_code" varchar;
  ALTER TABLE "footer_follow_us_link_actions" ADD COLUMN "link" varchar NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "contact_us_title" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_us_description" varchar;
  ALTER TABLE "pages_blocks_who_we_are" ADD CONSTRAINT "pages_blocks_who_we_are_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are" ADD CONSTRAINT "pages_blocks_who_we_are_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are" ADD CONSTRAINT "pages_blocks_who_we_are_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD CONSTRAINT "_pages_v_blocks_who_we_are_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD CONSTRAINT "_pages_v_blocks_who_we_are_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD CONSTRAINT "_pages_v_blocks_who_we_are_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_who_we_are_order_idx" ON "pages_blocks_who_we_are" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_we_are_parent_id_idx" ON "pages_blocks_who_we_are" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_who_we_are_path_idx" ON "pages_blocks_who_we_are" USING btree ("_path");
  CREATE INDEX "pages_blocks_who_we_are_link_link_icon_idx" ON "pages_blocks_who_we_are" USING btree ("link_icon_id");
  CREATE INDEX "pages_blocks_who_we_are_media_idx" ON "pages_blocks_who_we_are" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_order_idx" ON "_pages_v_blocks_who_we_are" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_we_are_parent_id_idx" ON "_pages_v_blocks_who_we_are" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_path_idx" ON "_pages_v_blocks_who_we_are" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_who_we_are_link_link_icon_idx" ON "_pages_v_blocks_who_we_are" USING btree ("link_icon_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_media_idx" ON "_pages_v_blocks_who_we_are" USING btree ("media_id");
  ALTER TABLE "pages_blocks_our_service_services" ADD CONSTRAINT "pages_blocks_our_service_services_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_service" ADD CONSTRAINT "pages_blocks_our_service_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tools_we_support" ADD CONSTRAINT "pages_blocks_tools_we_support_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD CONSTRAINT "_pages_v_blocks_our_service_services_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service" ADD CONSTRAINT "_pages_v_blocks_our_service_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD CONSTRAINT "_pages_v_blocks_tools_we_support_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "models" ADD CONSTRAINT "models_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_follow_us_link_actions" ADD CONSTRAINT "footer_follow_us_link_actions_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_our_service_services_icon_idx" ON "pages_blocks_our_service_services" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_our_service_link_link_icon_idx" ON "pages_blocks_our_service" USING btree ("link_icon_id");
  CREATE INDEX "pages_blocks_tools_we_support_link_link_icon_idx" ON "pages_blocks_tools_we_support" USING btree ("link_icon_id");
  CREATE INDEX "_pages_v_blocks_our_service_services_icon_idx" ON "_pages_v_blocks_our_service_services" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_our_service_link_link_icon_idx" ON "_pages_v_blocks_our_service" USING btree ("link_icon_id");
  CREATE INDEX "_pages_v_blocks_tools_we_support_link_link_icon_idx" ON "_pages_v_blocks_tools_we_support" USING btree ("link_icon_id");
  CREATE INDEX "models_icon_idx" ON "models" USING btree ("icon_id");
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "icon";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "units_button_label";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "units_button_url";
  ALTER TABLE "pages_blocks_partners" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "icon";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "units_button_label";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "units_button_url";
  ALTER TABLE "_pages_v_blocks_partners" DROP COLUMN "description";
  ALTER TABLE "footer_follow_us_link_actions" DROP COLUMN "link_type";
  ALTER TABLE "footer_follow_us_link_actions" DROP COLUMN "link_new_tab";
  ALTER TABLE "footer_follow_us_link_actions" DROP COLUMN "link_icon_id";
  ALTER TABLE "footer_follow_us_link_actions" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "footer_follow_us_link_actions" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "footer_follow_us_link_actions" DROP COLUMN "link_url";
  ALTER TABLE "footer_follow_us_link_actions" DROP COLUMN "link_label";
  DROP TYPE "public"."b_bg";
  DROP TYPE "public"."text_color";
  DROP TYPE "public"."enum_models_links_link_type";
  DROP TYPE "public"."enum_models_links_link_appearance";
  DROP TYPE "public"."enum_footer_follow_us_link_actions_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."b_bg" AS ENUM('#ffffff', '#000000', '#E41E3C', '#D7E4BF80');
  CREATE TYPE "public"."text_color" AS ENUM('#000000', '#ffffff', '#D7E4BF80', '#E41E3C');
  CREATE TYPE "public"."enum_models_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_models_links_link_appearance" AS ENUM('default', 'github', 'internal', 'outline');
  CREATE TYPE "public"."enum_footer_follow_us_link_actions_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "models_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_models_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_icon_id" integer,
  	"link_btn_bg_color" "b_bg" DEFAULT '#ffffff' NOT NULL,
  	"link_btn_text_color" text_color DEFAULT '#000000' NOT NULL,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_models_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "models_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "pages_blocks_who_we_are" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_who_we_are" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_who_we_are" CASCADE;
  DROP TABLE "_pages_v_blocks_who_we_are" CASCADE;
  ALTER TABLE "pages_blocks_our_service_services" DROP CONSTRAINT "pages_blocks_our_service_services_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_our_service" DROP CONSTRAINT "pages_blocks_our_service_link_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_tools_we_support" DROP CONSTRAINT "pages_blocks_tools_we_support_link_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP CONSTRAINT "_pages_v_blocks_our_service_services_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_our_service" DROP CONSTRAINT "_pages_v_blocks_our_service_link_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_tools_we_support" DROP CONSTRAINT "_pages_v_blocks_tools_we_support_link_icon_id_icons_id_fk";
  
  ALTER TABLE "models" DROP CONSTRAINT "models_icon_id_icons_id_fk";
  
  ALTER TABLE "footer_follow_us_link_actions" DROP CONSTRAINT "footer_follow_us_link_actions_icon_id_icons_id_fk";
  
  DROP INDEX "pages_blocks_our_service_services_icon_idx";
  DROP INDEX "pages_blocks_our_service_link_link_icon_idx";
  DROP INDEX "pages_blocks_tools_we_support_link_link_icon_idx";
  DROP INDEX "_pages_v_blocks_our_service_services_icon_idx";
  DROP INDEX "_pages_v_blocks_our_service_link_link_icon_idx";
  DROP INDEX "_pages_v_blocks_tools_we_support_link_link_icon_idx";
  DROP INDEX "models_icon_idx";
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_btn_text_color" SET DATA TYPE text_color USING "link_btn_text_color"::text_color;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_btn_text_color" SET DATA TYPE text_color USING "link_btn_text_color"::text_color;
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "link_btn_text_color" SET DATA TYPE text_color USING "link_btn_text_color"::text_color;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_btn_text_color" SET DATA TYPE text_color USING "link_btn_text_color"::text_color;
  ALTER TABLE "pages_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "pages_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "units_button_link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "pages_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "pages_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_text_color" SET DATA TYPE text_color USING "units_button_link_btn_text_color"::text_color;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_btn_text_color" SET DATA TYPE text_color USING "link_btn_text_color"::text_color;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_btn_text_color" SET DATA TYPE text_color USING "link_btn_text_color"::text_color;
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "link_btn_text_color" SET DATA TYPE text_color USING "link_btn_text_color"::text_color;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_btn_text_color" SET DATA TYPE text_color USING "link_btn_text_color"::text_color;
  ALTER TABLE "_pages_v_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "_pages_v_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "units_button_link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "_pages_v_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "_pages_v_blocks_projects_overview" ALTER COLUMN "units_button_link_btn_text_color" SET DATA TYPE text_color USING "units_button_link_btn_text_color"::text_color;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_bg_color" SET NOT NULL;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_text_color" SET DATA TYPE text_color USING "link_btn_text_color"::text_color;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_btn_text_color" SET NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_bg_color" SET NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_text_color" SET DATA TYPE text_color USING "link_btn_text_color"::text_color;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_btn_text_color" SET NOT NULL;
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_bg_color" SET DEFAULT '#ffffff'::"public"."b_bg";
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_bg_color" SET DATA TYPE "public"."b_bg" USING "link_btn_bg_color"::"public"."b_bg";
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_bg_color" SET NOT NULL;
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_text_color" SET DEFAULT '#000000'::text_color;
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_text_color" SET DATA TYPE text_color USING "link_btn_text_color"::text_color;
  ALTER TABLE "footer_about_us_link_actions" ALTER COLUMN "link_btn_text_color" SET NOT NULL;
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "icon" varchar;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "units_button_label" varchar;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "units_button_url" varchar;
  ALTER TABLE "pages_blocks_partners" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "icon" varchar;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "units_button_label" varchar;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "units_button_url" varchar;
  ALTER TABLE "_pages_v_blocks_partners" ADD COLUMN "description" jsonb;
  ALTER TABLE "footer_follow_us_link_actions" ADD COLUMN "link_type" "enum_footer_follow_us_link_actions_link_type" DEFAULT 'reference';
  ALTER TABLE "footer_follow_us_link_actions" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "footer_follow_us_link_actions" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "footer_follow_us_link_actions" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff' NOT NULL;
  ALTER TABLE "footer_follow_us_link_actions" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000' NOT NULL;
  ALTER TABLE "footer_follow_us_link_actions" ADD COLUMN "link_url" varchar;
  ALTER TABLE "footer_follow_us_link_actions" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "models_links" ADD CONSTRAINT "models_links_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "models_links" ADD CONSTRAINT "models_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "models_rels" ADD CONSTRAINT "models_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "models_rels" ADD CONSTRAINT "models_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "models_rels" ADD CONSTRAINT "models_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "models_links_order_idx" ON "models_links" USING btree ("_order");
  CREATE INDEX "models_links_parent_id_idx" ON "models_links" USING btree ("_parent_id");
  CREATE INDEX "models_links_link_link_icon_idx" ON "models_links" USING btree ("link_icon_id");
  CREATE INDEX "models_rels_order_idx" ON "models_rels" USING btree ("order");
  CREATE INDEX "models_rels_parent_idx" ON "models_rels" USING btree ("parent_id");
  CREATE INDEX "models_rels_path_idx" ON "models_rels" USING btree ("path");
  CREATE INDEX "models_rels_pages_id_idx" ON "models_rels" USING btree ("pages_id");
  CREATE INDEX "models_rels_posts_id_idx" ON "models_rels" USING btree ("posts_id");
  ALTER TABLE "footer_follow_us_link_actions" ADD CONSTRAINT "footer_follow_us_link_actions_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_follow_us_link_actions" ADD CONSTRAINT "footer_follow_us_link_actions_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "footer_follow_us_link_actions_link_link_icon_idx" ON "footer_follow_us_link_actions" USING btree ("link_icon_id");
  ALTER TABLE "pages_blocks_content" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "icon_id";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_icon_id";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_appearance";
  ALTER TABLE "pages_blocks_tools_we_support" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_tools_we_support" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_tools_we_support" DROP COLUMN "link_icon_id";
  ALTER TABLE "pages_blocks_tools_we_support" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "pages_blocks_tools_we_support" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "pages_blocks_tools_we_support" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_tools_we_support" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_tools_we_support" DROP COLUMN "link_appearance";
  ALTER TABLE "pages_blocks_partners" DROP COLUMN "sub_title";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "icon_id";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_icon_id";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_tools_we_support" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_tools_we_support" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_tools_we_support" DROP COLUMN "link_icon_id";
  ALTER TABLE "_pages_v_blocks_tools_we_support" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "_pages_v_blocks_tools_we_support" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "_pages_v_blocks_tools_we_support" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_tools_we_support" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_tools_we_support" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_partners" DROP COLUMN "sub_title";
  ALTER TABLE "models" DROP COLUMN "icon_id";
  ALTER TABLE "models" DROP COLUMN "website";
  ALTER TABLE "models" DROP COLUMN "github";
  ALTER TABLE "models" DROP COLUMN "source_code";
  ALTER TABLE "footer_follow_us_link_actions" DROP COLUMN "link";
  ALTER TABLE "footer" DROP COLUMN "contact_us_title";
  ALTER TABLE "footer" DROP COLUMN "contact_us_description";
  DROP TYPE "public"."enum_pages_blocks_our_service_link_type";
  DROP TYPE "public"."enum_pages_blocks_our_service_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_tools_we_support_link_type";
  DROP TYPE "public"."enum_pages_blocks_tools_we_support_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_who_we_are_link_type";
  DROP TYPE "public"."enum_pages_blocks_who_we_are_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_our_service_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_our_service_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_tools_we_support_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_tools_we_support_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_who_we_are_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_who_we_are_link_appearance";`)
}
