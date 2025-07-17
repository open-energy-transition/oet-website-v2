import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_columns_type" AS ENUM('content', 'cardModal');
  CREATE TYPE "public"."enum_pages_blocks_tabs_tab_style" AS ENUM('default', 'pills', 'underline', 'bordered');
  CREATE TYPE "public"."enum_pages_blocks_tabs_tab_position" AS ENUM('top', 'left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_type" AS ENUM('content', 'cardModal');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_tab_style" AS ENUM('default', 'pills', 'underline', 'bordered');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_tab_position" AS ENUM('top', 'left', 'right');
  CREATE TABLE "pages_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"tab_style" "enum_pages_blocks_tabs_tab_style" DEFAULT 'default',
  	"tab_position" "enum_pages_blocks_tabs_tab_position" DEFAULT 'top',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"tab_style" "enum__pages_v_blocks_tabs_tab_style" DEFAULT 'default',
  	"tab_position" "enum__pages_v_blocks_tabs_tab_position" DEFAULT 'top',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "type" "enum_pages_blocks_content_columns_type" DEFAULT 'content';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "modal_id" integer;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "type" "enum__pages_v_blocks_content_columns_type" DEFAULT 'content';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "modal_id" integer;
  ALTER TABLE "pages_blocks_tabs_tabs" ADD CONSTRAINT "pages_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs" ADD CONSTRAINT "pages_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_tabs_tabs_order_idx" ON "pages_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_tabs_parent_id_idx" ON "pages_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_order_idx" ON "pages_blocks_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_parent_id_idx" ON "pages_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_path_idx" ON "pages_blocks_tabs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_order_idx" ON "_pages_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_parent_id_idx" ON "_pages_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_order_idx" ON "_pages_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_parent_id_idx" ON "_pages_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_path_idx" ON "_pages_v_blocks_tabs" USING btree ("_path");
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_modal_id_models_id_fk" FOREIGN KEY ("modal_id") REFERENCES "public"."models"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_modal_id_models_id_fk" FOREIGN KEY ("modal_id") REFERENCES "public"."models"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_columns_modal_idx" ON "pages_blocks_content_columns" USING btree ("modal_id");
  CREATE INDEX "_pages_v_blocks_content_columns_modal_idx" ON "_pages_v_blocks_content_columns" USING btree ("modal_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_tabs_tabs" CASCADE;
  DROP TABLE "pages_blocks_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs" CASCADE;
  ALTER TABLE "pages_blocks_content_columns" DROP CONSTRAINT "pages_blocks_content_columns_modal_id_models_id_fk";
  
  ALTER TABLE "_pages_v_blocks_content_columns" DROP CONSTRAINT "_pages_v_blocks_content_columns_modal_id_models_id_fk";
  
  DROP INDEX "pages_blocks_content_columns_modal_idx";
  DROP INDEX "_pages_v_blocks_content_columns_modal_idx";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "type";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "modal_id";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "type";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "modal_id";
  DROP TYPE "public"."enum_pages_blocks_content_columns_type";
  DROP TYPE "public"."enum_pages_blocks_tabs_tab_style";
  DROP TYPE "public"."enum_pages_blocks_tabs_tab_position";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_type";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_tab_style";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_tab_position";`)
}
