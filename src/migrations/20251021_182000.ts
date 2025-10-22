import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_hero_links_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_links_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar
  );
  
  CREATE TABLE "pages_blocks_button_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar
  );
  
  CREATE TABLE "pages_blocks_our_service_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar
  );
  
  CREATE TABLE "pages_blocks_tools_we_support_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar
  );
  
  CREATE TABLE "pages_blocks_who_we_are_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_overview_units_button_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_links_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_service_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tools_we_support_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_who_we_are_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_overview_units_button_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "header_nav_items_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"hash" varchar NOT NULL
  );
  
  CREATE TABLE "footer_nav_items_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"hash" varchar NOT NULL
  );
  
  CREATE TABLE "footer_about_us_link_actions_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"hash" varchar NOT NULL
  );
  
  ALTER TABLE "departments" ADD COLUMN "representative_member_id" integer;
  ALTER TABLE "pages_hero_links_link_sublinks" ADD CONSTRAINT "pages_hero_links_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links_link_sublinks" ADD CONSTRAINT "pages_blocks_cta_links_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_link_sublinks" ADD CONSTRAINT "pages_blocks_button_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns_link_sublinks" ADD CONSTRAINT "pages_blocks_content_columns_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_service_link_sublinks" ADD CONSTRAINT "pages_blocks_our_service_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tools_we_support_link_sublinks" ADD CONSTRAINT "pages_blocks_tools_we_support_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tools_we_support"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_link_sublinks" ADD CONSTRAINT "pages_blocks_who_we_are_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_overview_units_button_link_sublinks" ADD CONSTRAINT "pages_blocks_projects_overview_units_button_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links_link_sublinks" ADD CONSTRAINT "_pages_v_version_hero_links_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links_link_sublinks" ADD CONSTRAINT "_pages_v_blocks_cta_links_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_link_sublinks" ADD CONSTRAINT "_pages_v_blocks_button_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_link_sublinks" ADD CONSTRAINT "_pages_v_blocks_content_columns_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service_link_sublinks" ADD CONSTRAINT "_pages_v_blocks_our_service_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tools_we_support_link_sublinks" ADD CONSTRAINT "_pages_v_blocks_tools_we_support_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tools_we_support"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_link_sublinks" ADD CONSTRAINT "_pages_v_blocks_who_we_are_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_overview_units_button_link_sublinks" ADD CONSTRAINT "_pages_v_blocks_projects_overview_units_button_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_projects_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_link_sublinks" ADD CONSTRAINT "header_nav_items_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items_link_sublinks" ADD CONSTRAINT "footer_nav_items_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_about_us_link_actions_link_sublinks" ADD CONSTRAINT "footer_about_us_link_actions_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_about_us_link_actions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_links_link_sublinks_order_idx" ON "pages_hero_links_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_hero_links_link_sublinks_parent_id_idx" ON "pages_hero_links_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_link_sublinks_order_idx" ON "pages_blocks_cta_links_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_link_sublinks_parent_id_idx" ON "pages_blocks_cta_links_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_link_sublinks_order_idx" ON "pages_blocks_button_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_link_sublinks_parent_id_idx" ON "pages_blocks_button_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_columns_link_sublinks_order_idx" ON "pages_blocks_content_columns_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_link_sublinks_parent_id_idx" ON "pages_blocks_content_columns_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_service_link_sublinks_order_idx" ON "pages_blocks_our_service_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_service_link_sublinks_parent_id_idx" ON "pages_blocks_our_service_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tools_we_support_link_sublinks_order_idx" ON "pages_blocks_tools_we_support_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_blocks_tools_we_support_link_sublinks_parent_id_idx" ON "pages_blocks_tools_we_support_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_who_we_are_link_sublinks_order_idx" ON "pages_blocks_who_we_are_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_we_are_link_sublinks_parent_id_idx" ON "pages_blocks_who_we_are_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_overview_units_button_link_sublinks_order_idx" ON "pages_blocks_projects_overview_units_button_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_overview_units_button_link_sublinks_parent_id_idx" ON "pages_blocks_projects_overview_units_button_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_links_link_sublinks_order_idx" ON "_pages_v_version_hero_links_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_link_sublinks_parent_id_idx" ON "_pages_v_version_hero_links_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_link_sublinks_order_idx" ON "_pages_v_blocks_cta_links_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_link_sublinks_parent_id_idx" ON "_pages_v_blocks_cta_links_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_link_sublinks_order_idx" ON "_pages_v_blocks_button_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_link_sublinks_parent_id_idx" ON "_pages_v_blocks_button_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_columns_link_sublinks_order_idx" ON "_pages_v_blocks_content_columns_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_link_sublinks_parent_id_idx" ON "_pages_v_blocks_content_columns_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_service_link_sublinks_order_idx" ON "_pages_v_blocks_our_service_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_service_link_sublinks_parent_id_idx" ON "_pages_v_blocks_our_service_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tools_we_support_link_sublinks_order_idx" ON "_pages_v_blocks_tools_we_support_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tools_we_support_link_sublinks_parent_id_idx" ON "_pages_v_blocks_tools_we_support_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_link_sublinks_order_idx" ON "_pages_v_blocks_who_we_are_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_we_are_link_sublinks_parent_id_idx" ON "_pages_v_blocks_who_we_are_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_overview_units_button_link_sublinks_order_idx" ON "_pages_v_blocks_projects_overview_units_button_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_overview_units_button_link_sublinks_parent_id_idx" ON "_pages_v_blocks_projects_overview_units_button_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_link_sublinks_order_idx" ON "header_nav_items_link_sublinks" USING btree ("_order");
  CREATE INDEX "header_nav_items_link_sublinks_parent_id_idx" ON "header_nav_items_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_link_sublinks_order_idx" ON "footer_nav_items_link_sublinks" USING btree ("_order");
  CREATE INDEX "footer_nav_items_link_sublinks_parent_id_idx" ON "footer_nav_items_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "footer_about_us_link_actions_link_sublinks_order_idx" ON "footer_about_us_link_actions_link_sublinks" USING btree ("_order");
  CREATE INDEX "footer_about_us_link_actions_link_sublinks_parent_id_idx" ON "footer_about_us_link_actions_link_sublinks" USING btree ("_parent_id");
  ALTER TABLE "departments" ADD CONSTRAINT "departments_representative_member_id_team_members_id_fk" FOREIGN KEY ("representative_member_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "departments_representative_member_idx" ON "departments" USING btree ("representative_member_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_links_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_button_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_columns_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_our_service_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_tools_we_support_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_who_we_are_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects_overview_units_button_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_links_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_links_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_button_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_columns_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_our_service_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tools_we_support_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_who_we_are_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_projects_overview_units_button_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_about_us_link_actions_link_sublinks" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_links_link_sublinks" CASCADE;
  DROP TABLE "pages_blocks_cta_links_link_sublinks" CASCADE;
  DROP TABLE "pages_blocks_button_link_sublinks" CASCADE;
  DROP TABLE "pages_blocks_content_columns_link_sublinks" CASCADE;
  DROP TABLE "pages_blocks_our_service_link_sublinks" CASCADE;
  DROP TABLE "pages_blocks_tools_we_support_link_sublinks" CASCADE;
  DROP TABLE "pages_blocks_who_we_are_link_sublinks" CASCADE;
  DROP TABLE "pages_blocks_projects_overview_units_button_link_sublinks" CASCADE;
  DROP TABLE "_pages_v_version_hero_links_link_sublinks" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links_link_sublinks" CASCADE;
  DROP TABLE "_pages_v_blocks_button_link_sublinks" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns_link_sublinks" CASCADE;
  DROP TABLE "_pages_v_blocks_our_service_link_sublinks" CASCADE;
  DROP TABLE "_pages_v_blocks_tools_we_support_link_sublinks" CASCADE;
  DROP TABLE "_pages_v_blocks_who_we_are_link_sublinks" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_overview_units_button_link_sublinks" CASCADE;
  DROP TABLE "header_nav_items_link_sublinks" CASCADE;
  DROP TABLE "footer_nav_items_link_sublinks" CASCADE;
  DROP TABLE "footer_about_us_link_actions_link_sublinks" CASCADE;
  ALTER TABLE "departments" DROP CONSTRAINT "departments_representative_member_id_team_members_id_fk";
  
  DROP INDEX "departments_representative_member_idx";
  ALTER TABLE "departments" DROP COLUMN "representative_member_id";`)
}
