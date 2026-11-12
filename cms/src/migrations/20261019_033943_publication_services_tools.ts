import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "publications_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "publications_rels" ADD COLUMN "tools_id" integer;
  ALTER TABLE "_publications_v_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "_publications_v_rels" ADD COLUMN "tools_id" integer;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_rels" ADD CONSTRAINT "_publications_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_rels" ADD CONSTRAINT "_publications_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "publications_rels_services_id_idx" ON "publications_rels" USING btree ("services_id");
  CREATE INDEX "publications_rels_tools_id_idx" ON "publications_rels" USING btree ("tools_id");
  CREATE INDEX "_publications_v_rels_services_id_idx" ON "_publications_v_rels" USING btree ("services_id");
  CREATE INDEX "_publications_v_rels_tools_id_idx" ON "_publications_v_rels" USING btree ("tools_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "publications_rels" DROP CONSTRAINT "publications_rels_services_fk";
  
  ALTER TABLE "publications_rels" DROP CONSTRAINT "publications_rels_tools_fk";
  
  ALTER TABLE "_publications_v_rels" DROP CONSTRAINT "_publications_v_rels_services_fk";
  
  ALTER TABLE "_publications_v_rels" DROP CONSTRAINT "_publications_v_rels_tools_fk";
  
  DROP INDEX "publications_rels_services_id_idx";
  DROP INDEX "publications_rels_tools_id_idx";
  DROP INDEX "_publications_v_rels_services_id_idx";
  DROP INDEX "_publications_v_rels_tools_id_idx";
  ALTER TABLE "publications_rels" DROP COLUMN "services_id";
  ALTER TABLE "publications_rels" DROP COLUMN "tools_id";
  ALTER TABLE "_publications_v_rels" DROP COLUMN "services_id";
  ALTER TABLE "_publications_v_rels" DROP COLUMN "tools_id";`)
}
