import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_team_members_education_kind" AS ENUM('doctorate', 'degree');
  CREATE TYPE "public"."enum_team_members_portrait_kind" AS ENUM('cut-out', 'photo');
  CREATE TABLE "team_members_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_team_members_education_kind" NOT NULL
  );
  
  CREATE TABLE "team_members_education_locales" (
  	"degree" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "team_members" ADD COLUMN "last_name" varchar;
  ALTER TABLE "team_members" ADD COLUMN "profile_label" varchar;
  ALTER TABLE "team_members" ADD COLUMN "biography_html" varchar;
  ALTER TABLE "team_members" ADD COLUMN "portrait_kind" "enum_team_members_portrait_kind";
  UPDATE "team_members" SET "last_name" = regexp_replace("name", '^.* ', '');
  UPDATE "team_members" SET "profile_label" = "team_members_locales"."profile_label" FROM "team_members_locales" WHERE "team_members_locales"."_parent_id" = "team_members"."id" AND "team_members_locales"."_locale" = 'en';
  UPDATE "team_members" SET "portrait_kind" = 'cut-out';
  ALTER TABLE "team_members" ALTER COLUMN "last_name" SET NOT NULL;
  ALTER TABLE "team_members" ALTER COLUMN "profile_label" SET NOT NULL;
  ALTER TABLE "team_members" ALTER COLUMN "portrait_kind" SET NOT NULL;
  ALTER TABLE "team_members_locales" ADD COLUMN "biography" jsonb;
  ALTER TABLE "team_members_education" ADD CONSTRAINT "team_members_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_education_locales" ADD CONSTRAINT "team_members_education_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members_education"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "team_members_education_order_idx" ON "team_members_education" USING btree ("_order");
  CREATE INDEX "team_members_education_parent_id_idx" ON "team_members_education" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "team_members_education_locales_locale_parent_id_unique" ON "team_members_education_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "team_members" DROP COLUMN "profile_href";
  ALTER TABLE "team_members_locales" DROP COLUMN "profile_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "team_members_education" CASCADE;
  DROP TABLE "team_members_education_locales" CASCADE;
  ALTER TABLE "team_members" ADD COLUMN "profile_href" varchar NOT NULL;
  ALTER TABLE "team_members_locales" ADD COLUMN "profile_label" varchar NOT NULL;
  ALTER TABLE "team_members" DROP COLUMN "last_name";
  ALTER TABLE "team_members" DROP COLUMN "profile_label";
  ALTER TABLE "team_members" DROP COLUMN "biography_html";
  ALTER TABLE "team_members" DROP COLUMN "portrait_kind";
  ALTER TABLE "team_members_locales" DROP COLUMN "biography";
  DROP TYPE "public"."enum_team_members_education_kind";
  DROP TYPE "public"."enum_team_members_portrait_kind";`)
}
