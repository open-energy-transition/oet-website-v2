import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "staff" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "staff" ADD COLUMN "slug_lock" boolean DEFAULT true;
  CREATE INDEX "staff_slug_idx" ON "staff" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "staff_slug_idx";
  ALTER TABLE "staff" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "staff" DROP COLUMN "slug_lock";`)
}
