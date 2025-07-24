import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_columns_card_size" AS ENUM('full', 'small');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_list_direction" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_list_type" AS ENUM('normal', 'tag');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_card_size" AS ENUM('full', 'small');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_list_direction" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_list_type" AS ENUM('normal', 'tag');
  ALTER TYPE "public"."enum_pages_blocks_content_columns_type" ADD VALUE 'list';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_type" ADD VALUE 'list';
  CREATE TABLE "pages_blocks_content_columns_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"quote" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"quote" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "use_border" boolean;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "card_size" "enum_pages_blocks_content_columns_card_size" DEFAULT 'full';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "list_title" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "list_direction" "enum_pages_blocks_content_columns_list_direction" DEFAULT 'vertical';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "list_type" "enum_pages_blocks_content_columns_list_type" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "use_border" boolean;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "card_size" "enum__pages_v_blocks_content_columns_card_size" DEFAULT 'full';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "list_title" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "list_direction" "enum__pages_v_blocks_content_columns_list_direction" DEFAULT 'vertical';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "list_type" "enum__pages_v_blocks_content_columns_list_type" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_content_columns_action" ADD CONSTRAINT "pages_blocks_content_columns_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns_list_items" ADD CONSTRAINT "pages_blocks_content_columns_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_action" ADD CONSTRAINT "_pages_v_blocks_content_columns_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_list_items" ADD CONSTRAINT "_pages_v_blocks_content_columns_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quote" ADD CONSTRAINT "_pages_v_blocks_quote_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quote" ADD CONSTRAINT "_pages_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_columns_action_order_idx" ON "pages_blocks_content_columns_action" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_action_parent_id_idx" ON "pages_blocks_content_columns_action" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_columns_list_items_order_idx" ON "pages_blocks_content_columns_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_list_items_parent_id_idx" ON "pages_blocks_content_columns_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_order_idx" ON "pages_blocks_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_parent_id_idx" ON "pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_path_idx" ON "pages_blocks_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_quote_image_idx" ON "pages_blocks_quote" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_content_columns_action_order_idx" ON "_pages_v_blocks_content_columns_action" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_action_parent_id_idx" ON "_pages_v_blocks_content_columns_action" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_columns_list_items_order_idx" ON "_pages_v_blocks_content_columns_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_list_items_parent_id_idx" ON "_pages_v_blocks_content_columns_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_order_idx" ON "_pages_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quote_parent_id_idx" ON "_pages_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_path_idx" ON "_pages_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_quote_image_idx" ON "_pages_v_blocks_quote" USING btree ("image_id");
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "action_label";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "action_url";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "action_label";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "action_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_content_columns_action" CASCADE;
  DROP TABLE "pages_blocks_content_columns_list_items" CASCADE;
  DROP TABLE "pages_blocks_quote" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns_action" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_quote" CASCADE;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "type" SET DEFAULT 'content'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_type";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_type" AS ENUM('content', 'card', 'cardModal');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "type" SET DEFAULT 'content'::"public"."enum_pages_blocks_content_columns_type";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "type" SET DATA TYPE "public"."enum_pages_blocks_content_columns_type" USING "type"::"public"."enum_pages_blocks_content_columns_type";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "type" SET DEFAULT 'content'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_type";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_type" AS ENUM('content', 'card', 'cardModal');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "type" SET DEFAULT 'content'::"public"."enum__pages_v_blocks_content_columns_type";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "type" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_type" USING "type"::"public"."enum__pages_v_blocks_content_columns_type";
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "action_label" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "action_url" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "action_label" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "action_url" varchar;
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "use_border";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "card_size";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "list_title";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "list_direction";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "list_type";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "use_border";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "card_size";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "list_title";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "list_direction";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "list_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_card_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_list_direction";
  DROP TYPE "public"."enum_pages_blocks_content_columns_list_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_card_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_list_direction";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_list_type";`)
}
