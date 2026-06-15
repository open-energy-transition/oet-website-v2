import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_spacing" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_button_spacing" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TABLE "link_scan_runs_failed_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"final_url" varchar,
  	"status_code" numeric,
  	"duration_ms" numeric,
  	"source_collection" varchar,
  	"source_id" varchar,
  	"source_title" varchar,
  	"source_path" varchar,
  	"error" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  ALTER TABLE "link_scan_runs_results" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "link_scan_runs_results" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk";
  
  DROP INDEX "pages_blocks_projects_overview_units_button_link_units_button_link_icon_idx";
  DROP INDEX "_pages_v_blocks_projects_overview_units_button_link_units_button_link_icon_idx";
  DROP INDEX "payload_locked_documents_rels_payload_jobs_id_idx";
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "pages_blocks_button" ADD COLUMN "spacing" "enum_pages_blocks_button_spacing" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_button" ADD COLUMN "spacing" "enum__pages_v_blocks_button_spacing" DEFAULT 'none';
  ALTER TABLE "link_scan_runs" ADD COLUMN "total_succeeded" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "link_scan_runs_failed_results" ADD CONSTRAINT "link_scan_runs_failed_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."link_scan_runs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "link_scan_runs_failed_results_order_idx" ON "link_scan_runs_failed_results" USING btree ("_order");
  CREATE INDEX "link_scan_runs_failed_results_parent_id_idx" ON "link_scan_runs_failed_results" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "pages_blocks_projects_overview_units_button_link_units_b_idx" ON "pages_blocks_projects_overview" USING btree ("units_button_link_icon_id");
  CREATE INDEX "_pages_v_blocks_projects_overview_units_button_link_unit_idx" ON "_pages_v_blocks_projects_overview" USING btree ("units_button_link_icon_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_jobs_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "link_scan_runs_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"final_url" varchar,
  	"ok" boolean DEFAULT false NOT NULL,
  	"status_code" numeric,
  	"duration_ms" numeric,
  	"source_collection" varchar,
  	"source_id" varchar,
  	"source_title" varchar,
  	"source_path" varchar,
  	"error" varchar
  );
  
  ALTER TABLE "link_scan_runs_failed_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "link_scan_runs_failed_results" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP INDEX "pages_blocks_projects_overview_units_button_link_units_b_idx";
  DROP INDEX "_pages_v_blocks_projects_overview_units_button_link_unit_idx";
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_jobs_id" integer;
  ALTER TABLE "link_scan_runs_results" ADD CONSTRAINT "link_scan_runs_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."link_scan_runs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "link_scan_runs_results_order_idx" ON "link_scan_runs_results" USING btree ("_order");
  CREATE INDEX "link_scan_runs_results_parent_id_idx" ON "link_scan_runs_results" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_projects_overview_units_button_link_units_button_link_icon_idx" ON "pages_blocks_projects_overview" USING btree ("units_button_link_icon_id");
  CREATE INDEX "_pages_v_blocks_projects_overview_units_button_link_units_button_link_icon_idx" ON "_pages_v_blocks_projects_overview" USING btree ("units_button_link_icon_id");
  CREATE INDEX "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  CREATE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  ALTER TABLE "pages_blocks_button" DROP COLUMN "spacing";
  ALTER TABLE "_pages_v_blocks_button" DROP COLUMN "spacing";
  ALTER TABLE "link_scan_runs" DROP COLUMN "total_succeeded";
  DROP TYPE "public"."enum_pages_blocks_button_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_button_spacing";`)
}
