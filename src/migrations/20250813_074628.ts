import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."b_bg" AS ENUM('#ffffff', '#000000', '#E41E3C', '#D7E4BF80');
  CREATE TYPE "public"."text_color" AS ENUM('#000000', '#ffffff', '#D7E4BF80', '#E41E3C');
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff';
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000';
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000';
  ALTER TABLE "pages_blocks_button" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "pages_blocks_button" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_button" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000';
  ALTER TABLE "pages_blocks_projects_overview" ADD COLUMN "units_button_link_icon_id" integer;
  ALTER TABLE "pages_blocks_projects_overview" ADD COLUMN "units_button_link_btn_bg_color" "b_bg" DEFAULT '#ffffff';
  ALTER TABLE "pages_blocks_projects_overview" ADD COLUMN "units_button_link_btn_text_color" text_color DEFAULT '#000000';
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_button" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_button" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_button" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000';
  ALTER TABLE "_pages_v_blocks_projects_overview" ADD COLUMN "units_button_link_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_projects_overview" ADD COLUMN "units_button_link_btn_bg_color" "b_bg" DEFAULT '#ffffff';
  ALTER TABLE "_pages_v_blocks_projects_overview" ADD COLUMN "units_button_link_btn_text_color" text_color DEFAULT '#000000';
  ALTER TABLE "models_links" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "models_links" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff' NOT NULL;
  ALTER TABLE "models_links" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000' NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff' NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000' NOT NULL;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff' NOT NULL;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000' NOT NULL;
  ALTER TABLE "footer_follow_us_link_actions" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "footer_follow_us_link_actions" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff' NOT NULL;
  ALTER TABLE "footer_follow_us_link_actions" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000' NOT NULL;
  ALTER TABLE "footer_about_us_link_actions" ADD COLUMN "link_icon_id" integer;
  ALTER TABLE "footer_about_us_link_actions" ADD COLUMN "link_btn_bg_color" "b_bg" DEFAULT '#ffffff' NOT NULL;
  ALTER TABLE "footer_about_us_link_actions" ADD COLUMN "link_btn_text_color" text_color DEFAULT '#000000' NOT NULL;
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_overview" ADD CONSTRAINT "pages_blocks_projects_overview_units_button_link_icon_id_icons_id_fk" FOREIGN KEY ("units_button_link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button" ADD CONSTRAINT "_pages_v_blocks_button_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_overview" ADD CONSTRAINT "_pages_v_blocks_projects_overview_units_button_link_icon_id_icons_id_fk" FOREIGN KEY ("units_button_link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "models_links" ADD CONSTRAINT "models_links_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_follow_us_link_actions" ADD CONSTRAINT "footer_follow_us_link_actions_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_about_us_link_actions" ADD CONSTRAINT "footer_about_us_link_actions_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_links_link_link_icon_idx" ON "pages_hero_links" USING btree ("link_icon_id");
  CREATE INDEX "pages_blocks_cta_links_link_link_icon_idx" ON "pages_blocks_cta_links" USING btree ("link_icon_id");
  CREATE INDEX "pages_blocks_button_link_link_icon_idx" ON "pages_blocks_button" USING btree ("link_icon_id");
  CREATE INDEX "pages_blocks_content_columns_link_link_icon_idx" ON "pages_blocks_content_columns" USING btree ("link_icon_id");
  CREATE INDEX "pages_blocks_projects_overview_units_button_link_units_button_link_icon_idx" ON "pages_blocks_projects_overview" USING btree ("units_button_link_icon_id");
  CREATE INDEX "_pages_v_version_hero_links_link_link_icon_idx" ON "_pages_v_version_hero_links" USING btree ("link_icon_id");
  CREATE INDEX "_pages_v_blocks_cta_links_link_link_icon_idx" ON "_pages_v_blocks_cta_links" USING btree ("link_icon_id");
  CREATE INDEX "_pages_v_blocks_button_link_link_icon_idx" ON "_pages_v_blocks_button" USING btree ("link_icon_id");
  CREATE INDEX "_pages_v_blocks_content_columns_link_link_icon_idx" ON "_pages_v_blocks_content_columns" USING btree ("link_icon_id");
  CREATE INDEX "_pages_v_blocks_projects_overview_units_button_link_units_button_link_icon_idx" ON "_pages_v_blocks_projects_overview" USING btree ("units_button_link_icon_id");
  CREATE INDEX "models_links_link_link_icon_idx" ON "models_links" USING btree ("link_icon_id");
  CREATE INDEX "header_nav_items_link_link_icon_idx" ON "header_nav_items" USING btree ("link_icon_id");
  CREATE INDEX "footer_nav_items_link_link_icon_idx" ON "footer_nav_items" USING btree ("link_icon_id");
  CREATE INDEX "footer_follow_us_link_actions_link_link_icon_idx" ON "footer_follow_us_link_actions" USING btree ("link_icon_id");
  CREATE INDEX "footer_about_us_link_actions_link_link_icon_idx" ON "footer_about_us_link_actions" USING btree ("link_icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" DROP CONSTRAINT "pages_hero_links_link_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_cta_links" DROP CONSTRAINT "pages_blocks_cta_links_link_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_button" DROP CONSTRAINT "pages_blocks_button_link_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_content_columns" DROP CONSTRAINT "pages_blocks_content_columns_link_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_projects_overview" DROP CONSTRAINT "pages_blocks_projects_overview_units_button_link_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_version_hero_links" DROP CONSTRAINT "_pages_v_version_hero_links_link_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_cta_links" DROP CONSTRAINT "_pages_v_blocks_cta_links_link_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_button" DROP CONSTRAINT "_pages_v_blocks_button_link_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_content_columns" DROP CONSTRAINT "_pages_v_blocks_content_columns_link_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_projects_overview" DROP CONSTRAINT "_pages_v_blocks_projects_overview_units_button_link_icon_id_icons_id_fk";
  
  ALTER TABLE "models_links" DROP CONSTRAINT "models_links_link_icon_id_icons_id_fk";
  
  ALTER TABLE "header_nav_items" DROP CONSTRAINT "header_nav_items_link_icon_id_icons_id_fk";
  
  ALTER TABLE "footer_nav_items" DROP CONSTRAINT "footer_nav_items_link_icon_id_icons_id_fk";
  
  ALTER TABLE "footer_follow_us_link_actions" DROP CONSTRAINT "footer_follow_us_link_actions_link_icon_id_icons_id_fk";
  
  ALTER TABLE "footer_about_us_link_actions" DROP CONSTRAINT "footer_about_us_link_actions_link_icon_id_icons_id_fk";
  
  DROP INDEX "pages_hero_links_link_link_icon_idx";
  DROP INDEX "pages_blocks_cta_links_link_link_icon_idx";
  DROP INDEX "pages_blocks_button_link_link_icon_idx";
  DROP INDEX "pages_blocks_content_columns_link_link_icon_idx";
  DROP INDEX "pages_blocks_projects_overview_units_button_link_units_button_link_icon_idx";
  DROP INDEX "_pages_v_version_hero_links_link_link_icon_idx";
  DROP INDEX "_pages_v_blocks_cta_links_link_link_icon_idx";
  DROP INDEX "_pages_v_blocks_button_link_link_icon_idx";
  DROP INDEX "_pages_v_blocks_content_columns_link_link_icon_idx";
  DROP INDEX "_pages_v_blocks_projects_overview_units_button_link_units_button_link_icon_idx";
  DROP INDEX "models_links_link_link_icon_idx";
  DROP INDEX "header_nav_items_link_link_icon_idx";
  DROP INDEX "footer_nav_items_link_link_icon_idx";
  DROP INDEX "footer_follow_us_link_actions_link_link_icon_idx";
  DROP INDEX "footer_about_us_link_actions_link_link_icon_idx";
  ALTER TABLE "pages_hero_links" DROP COLUMN "link_icon_id";
  ALTER TABLE "pages_hero_links" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "pages_hero_links" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_icon_id";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "pages_blocks_button" DROP COLUMN "link_icon_id";
  ALTER TABLE "pages_blocks_button" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "pages_blocks_button" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_icon_id";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "pages_blocks_projects_overview" DROP COLUMN "units_button_link_icon_id";
  ALTER TABLE "pages_blocks_projects_overview" DROP COLUMN "units_button_link_btn_bg_color";
  ALTER TABLE "pages_blocks_projects_overview" DROP COLUMN "units_button_link_btn_text_color";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN "link_icon_id";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_icon_id";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "_pages_v_blocks_button" DROP COLUMN "link_icon_id";
  ALTER TABLE "_pages_v_blocks_button" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "_pages_v_blocks_button" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_icon_id";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "_pages_v_blocks_projects_overview" DROP COLUMN "units_button_link_icon_id";
  ALTER TABLE "_pages_v_blocks_projects_overview" DROP COLUMN "units_button_link_btn_bg_color";
  ALTER TABLE "_pages_v_blocks_projects_overview" DROP COLUMN "units_button_link_btn_text_color";
  ALTER TABLE "models_links" DROP COLUMN "link_icon_id";
  ALTER TABLE "models_links" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "models_links" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_icon_id";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "footer_nav_items" DROP COLUMN "link_icon_id";
  ALTER TABLE "footer_nav_items" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "footer_nav_items" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "footer_follow_us_link_actions" DROP COLUMN "link_icon_id";
  ALTER TABLE "footer_follow_us_link_actions" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "footer_follow_us_link_actions" DROP COLUMN "link_btn_text_color";
  ALTER TABLE "footer_about_us_link_actions" DROP COLUMN "link_icon_id";
  ALTER TABLE "footer_about_us_link_actions" DROP COLUMN "link_btn_bg_color";
  ALTER TABLE "footer_about_us_link_actions" DROP COLUMN "link_btn_text_color";
  DROP TYPE "public"."b_bg";
  DROP TYPE "public"."text_color";`)
}
