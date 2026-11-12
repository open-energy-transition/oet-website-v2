import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site_settings_locales" ADD COLUMN "consent_notice" varchar NOT NULL DEFAULT 'We use cookies that this website needs to work. With your consent we also use Google Tag Manager to understand how the website is used. You can change your choice at any time under Cookies Settings.';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "consent_notice" DROP DEFAULT;
  ALTER TABLE "site_settings_locales" ADD COLUMN "consent_modal_title" varchar NOT NULL DEFAULT 'Privacy settings';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "consent_modal_title" DROP DEFAULT;
  ALTER TABLE "site_settings_locales" ADD COLUMN "consent_modal_description" varchar NOT NULL DEFAULT 'Choose which services this website may use. Necessary services are always on; analytics only runs if you allow it.';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "consent_modal_description" DROP DEFAULT;
  ALTER TABLE "site_settings_locales" ADD COLUMN "consent_necessary_title" varchar NOT NULL DEFAULT 'Necessary';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "consent_necessary_title" DROP DEFAULT;
  ALTER TABLE "site_settings_locales" ADD COLUMN "consent_necessary_description" varchar NOT NULL DEFAULT 'Stores your privacy choices so the banner does not appear again.';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "consent_necessary_description" DROP DEFAULT;
  ALTER TABLE "site_settings_locales" ADD COLUMN "consent_analytics_title" varchar NOT NULL DEFAULT 'Google Tag Manager';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "consent_analytics_title" DROP DEFAULT;
  ALTER TABLE "site_settings_locales" ADD COLUMN "consent_analytics_description" varchar NOT NULL DEFAULT 'Measures visits and page use so we can improve the website. The data is processed by Google.';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "consent_analytics_description" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_locales" DROP COLUMN "consent_notice";
  ALTER TABLE "site_settings_locales" DROP COLUMN "consent_modal_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "consent_modal_description";
  ALTER TABLE "site_settings_locales" DROP COLUMN "consent_necessary_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "consent_necessary_description";
  ALTER TABLE "site_settings_locales" DROP COLUMN "consent_analytics_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "consent_analytics_description";`)
}
