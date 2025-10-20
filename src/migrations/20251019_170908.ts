import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_tabs_tabs_title_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl', '2xl');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_tabs_title_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl', '2xl');
  ALTER TABLE "pages_blocks_content_columns_list_items" ADD COLUMN "link" varchar;
  ALTER TABLE "pages_blocks_content_columns_list_items" ADD COLUMN "content" jsonb;
  ALTER TABLE "pages_blocks_tabs_tabs" ADD COLUMN "title_size" "enum_pages_blocks_tabs_tabs_title_size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_content_columns_list_items" ADD COLUMN "link" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns_list_items" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_tabs_tabs" ADD COLUMN "title_size" "enum__pages_v_blocks_tabs_tabs_title_size" DEFAULT 'md';
  ALTER TABLE "posts" ADD COLUMN "journal" jsonb;
  ALTER TABLE "posts" ADD COLUMN "doi" varchar;
  ALTER TABLE "posts" ADD COLUMN "academic_publications_count" numeric;
  ALTER TABLE "posts" ADD COLUMN "reports_count" numeric;
  ALTER TABLE "posts" ADD COLUMN "policy_briefs_count" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_journal" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_doi" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_academic_publications_count" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_reports_count" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_policy_briefs_count" numeric;
  ALTER TABLE "pages_blocks_content_columns_list_items" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_content_columns_list_items" DROP COLUMN "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_columns_list_items" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns_list_items" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_content_columns_list_items" DROP COLUMN "link";
  ALTER TABLE "pages_blocks_content_columns_list_items" DROP COLUMN "content";
  ALTER TABLE "pages_blocks_tabs_tabs" DROP COLUMN "title_size";
  ALTER TABLE "_pages_v_blocks_content_columns_list_items" DROP COLUMN "link";
  ALTER TABLE "_pages_v_blocks_content_columns_list_items" DROP COLUMN "content";
  ALTER TABLE "_pages_v_blocks_tabs_tabs" DROP COLUMN "title_size";
  ALTER TABLE "posts" DROP COLUMN "journal";
  ALTER TABLE "posts" DROP COLUMN "doi";
  ALTER TABLE "posts" DROP COLUMN "academic_publications_count";
  ALTER TABLE "posts" DROP COLUMN "reports_count";
  ALTER TABLE "posts" DROP COLUMN "policy_briefs_count";
  ALTER TABLE "_posts_v" DROP COLUMN "version_journal";
  ALTER TABLE "_posts_v" DROP COLUMN "version_doi";
  ALTER TABLE "_posts_v" DROP COLUMN "version_academic_publications_count";
  ALTER TABLE "_posts_v" DROP COLUMN "version_reports_count";
  ALTER TABLE "_posts_v" DROP COLUMN "version_policy_briefs_count";
  DROP TYPE "public"."enum_pages_blocks_tabs_tabs_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_tabs_title_size";`)
}
