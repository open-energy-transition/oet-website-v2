import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "staff" ADD COLUMN "head_of_department_id" integer;
  ALTER TABLE "staff" ADD CONSTRAINT "staff_head_of_department_id_team_members_id_fk" FOREIGN KEY ("head_of_department_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "staff_head_of_department_idx" ON "staff" USING btree ("head_of_department_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "staff" DROP CONSTRAINT "staff_head_of_department_id_team_members_id_fk";
  
  DROP INDEX "staff_head_of_department_idx";
  ALTER TABLE "staff" DROP COLUMN "head_of_department_id";`)
}
