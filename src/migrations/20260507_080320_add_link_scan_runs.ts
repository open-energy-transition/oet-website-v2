import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_link_scan_runs_status" AS ENUM('running', 'completed', 'failed');
  CREATE TYPE "public"."enum_link_scan_runs_trigger" AS ENUM('cron', 'manual');
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
  
  CREATE TABLE "link_scan_runs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_link_scan_runs_status" DEFAULT 'running' NOT NULL,
  	"trigger" "enum_link_scan_runs_trigger" DEFAULT 'cron' NOT NULL,
  	"started_at" timestamp(3) with time zone NOT NULL,
  	"finished_at" timestamp(3) with time zone,
  	"duration_ms" numeric,
  	"total_checked" numeric DEFAULT 0 NOT NULL,
  	"total_failed" numeric DEFAULT 0 NOT NULL,
  	"total_succeeded" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "link_scan_runs_id" integer;
  ALTER TABLE "link_scan_runs_failed_results" ADD CONSTRAINT "link_scan_runs_failed_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."link_scan_runs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "link_scan_runs_failed_results_order_idx" ON "link_scan_runs_failed_results" USING btree ("_order");
  CREATE INDEX "link_scan_runs_failed_results_parent_id_idx" ON "link_scan_runs_failed_results" USING btree ("_parent_id");
  CREATE INDEX "link_scan_runs_updated_at_idx" ON "link_scan_runs" USING btree ("updated_at");
  CREATE INDEX "link_scan_runs_created_at_idx" ON "link_scan_runs" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_link_scan_runs_fk" FOREIGN KEY ("link_scan_runs_id") REFERENCES "public"."link_scan_runs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_link_scan_runs_id_idx" ON "payload_locked_documents_rels" USING btree ("link_scan_runs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "link_scan_runs_failed_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "link_scan_runs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "link_scan_runs_failed_results" CASCADE;
  DROP TABLE "link_scan_runs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_link_scan_runs_fk";
  
  DROP INDEX "payload_locked_documents_rels_link_scan_runs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "link_scan_runs_id";
  DROP TYPE "public"."enum_link_scan_runs_status";
  DROP TYPE "public"."enum_link_scan_runs_trigger";`)
}
