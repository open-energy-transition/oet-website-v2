import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "team_members" ADD COLUMN "_order" varchar;
  CREATE INDEX "team_members__order_idx" ON "team_members" USING btree ("_order");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "team_members__order_idx";
  ALTER TABLE "team_members" DROP COLUMN "_order";`)
}
