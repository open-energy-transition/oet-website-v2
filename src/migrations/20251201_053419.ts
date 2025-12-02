import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_project_aims_items_icon_color" AS ENUM('red', 'black');
  CREATE TYPE "public"."enum__pages_v_blocks_project_aims_items_icon_color" AS ENUM('red', 'black');
  ALTER TABLE "pages_blocks_content_items" ALTER COLUMN "title" SET DEFAULT 'Project Overview';
  ALTER TABLE "_pages_v_blocks_content_items" ALTER COLUMN "title" SET DEFAULT 'Project Overview';
  ALTER TABLE "pages_blocks_content_items" ADD COLUMN "is_publish" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_project_aims_items" ADD COLUMN "link" varchar;
  ALTER TABLE "pages_blocks_project_aims_items" ADD COLUMN "icon_color" "enum_pages_blocks_project_aims_items_icon_color" DEFAULT 'red';
  ALTER TABLE "_pages_v_blocks_content_items" ADD COLUMN "is_publish" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_project_aims_items" ADD COLUMN "link" varchar;
  ALTER TABLE "_pages_v_blocks_project_aims_items" ADD COLUMN "icon_color" "enum__pages_v_blocks_project_aims_items_icon_color" DEFAULT 'red';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_items" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_content_items" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "pages_blocks_content_items" DROP COLUMN "is_publish";
  ALTER TABLE "pages_blocks_project_aims_items" DROP COLUMN "link";
  ALTER TABLE "pages_blocks_project_aims_items" DROP COLUMN "icon_color";
  ALTER TABLE "_pages_v_blocks_content_items" DROP COLUMN "is_publish";
  ALTER TABLE "_pages_v_blocks_project_aims_items" DROP COLUMN "link";
  ALTER TABLE "_pages_v_blocks_project_aims_items" DROP COLUMN "icon_color";
  DROP TYPE "public"."enum_pages_blocks_project_aims_items_icon_color";
  DROP TYPE "public"."enum__pages_v_blocks_project_aims_items_icon_color";`)
}
