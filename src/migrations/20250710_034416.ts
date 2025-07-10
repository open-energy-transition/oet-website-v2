import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "models_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "models_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_models_links_link_appearance";
  CREATE TYPE "public"."enum_models_links_link_appearance" AS ENUM('default','github', 'internal', 'outline');
  ALTER TABLE "models_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_models_links_link_appearance";
  ALTER TABLE "models_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_models_links_link_appearance" USING "link_appearance"::"public"."enum_models_links_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "models_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "models_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_models_links_link_appearance";
  CREATE TYPE "public"."enum_models_links_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "models_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_models_links_link_appearance";
  ALTER TABLE "models_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_models_links_link_appearance" USING "link_appearance"::"public"."enum_models_links_link_appearance";`)
}
