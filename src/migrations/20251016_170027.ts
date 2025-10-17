import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl', '2xl');
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "pages_blocks_button" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "pages_blocks_our_service" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "pages_blocks_tools_we_support" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "pages_blocks_who_we_are" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "pages_blocks_projects_overview" ADD COLUMN "units_button_link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_button" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_our_service" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_who_we_are" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_projects_overview" ADD COLUMN "units_button_link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "header_nav_items" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';
  ALTER TABLE "footer_about_us_link_actions" ADD COLUMN "link_btn_size" "size" DEFAULT 'md';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" DROP COLUMN "link_btn_size";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_btn_size";
  ALTER TABLE "pages_blocks_button" DROP COLUMN "link_btn_size";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_btn_size";
  ALTER TABLE "pages_blocks_our_service" DROP COLUMN "link_btn_size";
  ALTER TABLE "pages_blocks_tools_we_support" DROP COLUMN "link_btn_size";
  ALTER TABLE "pages_blocks_who_we_are" DROP COLUMN "link_btn_size";
  ALTER TABLE "pages_blocks_projects_overview" DROP COLUMN "units_button_link_btn_size";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN "link_btn_size";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_btn_size";
  ALTER TABLE "_pages_v_blocks_button" DROP COLUMN "link_btn_size";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_btn_size";
  ALTER TABLE "_pages_v_blocks_our_service" DROP COLUMN "link_btn_size";
  ALTER TABLE "_pages_v_blocks_tools_we_support" DROP COLUMN "link_btn_size";
  ALTER TABLE "_pages_v_blocks_who_we_are" DROP COLUMN "link_btn_size";
  ALTER TABLE "_pages_v_blocks_projects_overview" DROP COLUMN "units_button_link_btn_size";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_btn_size";
  ALTER TABLE "footer_nav_items" DROP COLUMN "link_btn_size";
  ALTER TABLE "footer_about_us_link_actions" DROP COLUMN "link_btn_size";
  DROP TYPE "public"."size";`)
}
