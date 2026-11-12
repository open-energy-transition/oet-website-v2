import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_site_settings_social_links_kind" ADD VALUE 'eventbrite';
  ALTER TYPE "public"."enum_site_settings_social_links_kind" ADD VALUE 'newsletter';
  CREATE TABLE "site_settings_social_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "home_page" ADD COLUMN "partners_visible" boolean DEFAULT true NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "projects_visible" boolean DEFAULT true NOT NULL;
  ALTER TABLE "site_settings_social_links_locales" ADD CONSTRAINT "site_settings_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_social_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "site_settings_social_links_locales_locale_parent_id_unique" ON "site_settings_social_links_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_social_links_locales" CASCADE;
  ALTER TABLE "site_settings_social_links" ALTER COLUMN "kind" SET DATA TYPE text;
  DROP TYPE "public"."enum_site_settings_social_links_kind";
  CREATE TYPE "public"."enum_site_settings_social_links_kind" AS ENUM('linkedin', 'github', 'x', 'youtube', 'bluesky', 'mastodon');
  ALTER TABLE "site_settings_social_links" ALTER COLUMN "kind" SET DATA TYPE "public"."enum_site_settings_social_links_kind" USING "kind"::"public"."enum_site_settings_social_links_kind";
  ALTER TABLE "home_page" DROP COLUMN "partners_visible";
  ALTER TABLE "home_page" DROP COLUMN "projects_visible";`)
}
