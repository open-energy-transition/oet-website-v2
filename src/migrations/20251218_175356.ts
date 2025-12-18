import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "departments_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "departments_rels" ADD CONSTRAINT "departments_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "departments_rels_team_members_id_idx" ON "departments_rels" USING btree ("team_members_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "departments_rels" DROP CONSTRAINT "departments_rels_team_members_fk";
  
  DROP INDEX "departments_rels_team_members_id_idx";
  ALTER TABLE "departments_rels" DROP COLUMN "team_members_id";`)
}
