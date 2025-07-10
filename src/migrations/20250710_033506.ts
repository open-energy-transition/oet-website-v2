import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_models_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_models_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "models_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_models_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_models_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "models" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "models_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "models_id" integer;
  ALTER TABLE "models_links" ADD CONSTRAINT "models_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "models_rels" ADD CONSTRAINT "models_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "models_rels" ADD CONSTRAINT "models_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "models_rels" ADD CONSTRAINT "models_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "models_links_order_idx" ON "models_links" USING btree ("_order");
  CREATE INDEX "models_links_parent_id_idx" ON "models_links" USING btree ("_parent_id");
  CREATE INDEX "models_updated_at_idx" ON "models" USING btree ("updated_at");
  CREATE INDEX "models_created_at_idx" ON "models" USING btree ("created_at");
  CREATE INDEX "models_rels_order_idx" ON "models_rels" USING btree ("order");
  CREATE INDEX "models_rels_parent_idx" ON "models_rels" USING btree ("parent_id");
  CREATE INDEX "models_rels_path_idx" ON "models_rels" USING btree ("path");
  CREATE INDEX "models_rels_pages_id_idx" ON "models_rels" USING btree ("pages_id");
  CREATE INDEX "models_rels_posts_id_idx" ON "models_rels" USING btree ("posts_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_models_fk" FOREIGN KEY ("models_id") REFERENCES "public"."models"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_models_id_idx" ON "payload_locked_documents_rels" USING btree ("models_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "models_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "models" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "models_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "models_links" CASCADE;
  DROP TABLE "models" CASCADE;
  DROP TABLE "models_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_models_fk";
  
  DROP INDEX "payload_locked_documents_rels_models_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "models_id";
  DROP TYPE "public"."enum_models_links_link_type";
  DROP TYPE "public"."enum_models_links_link_appearance";`)
}
