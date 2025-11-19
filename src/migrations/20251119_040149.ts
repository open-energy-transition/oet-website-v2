import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum_pages_blocks_button_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum_pages_blocks_our_service_services_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum_pages_blocks_tools_we_support_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum_pages_blocks_who_we_are_items_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum_pages_blocks_projects_overview_units_button_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_button_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_our_service_services_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_tools_we_support_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_who_we_are_items_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_overview_units_button_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum_header_nav_items_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum_footer_nav_items_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum_footer_about_us_link_actions_link_pos" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum_footer_contact_us_link_actions_link_pos" AS ENUM('start', 'center', 'end');
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_pos" "enum_pages_hero_links_link_pos" DEFAULT 'start';
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_pos" "enum_pages_blocks_cta_links_link_pos" DEFAULT 'start';
  ALTER TABLE "pages_blocks_button" ADD COLUMN "link_pos" "enum_pages_blocks_button_link_pos" DEFAULT 'start';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_pos" "enum_pages_blocks_content_columns_link_pos" DEFAULT 'start';
  ALTER TABLE "pages_blocks_our_service_services" ADD COLUMN "link_pos" "enum_pages_blocks_our_service_services_link_pos" DEFAULT 'start';
  ALTER TABLE "pages_blocks_tools_we_support" ADD COLUMN "link_pos" "enum_pages_blocks_tools_we_support_link_pos" DEFAULT 'start';
  ALTER TABLE "pages_blocks_who_we_are_items" ADD COLUMN "link_pos" "enum_pages_blocks_who_we_are_items_link_pos" DEFAULT 'start';
  ALTER TABLE "pages_blocks_projects_overview" ADD COLUMN "units_button_link_pos" "enum_pages_blocks_projects_overview_units_button_link_pos" DEFAULT 'start';
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_pos" "enum__pages_v_version_hero_links_link_pos" DEFAULT 'start';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_pos" "enum__pages_v_blocks_cta_links_link_pos" DEFAULT 'start';
  ALTER TABLE "_pages_v_blocks_button" ADD COLUMN "link_pos" "enum__pages_v_blocks_button_link_pos" DEFAULT 'start';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_pos" "enum__pages_v_blocks_content_columns_link_pos" DEFAULT 'start';
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD COLUMN "link_pos" "enum__pages_v_blocks_our_service_services_link_pos" DEFAULT 'start';
  ALTER TABLE "_pages_v_blocks_tools_we_support" ADD COLUMN "link_pos" "enum__pages_v_blocks_tools_we_support_link_pos" DEFAULT 'start';
  ALTER TABLE "_pages_v_blocks_who_we_are_items" ADD COLUMN "link_pos" "enum__pages_v_blocks_who_we_are_items_link_pos" DEFAULT 'start';
  ALTER TABLE "_pages_v_blocks_projects_overview" ADD COLUMN "units_button_link_pos" "enum__pages_v_blocks_projects_overview_units_button_link_pos" DEFAULT 'start';
  ALTER TABLE "header_nav_items" ADD COLUMN "link_pos" "enum_header_nav_items_link_pos" DEFAULT 'start';
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_pos" "enum_footer_nav_items_link_pos" DEFAULT 'start';
  ALTER TABLE "footer_about_us_link_actions" ADD COLUMN "link_pos" "enum_footer_about_us_link_actions_link_pos" DEFAULT 'start';
  ALTER TABLE "footer_contact_us_link_actions" ADD COLUMN "link_pos" "enum_footer_contact_us_link_actions_link_pos" DEFAULT 'start';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" DROP COLUMN "link_pos";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_pos";
  ALTER TABLE "pages_blocks_button" DROP COLUMN "link_pos";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_pos";
  ALTER TABLE "pages_blocks_our_service_services" DROP COLUMN "link_pos";
  ALTER TABLE "pages_blocks_tools_we_support" DROP COLUMN "link_pos";
  ALTER TABLE "pages_blocks_who_we_are_items" DROP COLUMN "link_pos";
  ALTER TABLE "pages_blocks_projects_overview" DROP COLUMN "units_button_link_pos";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN "link_pos";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_pos";
  ALTER TABLE "_pages_v_blocks_button" DROP COLUMN "link_pos";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_pos";
  ALTER TABLE "_pages_v_blocks_our_service_services" DROP COLUMN "link_pos";
  ALTER TABLE "_pages_v_blocks_tools_we_support" DROP COLUMN "link_pos";
  ALTER TABLE "_pages_v_blocks_who_we_are_items" DROP COLUMN "link_pos";
  ALTER TABLE "_pages_v_blocks_projects_overview" DROP COLUMN "units_button_link_pos";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_pos";
  ALTER TABLE "footer_nav_items" DROP COLUMN "link_pos";
  ALTER TABLE "footer_about_us_link_actions" DROP COLUMN "link_pos";
  ALTER TABLE "footer_contact_us_link_actions" DROP COLUMN "link_pos";
  DROP TYPE "public"."enum_pages_hero_links_link_pos";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_pos";
  DROP TYPE "public"."enum_pages_blocks_button_link_pos";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_pos";
  DROP TYPE "public"."enum_pages_blocks_our_service_services_link_pos";
  DROP TYPE "public"."enum_pages_blocks_tools_we_support_link_pos";
  DROP TYPE "public"."enum_pages_blocks_who_we_are_items_link_pos";
  DROP TYPE "public"."enum_pages_blocks_projects_overview_units_button_link_pos";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_pos";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_pos";
  DROP TYPE "public"."enum__pages_v_blocks_button_link_pos";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_pos";
  DROP TYPE "public"."enum__pages_v_blocks_our_service_services_link_pos";
  DROP TYPE "public"."enum__pages_v_blocks_tools_we_support_link_pos";
  DROP TYPE "public"."enum__pages_v_blocks_who_we_are_items_link_pos";
  DROP TYPE "public"."enum__pages_v_blocks_projects_overview_units_button_link_pos";
  DROP TYPE "public"."enum_header_nav_items_link_pos";
  DROP TYPE "public"."enum_footer_nav_items_link_pos";
  DROP TYPE "public"."enum_footer_about_us_link_actions_link_pos";
  DROP TYPE "public"."enum_footer_contact_us_link_actions_link_pos";`)
}
