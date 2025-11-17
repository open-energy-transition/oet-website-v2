import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_our_service_link_type" RENAME TO "enum_pages_blocks_our_service_services_link_type";
  ALTER TYPE "public"."enum_pages_blocks_our_service_link_appearance" RENAME TO "enum_pages_blocks_our_service_services_link_appearance";
  ALTER TYPE "public"."enum_pages_blocks_who_we_are_link_type" RENAME TO "enum_pages_blocks_who_we_are_items_link_type";
  ALTER TYPE "public"."enum_pages_blocks_who_we_are_link_appearance" RENAME TO "enum_pages_blocks_who_we_are_items_link_appearance";
  ALTER TYPE "public"."enum__pages_v_blocks_our_service_link_type" RENAME TO "enum__pages_v_blocks_our_service_services_link_type";
  ALTER TYPE "public"."enum__pages_v_blocks_our_service_link_appearance" RENAME TO "enum__pages_v_blocks_our_service_services_link_appearance";
  ALTER TYPE "public"."enum__pages_v_blocks_who_we_are_link_type" RENAME TO "enum__pages_v_blocks_who_we_are_items_link_type";
  ALTER TYPE "public"."enum__pages_v_blocks_who_we_are_link_appearance" RENAME TO "enum__pages_v_blocks_who_we_are_items_link_appearance";
  CREATE TABLE "pages_blocks_who_we_are_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_tem" varchar,
  	"description_item" jsonb,
  	"link_type" "enum_pages_blocks_who_we_are_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_icon_id" integer,
  	"link_btn_bg_color" varchar DEFAULT '#ffffff',
  	"link_btn_text_color" varchar DEFAULT '#000000',
  	"link_btn_size" "size" DEFAULT 'md',
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_who_we_are_items_link_appearance" DEFAULT 'default',
  	"media_id" integer,
  	"reverse" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_who_we_are_bottom_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "_pages_v_blocks_who_we_are_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_tem" varchar,
  	"description_item" jsonb,
  	"link_type" "enum__pages_v_blocks_who_we_are_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_icon_id" integer,
  	"link_btn_bg_color" varchar DEFAULT '#ffffff',
  	"link_btn_text_color" varchar DEFAULT '#000000',
  	"link_btn_size" "size" DEFAULT 'md',
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_who_we_are_items_link_appearance" DEFAULT 'default',
  	"media_id" integer,
  	"reverse" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_who_we_are_bottom_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_our_service_bottom_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_our_service_bottom_images" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_our_service_bottom_images" CASCADE;
  DROP TABLE "_pages_v_blocks_our_service_bottom_images" CASCADE;
  ALTER TABLE "pages_blocks_our_service_link_sublinks" RENAME TO "pages_blocks_our_service_services_link_sublinks";
  ALTER TABLE "pages_blocks_who_we_are_link_sublinks" RENAME TO "pages_blocks_who_we_are_items_link_sublinks";
  ALTER TABLE "_pages_v_blocks_our_service_link_sublinks" RENAME TO "_pages_v_blocks_our_service_services_link_sublinks";
  ALTER TABLE "_pages_v_blocks_who_we_are_link_sublinks" RENAME TO "_pages_v_blocks_who_we_are_items_link_sublinks";
  ALTER TABLE "pages_blocks_our_service_services_link_sublinks" DROP CONSTRAINT "pages_blocks_our_service_link_sublinks_parent_id_fk";
  
  ALTER TABLE "pages_blocks_our_service" DROP CONSTRAINT "pages_blocks_our_service_link_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_who_we_are_items_link_sublinks" DROP CONSTRAINT "pages_blocks_who_we_are_link_sublinks_parent_id_fk";
  
  ALTER TABLE "pages_blocks_who_we_are" DROP CONSTRAINT "pages_blocks_who_we_are_link_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_who_we_are" DROP CONSTRAINT "pages_blocks_who_we_are_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_our_service_services_link_sublinks" DROP CONSTRAINT "_pages_v_blocks_our_service_link_sublinks_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_our_service" DROP CONSTRAINT "_pages_v_blocks_our_service_link_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_who_we_are_items_link_sublinks" DROP CONSTRAINT "_pages_v_blocks_who_we_are_link_sublinks_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP CONSTRAINT "_pages_v_blocks_who_we_are_link_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP CONSTRAINT "_pages_v_blocks_who_we_are_media_id_media_id_fk";
  
  DROP INDEX "pages_blocks_our_service_link_sublinks_order_idx";
  DROP INDEX "pages_blocks_our_service_link_sublinks_parent_id_idx";
  DROP INDEX "pages_blocks_our_service_link_link_icon_idx";
  DROP INDEX "pages_blocks_who_we_are_link_sublinks_order_idx";
  DROP INDEX "pages_blocks_who_we_are_link_sublinks_parent_id_idx";
  DROP INDEX "pages_blocks_who_we_are_link_link_icon_idx";
  DROP INDEX "pages_blocks_who_we_are_media_idx";
  DROP INDEX "_pages_v_blocks_our_service_link_sublinks_order_idx";
  DROP INDEX "_pages_v_blocks_our_service_link_sublinks_parent_id_idx";
  DROP INDEX "_pages_v_blocks_our_service_link_link_icon_idx";
  DROP INDEX "_pages_v_blocks_who_we_are_link_sublinks_order_idx";
  DROP INDEX "_pages_v_blocks_who_we_are_link_sublinks_parent_id_idx";
  DROP INDEX "_pages_v_blocks_who_we_are_link_link_icon_idx";
  DROP INDEX "_pages_v_blocks_who_we_are_media_idx";
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "link_type" "enum_pages_blocks_our_service_services_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "link_btn_bg_color" varchar DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "link_btn_text_color" varchar DEFAULT '#000000';
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "link_appearance" "enum_pages_blocks_our_service_services_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "link_type" "enum__pages_v_blocks_our_service_services_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "link_btn_bg_color" varchar DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "link_btn_text_color" varchar DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "link_appearance" "enum__pages_v_blocks_our_service_services_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_who_we_are_items" ADD CONSTRAINT "pages_blocks_who_we_are_items_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_items" ADD CONSTRAINT "pages_blocks_who_we_are_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_items" ADD CONSTRAINT "pages_blocks_who_we_are_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_bottom_items" ADD CONSTRAINT "pages_blocks_who_we_are_bottom_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_items" ADD CONSTRAINT "_pages_v_blocks_who_we_are_items_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_items" ADD CONSTRAINT "_pages_v_blocks_who_we_are_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_items" ADD CONSTRAINT "_pages_v_blocks_who_we_are_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_bottom_items" ADD CONSTRAINT "_pages_v_blocks_who_we_are_bottom_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_who_we_are_items_order_idx" ON "pages_blocks_who_we_are_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_we_are_items_parent_id_idx" ON "pages_blocks_who_we_are_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_who_we_are_items_link_link_icon_idx" ON "pages_blocks_who_we_are_items" USING btree ("link_icon_id");
  CREATE INDEX "pages_blocks_who_we_are_items_media_idx" ON "pages_blocks_who_we_are_items" USING btree ("media_id");
  CREATE INDEX "pages_blocks_who_we_are_bottom_items_order_idx" ON "pages_blocks_who_we_are_bottom_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_we_are_bottom_items_parent_id_idx" ON "pages_blocks_who_we_are_bottom_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_items_order_idx" ON "_pages_v_blocks_who_we_are_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_we_are_items_parent_id_idx" ON "_pages_v_blocks_who_we_are_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_items_link_link_icon_idx" ON "_pages_v_blocks_who_we_are_items" USING btree ("link_icon_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_items_media_idx" ON "_pages_v_blocks_who_we_are_items" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_bottom_items_order_idx" ON "_pages_v_blocks_who_we_are_bottom_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_we_are_bottom_items_parent_id_idx" ON "_pages_v_blocks_who_we_are_bottom_items" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_our_service_services_link_sublinks" ADD CONSTRAINT "pages_blocks_our_service_services_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_service_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_service_services" ADD CONSTRAINT "pages_blocks_our_service_services_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_service_services" ADD CONSTRAINT "pages_blocks_our_service_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_items_link_sublinks" ADD CONSTRAINT "pages_blocks_who_we_are_items_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_who_we_are_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service_services_link_sublinks" ADD CONSTRAINT "_pages_v_blocks_our_service_services_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_service_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD CONSTRAINT "_pages_v_blocks_our_service_services_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD CONSTRAINT "_pages_v_blocks_our_service_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_items_link_sublinks" ADD CONSTRAINT "_pages_v_blocks_who_we_are_items_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_who_we_are_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_our_service_services_link_sublinks_order_idx" ON "pages_blocks_our_service_services_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_service_services_link_sublinks_parent_id_idx" ON "pages_blocks_our_service_services_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_service_services_link_link_icon_idx" ON "pages_blocks_our_service_services" USING btree ("link_icon_id");
  CREATE INDEX "pages_blocks_our_service_services_image_idx" ON "pages_blocks_our_service_services" USING btree ("image_id");
  CREATE INDEX "pages_blocks_who_we_are_items_link_sublinks_order_idx" ON "pages_blocks_who_we_are_items_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_we_are_items_link_sublinks_parent_id_idx" ON "pages_blocks_who_we_are_items_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_service_services_link_sublinks_order_idx" ON "_pages_v_blocks_our_service_services_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_service_services_link_sublinks_parent_id_idx" ON "_pages_v_blocks_our_service_services_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_service_services_link_link_icon_idx" ON "_pages_v_blocks_our_service_services" USING btree ("link_icon_id");
  CREATE INDEX "_pages_v_blocks_our_service_services_image_idx" ON "_pages_v_blocks_our_service_services" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_items_link_sublinks_order_idx" ON "_pages_v_blocks_who_we_are_items_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_we_are_items_link_sublinks_parent_id_idx" ON "_pages_v_blocks_who_we_are_items_link_sublinks" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "number";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_icon_id";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_btn_size";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_appearance";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "link_icon_id";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "link_btn_size";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "link_appearance";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "number";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_icon_id";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_btn_size";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "link_icon_id";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "link_btn_size";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "media_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_our_service_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_our_service_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_who_we_are_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_who_we_are_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_our_service_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_our_service_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_who_we_are_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_who_we_are_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "pages_blocks_our_service_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar
  );
  
  CREATE TABLE "pages_blocks_our_service_bottom_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "pages_blocks_who_we_are_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_service_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hash" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_service_bottom_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
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
  
  ALTER TABLE "pages_blocks_our_service_services_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_who_we_are_items_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_who_we_are_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_who_we_are_bottom_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_our_service_services_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_who_we_are_items_link_sublinks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_who_we_are_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_who_we_are_bottom_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_our_service_services_link_sublinks" CASCADE;
  DROP TABLE "pages_blocks_who_we_are_items_link_sublinks" CASCADE;
  DROP TABLE "pages_blocks_who_we_are_items" CASCADE;
  DROP TABLE "pages_blocks_who_we_are_bottom_items" CASCADE;
  DROP TABLE "_pages_v_blocks_our_service_services_link_sublinks" CASCADE;
  DROP TABLE "_pages_v_blocks_who_we_are_items_link_sublinks" CASCADE;
  DROP TABLE "_pages_v_blocks_who_we_are_items" CASCADE;
  DROP TABLE "_pages_v_blocks_who_we_are_bottom_items" CASCADE;
  ALTER TABLE "pages_blocks_our_service_services" DROP CONSTRAINT "pages_blocks_our_service_services_link_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_our_service_services" DROP CONSTRAINT "pages_blocks_our_service_services_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP CONSTRAINT "_pages_v_blocks_our_service_services_link_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP CONSTRAINT "_pages_v_blocks_our_service_services_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_our_service_services_link_link_icon_idx";
  DROP INDEX "pages_blocks_our_service_services_image_idx";
  DROP INDEX "_pages_v_blocks_our_service_services_link_link_icon_idx";
  DROP INDEX "_pages_v_blocks_our_service_services_image_idx";
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "number" varchar;
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_type" "enum_pages_blocks_our_service_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_btn_bg_color" varchar DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_btn_text_color" varchar DEFAULT '#000000';
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_appearance" "enum_pages_blocks_our_service_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "description" jsonb;
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "link_type" "enum_pages_blocks_who_we_are_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "link_btn_bg_color" varchar DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "link_btn_text_color" varchar DEFAULT '#000000';
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "link_appearance" "enum_pages_blocks_who_we_are_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "media_id" integer;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "number" varchar;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_type" "enum__pages_v_blocks_our_service_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_btn_bg_color" varchar DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_btn_text_color" varchar DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_appearance" "enum__pages_v_blocks_our_service_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "link_type" "enum__pages_v_blocks_who_we_are_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "link_btn_bg_color" varchar DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "link_btn_text_color" varchar DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "link_appearance" "enum__pages_v_blocks_who_we_are_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "media_id" integer;
  ALTER TABLE "pages_blocks_our_service_link_sublinks" ADD CONSTRAINT "pages_blocks_our_service_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_service_bottom_images" ADD CONSTRAINT "pages_blocks_our_service_bottom_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_service_bottom_images" ADD CONSTRAINT "pages_blocks_our_service_bottom_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_link_sublinks" ADD CONSTRAINT "pages_blocks_who_we_are_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service_link_sublinks" ADD CONSTRAINT "_pages_v_blocks_our_service_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service_bottom_images" ADD CONSTRAINT "_pages_v_blocks_our_service_bottom_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service_bottom_images" ADD CONSTRAINT "_pages_v_blocks_our_service_bottom_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_link_sublinks" ADD CONSTRAINT "_pages_v_blocks_who_we_are_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_who_we_are"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_our_service_link_sublinks_order_idx" ON "pages_blocks_our_service_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_service_link_sublinks_parent_id_idx" ON "pages_blocks_our_service_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_service_bottom_images_order_idx" ON "pages_blocks_our_service_bottom_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_service_bottom_images_parent_id_idx" ON "pages_blocks_our_service_bottom_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_service_bottom_images_image_idx" ON "pages_blocks_our_service_bottom_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_who_we_are_link_sublinks_order_idx" ON "pages_blocks_who_we_are_link_sublinks" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_we_are_link_sublinks_parent_id_idx" ON "pages_blocks_who_we_are_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_service_link_sublinks_order_idx" ON "_pages_v_blocks_our_service_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_service_link_sublinks_parent_id_idx" ON "_pages_v_blocks_our_service_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_service_bottom_images_order_idx" ON "_pages_v_blocks_our_service_bottom_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_service_bottom_images_parent_id_idx" ON "_pages_v_blocks_our_service_bottom_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_service_bottom_images_image_idx" ON "_pages_v_blocks_our_service_bottom_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_link_sublinks_order_idx" ON "_pages_v_blocks_who_we_are_link_sublinks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_we_are_link_sublinks_parent_id_idx" ON "_pages_v_blocks_who_we_are_link_sublinks" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_our_service" ADD CONSTRAINT "pages_blocks_our_service_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are" ADD CONSTRAINT "pages_blocks_who_we_are_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are" ADD CONSTRAINT "pages_blocks_who_we_are_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service" ADD CONSTRAINT "_pages_v_blocks_our_service_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD CONSTRAINT "_pages_v_blocks_who_we_are_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD CONSTRAINT "_pages_v_blocks_who_we_are_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_our_service_link_link_icon_idx" ON "pages_blocks_our_service" USING btree ("link_icon_id");
  CREATE INDEX "pages_blocks_who_we_are_link_link_icon_idx" ON "pages_blocks_who_we_are" USING btree ("link_icon_id");
  CREATE INDEX "pages_blocks_who_we_are_media_idx" ON "pages_blocks_who_we_are" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_our_service_link_link_icon_idx" ON "_pages_v_blocks_our_service" USING btree ("link_icon_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_link_link_icon_idx" ON "_pages_v_blocks_who_we_are" USING btree ("link_icon_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_media_idx" ON "_pages_v_blocks_who_we_are" USING btree ("media_id");
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "link_icon_id";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "link_btn_size";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "link_appearance";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "link_icon_id";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "link_btn_size";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "image_id";
  DROP TYPE "public"."enum_pages_blocks_our_service_services_link_type";
  DROP TYPE "public"."enum_pages_blocks_our_service_services_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_who_we_are_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_who_we_are_items_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_our_service_services_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_our_service_services_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_who_we_are_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_who_we_are_items_link_appearance";`)
}
