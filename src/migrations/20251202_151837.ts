import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_project_aims_items" ADD COLUMN "is_publish" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_project_aims_items" ADD COLUMN "is_publish" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_project_aims_items" DROP COLUMN "is_publish";
  ALTER TABLE "_pages_v_blocks_project_aims_items" DROP COLUMN "is_publish";`)
}
