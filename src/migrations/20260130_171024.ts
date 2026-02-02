import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team_members" ADD COLUMN "default_staff_category_id" integer;
  ALTER TABLE "_pages_v_blocks_team_members" ADD COLUMN "default_staff_category_id" integer;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_default_staff_category_id_staff_id_fk" FOREIGN KEY ("default_staff_category_id") REFERENCES "public"."staff"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_default_staff_category_id_staff_id_fk" FOREIGN KEY ("default_staff_category_id") REFERENCES "public"."staff"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_team_members_default_staff_category_idx" ON "pages_blocks_team_members" USING btree ("default_staff_category_id");
  CREATE INDEX "_pages_v_blocks_team_members_default_staff_category_idx" ON "_pages_v_blocks_team_members" USING btree ("default_staff_category_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team_members" DROP CONSTRAINT "pages_blocks_team_members_default_staff_category_id_staff_id_fk";
  
  ALTER TABLE "_pages_v_blocks_team_members" DROP CONSTRAINT "_pages_v_blocks_team_members_default_staff_category_id_staff_id_fk";
  
  DROP INDEX "pages_blocks_team_members_default_staff_category_idx";
  DROP INDEX "_pages_v_blocks_team_members_default_staff_category_idx";
  ALTER TABLE "pages_blocks_team_members" DROP COLUMN "default_staff_category_id";
  ALTER TABLE "_pages_v_blocks_team_members" DROP COLUMN "default_staff_category_id";`)
}
