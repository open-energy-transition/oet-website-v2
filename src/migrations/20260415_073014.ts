import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_rels" ADD COLUMN "partners_id" integer;
  ALTER TABLE "_projects_v_rels" ADD COLUMN "partners_id" integer;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_rels_partners_id_idx" ON "projects_rels" USING btree ("partners_id");
  CREATE INDEX "_projects_v_rels_partners_id_idx" ON "_projects_v_rels" USING btree ("partners_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_partners_fk";
  
  ALTER TABLE "_projects_v_rels" DROP CONSTRAINT "_projects_v_rels_partners_fk";
  
  DROP INDEX "projects_rels_partners_id_idx";
  DROP INDEX "_projects_v_rels_partners_id_idx";
  ALTER TABLE "projects_rels" DROP COLUMN "partners_id";
  ALTER TABLE "_projects_v_rels" DROP COLUMN "partners_id";`)
}
