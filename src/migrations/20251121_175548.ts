import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_outputs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__outputs_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "pages_blocks_outputs_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"tag" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_outputs_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"tag" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "outputs_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "outputs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_outputs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_outputs_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_outputs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_link" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__outputs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "outputs_id" integer;
  ALTER TABLE "pages_blocks_outputs_list" ADD CONSTRAINT "pages_blocks_outputs_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outputs_list" ADD CONSTRAINT "_pages_v_blocks_outputs_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "outputs_tags" ADD CONSTRAINT "outputs_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."outputs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_outputs_v_version_tags" ADD CONSTRAINT "_outputs_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_outputs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_outputs_v" ADD CONSTRAINT "_outputs_v_parent_id_outputs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."outputs"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_outputs_list_order_idx" ON "pages_blocks_outputs_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_outputs_list_parent_id_idx" ON "pages_blocks_outputs_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_outputs_list_path_idx" ON "pages_blocks_outputs_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_outputs_list_order_idx" ON "_pages_v_blocks_outputs_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_outputs_list_parent_id_idx" ON "_pages_v_blocks_outputs_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_outputs_list_path_idx" ON "_pages_v_blocks_outputs_list" USING btree ("_path");
  CREATE INDEX "outputs_tags_order_idx" ON "outputs_tags" USING btree ("_order");
  CREATE INDEX "outputs_tags_parent_id_idx" ON "outputs_tags" USING btree ("_parent_id");
  CREATE INDEX "outputs_updated_at_idx" ON "outputs" USING btree ("updated_at");
  CREATE INDEX "outputs_created_at_idx" ON "outputs" USING btree ("created_at");
  CREATE INDEX "outputs__status_idx" ON "outputs" USING btree ("_status");
  CREATE INDEX "_outputs_v_version_tags_order_idx" ON "_outputs_v_version_tags" USING btree ("_order");
  CREATE INDEX "_outputs_v_version_tags_parent_id_idx" ON "_outputs_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_outputs_v_parent_idx" ON "_outputs_v" USING btree ("parent_id");
  CREATE INDEX "_outputs_v_version_version_updated_at_idx" ON "_outputs_v" USING btree ("version_updated_at");
  CREATE INDEX "_outputs_v_version_version_created_at_idx" ON "_outputs_v" USING btree ("version_created_at");
  CREATE INDEX "_outputs_v_version_version__status_idx" ON "_outputs_v" USING btree ("version__status");
  CREATE INDEX "_outputs_v_created_at_idx" ON "_outputs_v" USING btree ("created_at");
  CREATE INDEX "_outputs_v_updated_at_idx" ON "_outputs_v" USING btree ("updated_at");
  CREATE INDEX "_outputs_v_latest_idx" ON "_outputs_v" USING btree ("latest");
  CREATE INDEX "_outputs_v_autosave_idx" ON "_outputs_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_outputs_fk" FOREIGN KEY ("outputs_id") REFERENCES "public"."outputs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_outputs_id_idx" ON "payload_locked_documents_rels" USING btree ("outputs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_outputs_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_outputs_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "outputs_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "outputs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_outputs_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_outputs_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_outputs_list" CASCADE;
  DROP TABLE "_pages_v_blocks_outputs_list" CASCADE;
  DROP TABLE "outputs_tags" CASCADE;
  DROP TABLE "outputs" CASCADE;
  DROP TABLE "_outputs_v_version_tags" CASCADE;
  DROP TABLE "_outputs_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_outputs_fk";
  
  DROP INDEX "payload_locked_documents_rels_outputs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "outputs_id";
  DROP TYPE "public"."enum_outputs_status";
  DROP TYPE "public"."enum__outputs_v_version_status";`)
}
