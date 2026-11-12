import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_projects_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_publications_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_services_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_events_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_departments_v" ADD COLUMN "autosave" boolean;
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_publications_v_autosave_idx" ON "_publications_v" USING btree ("autosave");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_events_v_autosave_idx" ON "_events_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_departments_v_autosave_idx" ON "_departments_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "_projects_v_autosave_idx";
  DROP INDEX "_publications_v_autosave_idx";
  DROP INDEX "_services_v_autosave_idx";
  DROP INDEX "_events_v_autosave_idx";
  DROP INDEX "_pages_v_autosave_idx";
  DROP INDEX "_departments_v_autosave_idx";
  ALTER TABLE "_projects_v" DROP COLUMN "autosave";
  ALTER TABLE "_publications_v" DROP COLUMN "autosave";
  ALTER TABLE "_services_v" DROP COLUMN "autosave";
  ALTER TABLE "_events_v" DROP COLUMN "autosave";
  ALTER TABLE "_pages_v" DROP COLUMN "autosave";
  ALTER TABLE "_departments_v" DROP COLUMN "autosave";`)
}
