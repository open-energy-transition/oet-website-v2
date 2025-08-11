import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_button_color" AS ENUM('default', 'primary', 'secondary', 'success', 'warning', 'danger', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_button_text_size" AS ENUM('default', 'sm', 'lg', '2xl');
  CREATE TYPE "public"."enum_pages_blocks_button_size" AS ENUM('default', 'sm', 'lg', '2xl');
  CREATE TYPE "public"."enum_pages_blocks_button_rounded" AS ENUM('none', 'sm', 'md', 'lg', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_button_color" AS ENUM('default', 'primary', 'secondary', 'success', 'warning', 'danger', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_button_text_size" AS ENUM('default', 'sm', 'lg', '2xl');
  CREATE TYPE "public"."enum__pages_v_blocks_button_size" AS ENUM('default', 'sm', 'lg', '2xl');
  CREATE TYPE "public"."enum__pages_v_blocks_button_rounded" AS ENUM('none', 'sm', 'md', 'lg', 'full');
  CREATE TABLE "pages_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_button_link_appearance" DEFAULT 'default',
  	"color" "enum_pages_blocks_button_color",
  	"text_size" "enum_pages_blocks_button_text_size",
  	"size" "enum_pages_blocks_button_size",
  	"rounded" "enum_pages_blocks_button_rounded",
  	"icon_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_posts_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_button_link_appearance" DEFAULT 'default',
  	"color" "enum__pages_v_blocks_button_color",
  	"text_size" "enum__pages_v_blocks_button_text_size",
  	"size" "enum__pages_v_blocks_button_size",
  	"rounded" "enum__pages_v_blocks_button_rounded",
  	"icon_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_posts_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "posts_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_tags" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_tags" CASCADE;
  DROP TABLE "_posts_v_version_tags" CASCADE;
  ALTER TABLE "pages_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_list" ADD CONSTRAINT "pages_blocks_projects_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_posts_list" ADD CONSTRAINT "pages_blocks_posts_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button" ADD CONSTRAINT "_pages_v_blocks_button_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button" ADD CONSTRAINT "_pages_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_list" ADD CONSTRAINT "_pages_v_blocks_projects_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts_list" ADD CONSTRAINT "_pages_v_blocks_posts_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_button_order_idx" ON "pages_blocks_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_parent_id_idx" ON "pages_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_path_idx" ON "pages_blocks_button" USING btree ("_path");
  CREATE INDEX "pages_blocks_button_icon_idx" ON "pages_blocks_button" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_projects_list_order_idx" ON "pages_blocks_projects_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_list_parent_id_idx" ON "pages_blocks_projects_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_list_path_idx" ON "pages_blocks_projects_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_posts_list_order_idx" ON "pages_blocks_posts_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_posts_list_parent_id_idx" ON "pages_blocks_posts_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_posts_list_path_idx" ON "pages_blocks_posts_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_button_order_idx" ON "_pages_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_parent_id_idx" ON "_pages_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_path_idx" ON "_pages_v_blocks_button" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_button_icon_idx" ON "_pages_v_blocks_button" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_projects_list_order_idx" ON "_pages_v_blocks_projects_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_list_parent_id_idx" ON "_pages_v_blocks_projects_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_list_path_idx" ON "_pages_v_blocks_projects_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_posts_list_order_idx" ON "_pages_v_blocks_posts_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_posts_list_parent_id_idx" ON "_pages_v_blocks_posts_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_posts_list_path_idx" ON "_pages_v_blocks_posts_list" USING btree ("_path");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_posts_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_projects_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_posts_list" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_button" CASCADE;
  DROP TABLE "pages_blocks_projects_list" CASCADE;
  DROP TABLE "pages_blocks_posts_list" CASCADE;
  DROP TABLE "_pages_v_blocks_button" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_list" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_list" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_projects_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_projects_fk";
  
  DROP INDEX "pages_rels_projects_id_idx";
  DROP INDEX "_pages_v_rels_projects_id_idx";
  ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tags" ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_tags_order_idx" ON "_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tags_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_parent_id");
  ALTER TABLE "pages_rels" DROP COLUMN "projects_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "projects_id";
  DROP TYPE "public"."enum_pages_blocks_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_button_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_button_color";
  DROP TYPE "public"."enum_pages_blocks_button_text_size";
  DROP TYPE "public"."enum_pages_blocks_button_size";
  DROP TYPE "public"."enum_pages_blocks_button_rounded";
  DROP TYPE "public"."enum__pages_v_blocks_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_button_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_button_color";
  DROP TYPE "public"."enum__pages_v_blocks_button_text_size";
  DROP TYPE "public"."enum__pages_v_blocks_button_size";
  DROP TYPE "public"."enum__pages_v_blocks_button_rounded";`)
}
