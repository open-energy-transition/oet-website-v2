import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_partners_list_default_filter" AS ENUM('all', 'partner', 'funder');
  CREATE TYPE "public"."enum__pages_v_blocks_partners_list_default_filter" AS ENUM('all', 'partner', 'funder');
  CREATE TYPE "public"."enum_partners_type" AS ENUM('partner', 'funder');
  CREATE TABLE "pages_blocks_partners_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"default_filter" "enum_pages_blocks_partners_list_default_filter" DEFAULT 'all',
  	"show_filter_tabs" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partners_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"default_filter" "enum__pages_v_blocks_partners_list_default_filter" DEFAULT 'all',
  	"show_filter_tabs" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"type" "enum_partners_type" NOT NULL,
  	"logo_id" integer,
  	"website" varchar,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "partners_id" integer;
  ALTER TABLE "pages_blocks_partners_list" ADD CONSTRAINT "pages_blocks_partners_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_list" ADD CONSTRAINT "_pages_v_blocks_partners_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_partners_list_order_idx" ON "pages_blocks_partners_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_list_parent_id_idx" ON "pages_blocks_partners_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_list_path_idx" ON "pages_blocks_partners_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_partners_list_order_idx" ON "_pages_v_blocks_partners_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partners_list_parent_id_idx" ON "_pages_v_blocks_partners_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_list_path_idx" ON "_pages_v_blocks_partners_list" USING btree ("_path");
  CREATE INDEX "partners__order_idx" ON "partners" USING btree ("_order");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_partners_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_partners_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "partners" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_partners_list" CASCADE;
  DROP TABLE "_pages_v_blocks_partners_list" CASCADE;
  DROP TABLE "partners" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_partners_fk";
  
  DROP INDEX "payload_locked_documents_rels_partners_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "partners_id";
  DROP TYPE "public"."enum_pages_blocks_partners_list_default_filter";
  DROP TYPE "public"."enum__pages_v_blocks_partners_list_default_filter";
  DROP TYPE "public"."enum_partners_type";`)
}
