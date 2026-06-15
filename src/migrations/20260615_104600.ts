import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_spacing" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_button_spacing" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  
  DROP INDEX "pages_blocks_projects_overview_units_button_link_units_button_link_icon_idx";
  DROP INDEX "_pages_v_blocks_projects_overview_units_button_link_units_button_link_icon_idx";
  ALTER TABLE "pages_blocks_button" ADD COLUMN "spacing" "enum_pages_blocks_button_spacing" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_button" ADD COLUMN "spacing" "enum__pages_v_blocks_button_spacing" DEFAULT 'none';
  CREATE INDEX "pages_blocks_projects_overview_units_button_link_units_b_idx" ON "pages_blocks_projects_overview" USING btree ("units_button_link_icon_id");
  CREATE INDEX "_pages_v_blocks_projects_overview_units_button_link_unit_idx" ON "_pages_v_blocks_projects_overview" USING btree ("units_button_link_icon_id");
`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX "pages_blocks_projects_overview_units_button_link_units_b_idx";
  DROP INDEX "_pages_v_blocks_projects_overview_units_button_link_unit_idx";
  CREATE INDEX "pages_blocks_projects_overview_units_button_link_units_button_link_icon_idx" ON "pages_blocks_projects_overview" USING btree ("units_button_link_icon_id");
  CREATE INDEX "_pages_v_blocks_projects_overview_units_button_link_units_button_link_icon_idx" ON "_pages_v_blocks_projects_overview" USING btree ("units_button_link_icon_id");
  ALTER TABLE "pages_blocks_button" DROP COLUMN "spacing";
  ALTER TABLE "_pages_v_blocks_button" DROP COLUMN "spacing";
  DROP TYPE "public"."enum_pages_blocks_button_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_button_spacing";`)
}
