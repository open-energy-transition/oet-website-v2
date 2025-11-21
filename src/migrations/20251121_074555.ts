import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_our_blog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_blog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "posts" ADD COLUMN "p_date" varchar;
  ALTER TABLE "posts" ADD COLUMN "min_read" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_p_date" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_min_read" varchar;
  ALTER TABLE "pages_blocks_our_blog" ADD CONSTRAINT "pages_blocks_our_blog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_blog" ADD CONSTRAINT "_pages_v_blocks_our_blog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_our_blog_order_idx" ON "pages_blocks_our_blog" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_blog_parent_id_idx" ON "pages_blocks_our_blog" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_blog_path_idx" ON "pages_blocks_our_blog" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_our_blog_order_idx" ON "_pages_v_blocks_our_blog" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_blog_parent_id_idx" ON "_pages_v_blocks_our_blog" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_blog_path_idx" ON "_pages_v_blocks_our_blog" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_our_blog" CASCADE;
  DROP TABLE "_pages_v_blocks_our_blog" CASCADE;
  ALTER TABLE "posts" DROP COLUMN "p_date";
  ALTER TABLE "posts" DROP COLUMN "min_read";
  ALTER TABLE "_posts_v" DROP COLUMN "version_p_date";
  ALTER TABLE "_posts_v" DROP COLUMN "version_min_read";`)
}
