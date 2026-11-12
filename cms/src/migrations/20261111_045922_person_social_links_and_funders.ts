import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_contact_social_links_kind" AS ENUM('email', 'github', 'linkedin', 'message', 'x', 'youtube', 'bluesky', 'mastodon', 'eventbrite', 'newsletter');
  CREATE TYPE "public"."enum__projects_v_version_contact_social_links_kind" AS ENUM('email', 'github', 'linkedin', 'message', 'x', 'youtube', 'bluesky', 'mastodon', 'eventbrite', 'newsletter');
  CREATE TYPE "public"."enum_publications_authors_social_links_kind" AS ENUM('email', 'github', 'linkedin', 'message', 'x', 'youtube', 'bluesky', 'mastodon', 'eventbrite', 'newsletter');
  CREATE TYPE "public"."enum__publications_v_version_authors_social_links_kind" AS ENUM('email', 'github', 'linkedin', 'message', 'x', 'youtube', 'bluesky', 'mastodon', 'eventbrite', 'newsletter');
  ALTER TYPE "public"."enum_team_members_social_links_kind" ADD VALUE 'x';
  ALTER TYPE "public"."enum_team_members_social_links_kind" ADD VALUE 'youtube';
  ALTER TYPE "public"."enum_team_members_social_links_kind" ADD VALUE 'bluesky';
  ALTER TYPE "public"."enum_team_members_social_links_kind" ADD VALUE 'mastodon';
  ALTER TYPE "public"."enum_team_members_social_links_kind" ADD VALUE 'eventbrite';
  ALTER TYPE "public"."enum_team_members_social_links_kind" ADD VALUE 'newsletter';
  CREATE TABLE "projects_contact_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_projects_contact_social_links_kind",
  	"href" varchar
  );
  
  CREATE TABLE "_projects_v_version_contact_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__projects_v_version_contact_social_links_kind",
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "publications_authors_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_publications_authors_social_links_kind",
  	"href" varchar
  );
  
  CREATE TABLE "_publications_v_version_authors_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__publications_v_version_authors_social_links_kind",
  	"href" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "projects_contact_social_links" ADD CONSTRAINT "projects_contact_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_contact_social_links" ADD CONSTRAINT "_projects_v_version_contact_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_authors_social_links" ADD CONSTRAINT "publications_authors_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_version_authors_social_links" ADD CONSTRAINT "_publications_v_version_authors_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v_version_authors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_contact_social_links_order_idx" ON "projects_contact_social_links" USING btree ("_order");
  CREATE INDEX "projects_contact_social_links_parent_id_idx" ON "projects_contact_social_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_contact_social_links_order_idx" ON "_projects_v_version_contact_social_links" USING btree ("_order");
  CREATE INDEX "_projects_v_version_contact_social_links_parent_id_idx" ON "_projects_v_version_contact_social_links" USING btree ("_parent_id");
  CREATE INDEX "publications_authors_social_links_order_idx" ON "publications_authors_social_links" USING btree ("_order");
  CREATE INDEX "publications_authors_social_links_parent_id_idx" ON "publications_authors_social_links" USING btree ("_parent_id");
  CREATE INDEX "_publications_v_version_authors_social_links_order_idx" ON "_publications_v_version_authors_social_links" USING btree ("_order");
  CREATE INDEX "_publications_v_version_authors_social_links_parent_id_idx" ON "_publications_v_version_authors_social_links" USING btree ("_parent_id");
  DO $$
  BEGIN
    IF EXISTS (SELECT 1 FROM "projects" WHERE "contact_profile_href" <> '' AND "contact_profile_href" NOT LIKE 'mailto:%')
      OR EXISTS (SELECT 1 FROM "_projects_v" WHERE "version_contact_profile_href" <> '' AND "version_contact_profile_href" NOT LIKE 'mailto:%')
      OR EXISTS (SELECT 1 FROM "publications_authors" WHERE "profile_href" <> '' AND "profile_href" NOT LIKE 'mailto:%')
      OR EXISTS (SELECT 1 FROM "_publications_v_version_authors" WHERE "profile_href" <> '' AND "profile_href" NOT LIKE 'mailto:%')
    THEN
      RAISE EXCEPTION 'A person profile link is not a mailto: address; decide its network before migrating';
    END IF;
  END $$;
  INSERT INTO "projects_contact_social_links" ("_order", "_parent_id", "id", "kind", "href")
  SELECT l.ord, p."id", substr(md5(random()::text || clock_timestamp()::text || p."id"::text || l.ord::text), 1, 24), l.kind::"enum_projects_contact_social_links_kind", l.href
  FROM "projects" p
  CROSS JOIN LATERAL (VALUES (1, 'email', p."contact_profile_href"), (2, 'github', p."contact_github_href"), (3, 'linkedin', p."contact_linkedin_href")) AS l(ord, kind, href)
  WHERE p."contact_kind" = 'external' AND l.href <> '';
  INSERT INTO "_projects_v_version_contact_social_links" ("_order", "_parent_id", "kind", "href", "_uuid")
  SELECT l.ord, v."id", l.kind::"enum__projects_v_version_contact_social_links_kind", l.href, substr(md5(random()::text || clock_timestamp()::text || v."id"::text || l.ord::text), 1, 24)
  FROM "_projects_v" v
  CROSS JOIN LATERAL (VALUES (1, 'email', v."version_contact_profile_href"), (2, 'github', v."version_contact_github_href"), (3, 'linkedin', v."version_contact_linkedin_href")) AS l(ord, kind, href)
  WHERE v."version_contact_kind" = 'external' AND l.href <> '';
  INSERT INTO "publications_authors_social_links" ("_order", "_parent_id", "id", "kind", "href")
  SELECT l.ord, a."id", substr(md5(random()::text || clock_timestamp()::text || a."id" || l.ord::text), 1, 24), l.kind::"enum_publications_authors_social_links_kind", l.href
  FROM "publications_authors" a
  CROSS JOIN LATERAL (VALUES (1, 'email', a."profile_href"), (2, 'github', a."github_href"), (3, 'linkedin', a."linkedin_href")) AS l(ord, kind, href)
  WHERE a."kind" = 'external' AND l.href <> '';
  INSERT INTO "_publications_v_version_authors_social_links" ("_order", "_parent_id", "kind", "href", "_uuid")
  SELECT l.ord, a."id", l.kind::"enum__publications_v_version_authors_social_links_kind", l.href, substr(md5(random()::text || clock_timestamp()::text || a."id"::text || l.ord::text), 1, 24)
  FROM "_publications_v_version_authors" a
  CROSS JOIN LATERAL (VALUES (1, 'email', a."profile_href"), (2, 'github', a."github_href"), (3, 'linkedin', a."linkedin_href")) AS l(ord, kind, href)
  WHERE a."kind" = 'external' AND l.href <> '';
  ALTER TABLE "projects" DROP COLUMN "contact_profile_href";
  ALTER TABLE "projects" DROP COLUMN "contact_github_href";
  ALTER TABLE "projects" DROP COLUMN "contact_linkedin_href";
  ALTER TABLE "_projects_v" DROP COLUMN "version_contact_profile_href";
  ALTER TABLE "_projects_v" DROP COLUMN "version_contact_github_href";
  ALTER TABLE "_projects_v" DROP COLUMN "version_contact_linkedin_href";
  ALTER TABLE "publications_authors" DROP COLUMN "profile_href";
  ALTER TABLE "publications_authors" DROP COLUMN "github_href";
  ALTER TABLE "publications_authors" DROP COLUMN "linkedin_href";
  ALTER TABLE "_publications_v_version_authors" DROP COLUMN "profile_href";
  ALTER TABLE "_publications_v_version_authors" DROP COLUMN "github_href";
  ALTER TABLE "_publications_v_version_authors" DROP COLUMN "linkedin_href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects_contact_social_links" CASCADE;
  DROP TABLE "_projects_v_version_contact_social_links" CASCADE;
  DROP TABLE "publications_authors_social_links" CASCADE;
  DROP TABLE "_publications_v_version_authors_social_links" CASCADE;
  ALTER TABLE "team_members_social_links" ALTER COLUMN "kind" SET DATA TYPE text;
  DROP TYPE "public"."enum_team_members_social_links_kind";
  CREATE TYPE "public"."enum_team_members_social_links_kind" AS ENUM('email', 'github', 'linkedin', 'message');
  ALTER TABLE "team_members_social_links" ALTER COLUMN "kind" SET DATA TYPE "public"."enum_team_members_social_links_kind" USING "kind"::"public"."enum_team_members_social_links_kind";
  ALTER TABLE "projects" ADD COLUMN "contact_profile_href" varchar;
  ALTER TABLE "projects" ADD COLUMN "contact_github_href" varchar;
  ALTER TABLE "projects" ADD COLUMN "contact_linkedin_href" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_contact_profile_href" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_contact_github_href" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_contact_linkedin_href" varchar;
  ALTER TABLE "publications_authors" ADD COLUMN "profile_href" varchar;
  ALTER TABLE "publications_authors" ADD COLUMN "github_href" varchar;
  ALTER TABLE "publications_authors" ADD COLUMN "linkedin_href" varchar;
  ALTER TABLE "_publications_v_version_authors" ADD COLUMN "profile_href" varchar;
  ALTER TABLE "_publications_v_version_authors" ADD COLUMN "github_href" varchar;
  ALTER TABLE "_publications_v_version_authors" ADD COLUMN "linkedin_href" varchar;
  DROP TYPE "public"."enum_projects_contact_social_links_kind";
  DROP TYPE "public"."enum__projects_v_version_contact_social_links_kind";
  DROP TYPE "public"."enum_publications_authors_social_links_kind";
  DROP TYPE "public"."enum__publications_v_version_authors_social_links_kind";`)
}
