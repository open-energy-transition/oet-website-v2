import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "outputs_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "outputs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_members_id" integer
  );
  
  CREATE TABLE "_outputs_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_outputs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_members_id" integer
  );
  
  ALTER TABLE "outputs" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "_outputs_v" ADD COLUMN "version_published_at" timestamp(3) with time zone;
  ALTER TABLE "outputs_populated_authors" ADD CONSTRAINT "outputs_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."outputs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "outputs_rels" ADD CONSTRAINT "outputs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."outputs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "outputs_rels" ADD CONSTRAINT "outputs_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_outputs_v_version_populated_authors" ADD CONSTRAINT "_outputs_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_outputs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_outputs_v_rels" ADD CONSTRAINT "_outputs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_outputs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_outputs_v_rels" ADD CONSTRAINT "_outputs_v_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "outputs_populated_authors_order_idx" ON "outputs_populated_authors" USING btree ("_order");
  CREATE INDEX "outputs_populated_authors_parent_id_idx" ON "outputs_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "outputs_rels_order_idx" ON "outputs_rels" USING btree ("order");
  CREATE INDEX "outputs_rels_parent_idx" ON "outputs_rels" USING btree ("parent_id");
  CREATE INDEX "outputs_rels_path_idx" ON "outputs_rels" USING btree ("path");
  CREATE INDEX "outputs_rels_team_members_id_idx" ON "outputs_rels" USING btree ("team_members_id");
  CREATE INDEX "_outputs_v_version_populated_authors_order_idx" ON "_outputs_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_outputs_v_version_populated_authors_parent_id_idx" ON "_outputs_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_outputs_v_rels_order_idx" ON "_outputs_v_rels" USING btree ("order");
  CREATE INDEX "_outputs_v_rels_parent_idx" ON "_outputs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_outputs_v_rels_path_idx" ON "_outputs_v_rels" USING btree ("path");
  CREATE INDEX "_outputs_v_rels_team_members_id_idx" ON "_outputs_v_rels" USING btree ("team_members_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "outputs_populated_authors" CASCADE;
  DROP TABLE "outputs_rels" CASCADE;
  DROP TABLE "_outputs_v_version_populated_authors" CASCADE;
  DROP TABLE "_outputs_v_rels" CASCADE;
  ALTER TABLE "outputs" DROP COLUMN "published_at";
  ALTER TABLE "_outputs_v" DROP COLUMN "version_published_at";`)
}
