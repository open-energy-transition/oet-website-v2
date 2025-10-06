import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_padding_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_content_padding_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_content_padding_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_content_padding_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_padding_top" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_padding_bottom" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_padding_left" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_content_padding_right" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_departments_status" AS ENUM('open', 'closed', 'draft');
  CREATE TABLE "pages_blocks_departments_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_customer_testimonials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_departments_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_customer_testimonials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "departments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"department" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"icon_id" integer,
  	"status" "enum_departments_status" DEFAULT 'open' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "departments_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" varchar NOT NULL,
  	"score" numeric DEFAULT 5 NOT NULL,
  	"name" varchar NOT NULL,
  	"position" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"avatar_id" integer,
  	"company_logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_content_columns_list_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "tag" varchar DEFAULT '';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "title" varchar DEFAULT '';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "padding_top" "enum_pages_blocks_content_padding_top" DEFAULT 'md';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "padding_bottom" "enum_pages_blocks_content_padding_bottom" DEFAULT 'md';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "padding_left" "enum_pages_blocks_content_padding_left" DEFAULT 'none';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "padding_right" "enum_pages_blocks_content_padding_right" DEFAULT 'none';
  ALTER TABLE "pages_rels" ADD COLUMN "departments_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "_pages_v_blocks_content_columns_list_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "tag" varchar DEFAULT '';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "title" varchar DEFAULT '';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "padding_top" "enum__pages_v_blocks_content_padding_top" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "padding_bottom" "enum__pages_v_blocks_content_padding_bottom" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "padding_left" "enum__pages_v_blocks_content_padding_left" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "padding_right" "enum__pages_v_blocks_content_padding_right" DEFAULT 'none';
  ALTER TABLE "_pages_v_rels" ADD COLUMN "departments_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "departments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "pages_blocks_departments_list" ADD CONSTRAINT "pages_blocks_departments_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_customer_testimonials_list" ADD CONSTRAINT "pages_blocks_customer_testimonials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_departments_list" ADD CONSTRAINT "_pages_v_blocks_departments_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_customer_testimonials_list" ADD CONSTRAINT "_pages_v_blocks_customer_testimonials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments" ADD CONSTRAINT "departments_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments_rels" ADD CONSTRAINT "departments_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments_rels" ADD CONSTRAINT "departments_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_departments_list_order_idx" ON "pages_blocks_departments_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_departments_list_parent_id_idx" ON "pages_blocks_departments_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_departments_list_path_idx" ON "pages_blocks_departments_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_customer_testimonials_list_order_idx" ON "pages_blocks_customer_testimonials_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_customer_testimonials_list_parent_id_idx" ON "pages_blocks_customer_testimonials_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_customer_testimonials_list_path_idx" ON "pages_blocks_customer_testimonials_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_departments_list_order_idx" ON "_pages_v_blocks_departments_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_departments_list_parent_id_idx" ON "_pages_v_blocks_departments_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_departments_list_path_idx" ON "_pages_v_blocks_departments_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_customer_testimonials_list_order_idx" ON "_pages_v_blocks_customer_testimonials_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_customer_testimonials_list_parent_id_idx" ON "_pages_v_blocks_customer_testimonials_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_customer_testimonials_list_path_idx" ON "_pages_v_blocks_customer_testimonials_list" USING btree ("_path");
  CREATE INDEX "departments_icon_idx" ON "departments" USING btree ("icon_id");
  CREATE INDEX "departments_updated_at_idx" ON "departments" USING btree ("updated_at");
  CREATE INDEX "departments_created_at_idx" ON "departments" USING btree ("created_at");
  CREATE INDEX "departments_rels_order_idx" ON "departments_rels" USING btree ("order");
  CREATE INDEX "departments_rels_parent_idx" ON "departments_rels" USING btree ("parent_id");
  CREATE INDEX "departments_rels_path_idx" ON "departments_rels" USING btree ("path");
  CREATE INDEX "departments_rels_projects_id_idx" ON "departments_rels" USING btree ("projects_id");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_company_logo_idx" ON "testimonials" USING btree ("company_logo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  ALTER TABLE "pages_blocks_content_columns_list_items" ADD CONSTRAINT "pages_blocks_content_columns_list_items_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_list_items" ADD CONSTRAINT "_pages_v_blocks_content_columns_list_items_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_columns_list_items_icon_idx" ON "pages_blocks_content_columns_list_items" USING btree ("icon_id");
  CREATE INDEX "pages_rels_departments_id_idx" ON "pages_rels" USING btree ("departments_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_blocks_content_columns_list_items_icon_idx" ON "_pages_v_blocks_content_columns_list_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_rels_departments_id_idx" ON "_pages_v_rels" USING btree ("departments_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_departments_id_idx" ON "payload_locked_documents_rels" USING btree ("departments_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_departments_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_customer_testimonials_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_departments_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_customer_testimonials_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "departments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "departments_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_departments_list" CASCADE;
  DROP TABLE "pages_blocks_customer_testimonials_list" CASCADE;
  DROP TABLE "_pages_v_blocks_departments_list" CASCADE;
  DROP TABLE "_pages_v_blocks_customer_testimonials_list" CASCADE;
  DROP TABLE "departments" CASCADE;
  DROP TABLE "departments_rels" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  ALTER TABLE "pages_blocks_content_columns_list_items" DROP CONSTRAINT "pages_blocks_content_columns_list_items_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_departments_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_testimonials_fk";
  
  ALTER TABLE "_pages_v_blocks_content_columns_list_items" DROP CONSTRAINT "_pages_v_blocks_content_columns_list_items_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_departments_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_departments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  DROP INDEX "pages_blocks_content_columns_list_items_icon_idx";
  DROP INDEX "pages_rels_departments_id_idx";
  DROP INDEX "pages_rels_testimonials_id_idx";
  DROP INDEX "_pages_v_blocks_content_columns_list_items_icon_idx";
  DROP INDEX "_pages_v_rels_departments_id_idx";
  DROP INDEX "_pages_v_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_departments_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  ALTER TABLE "pages_blocks_content_columns_list_items" DROP COLUMN "icon_id";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "tag";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "rich_text";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "padding_top";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "padding_bottom";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "padding_left";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "padding_right";
  ALTER TABLE "pages_rels" DROP COLUMN "departments_id";
  ALTER TABLE "pages_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "_pages_v_blocks_content_columns_list_items" DROP COLUMN "icon_id";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "tag";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "rich_text";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "padding_top";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "padding_bottom";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "padding_left";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "padding_right";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "departments_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "departments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  DROP TYPE "public"."enum_pages_blocks_content_padding_top";
  DROP TYPE "public"."enum_pages_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_pages_blocks_content_padding_left";
  DROP TYPE "public"."enum_pages_blocks_content_padding_right";
  DROP TYPE "public"."enum__pages_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__pages_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__pages_v_blocks_content_padding_left";
  DROP TYPE "public"."enum__pages_v_blocks_content_padding_right";
  DROP TYPE "public"."enum_departments_status";`)
}
