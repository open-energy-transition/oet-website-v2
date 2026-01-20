import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "outputs" ADD COLUMN "output_date" timestamp(3) with time zone;
  ALTER TABLE "_outputs_v" ADD COLUMN "version_output_date" timestamp(3) with time zone;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "outputs" DROP COLUMN "output_date";
  ALTER TABLE "_outputs_v" DROP COLUMN "version_output_date";`)
}
