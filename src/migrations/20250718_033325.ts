import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_content_columns_type" ADD VALUE 'card' BEFORE 'cardModal';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_type" ADD VALUE 'card' BEFORE 'cardModal';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "tag" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "description" jsonb;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "action_label" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "action_url" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "tag" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "action_label" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "action_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "type" SET DEFAULT 'content'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_type";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_type" AS ENUM('content', 'cardModal');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "type" SET DEFAULT 'content'::"public"."enum_pages_blocks_content_columns_type";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "type" SET DATA TYPE "public"."enum_pages_blocks_content_columns_type" USING "type"::"public"."enum_pages_blocks_content_columns_type";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "type" SET DEFAULT 'content'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_type";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_type" AS ENUM('content', 'cardModal');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "type" SET DEFAULT 'content'::"public"."enum__pages_v_blocks_content_columns_type";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "type" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_type" USING "type"::"public"."enum__pages_v_blocks_content_columns_type";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "tag";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "action_label";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "action_url";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "tag";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "action_label";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "action_url";`)
}
