import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "publications" ADD COLUMN "pdf_href" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_pdf_href" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "publications" DROP COLUMN "pdf_href";
  ALTER TABLE "_publications_v" DROP COLUMN "version_pdf_href";`)
}
