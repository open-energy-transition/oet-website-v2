import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_populated_authors" ADD COLUMN "image" varchar;
  ALTER TABLE "posts_populated_authors" ADD COLUMN "job_title" varchar;
  ALTER TABLE "posts_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN "image" varchar;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN "job_title" varchar;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "users" ADD COLUMN "image_id" integer;
  ALTER TABLE "users" ADD COLUMN "job_title" varchar;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_rels_team_members_id_idx" ON "posts_rels" USING btree ("team_members_id");
  CREATE INDEX "_posts_v_rels_team_members_id_idx" ON "_posts_v_rels" USING btree ("team_members_id");
  CREATE INDEX "users_image_idx" ON "users" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_team_members_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_team_members_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_image_id_media_id_fk";
  
  DROP INDEX "posts_rels_team_members_id_idx";
  DROP INDEX "_posts_v_rels_team_members_id_idx";
  DROP INDEX "users_image_idx";
  ALTER TABLE "posts_populated_authors" DROP COLUMN "image";
  ALTER TABLE "posts_populated_authors" DROP COLUMN "job_title";
  ALTER TABLE "posts_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "_posts_v_version_populated_authors" DROP COLUMN "image";
  ALTER TABLE "_posts_v_version_populated_authors" DROP COLUMN "job_title";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "users" DROP COLUMN "image_id";
  ALTER TABLE "users" DROP COLUMN "job_title";`)
}
