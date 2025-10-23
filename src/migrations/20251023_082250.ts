import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "staff" ADD COLUMN "_order" varchar;
  CREATE INDEX "staff__order_idx" ON "staff" USING btree ("_order");
  ALTER TABLE "staff" DROP COLUMN "order";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "staff__order_idx";
  ALTER TABLE "staff" ADD COLUMN "order" numeric;
  ALTER TABLE "staff" DROP COLUMN "_order";`)
}
