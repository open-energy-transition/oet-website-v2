import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_content_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_content_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_aims_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_project_aims_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_project_aims" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Project Aims',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_team_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"member_id" integer,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_project_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_aims_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_aims_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_aims" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Project Aims',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_team_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"member_id" integer,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_content_items_items" ADD CONSTRAINT "pages_blocks_content_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_items" ADD CONSTRAINT "pages_blocks_content_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_aims_items" ADD CONSTRAINT "pages_blocks_project_aims_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_aims"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_aims_media" ADD CONSTRAINT "pages_blocks_project_aims_media_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_aims_media" ADD CONSTRAINT "pages_blocks_project_aims_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_aims"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_aims" ADD CONSTRAINT "pages_blocks_project_aims_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_team_team_members" ADD CONSTRAINT "pages_blocks_project_team_team_members_member_id_team_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_team_team_members" ADD CONSTRAINT "pages_blocks_project_team_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_team" ADD CONSTRAINT "pages_blocks_project_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_quote" ADD CONSTRAINT "pages_blocks_blog_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_items_items" ADD CONSTRAINT "_pages_v_blocks_content_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_items" ADD CONSTRAINT "_pages_v_blocks_content_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_aims_items" ADD CONSTRAINT "_pages_v_blocks_project_aims_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_project_aims"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_aims_media" ADD CONSTRAINT "_pages_v_blocks_project_aims_media_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_aims_media" ADD CONSTRAINT "_pages_v_blocks_project_aims_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_project_aims"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_aims" ADD CONSTRAINT "_pages_v_blocks_project_aims_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_team_team_members" ADD CONSTRAINT "_pages_v_blocks_project_team_team_members_member_id_team_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_team_team_members" ADD CONSTRAINT "_pages_v_blocks_project_team_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_project_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_team" ADD CONSTRAINT "_pages_v_blocks_project_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_quote" ADD CONSTRAINT "_pages_v_blocks_blog_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_items_items_order_idx" ON "pages_blocks_content_items_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_items_items_parent_id_idx" ON "pages_blocks_content_items_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_items_order_idx" ON "pages_blocks_content_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_items_parent_id_idx" ON "pages_blocks_content_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_items_path_idx" ON "pages_blocks_content_items" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_aims_items_order_idx" ON "pages_blocks_project_aims_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_aims_items_parent_id_idx" ON "pages_blocks_project_aims_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_aims_media_order_idx" ON "pages_blocks_project_aims_media" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_aims_media_parent_id_idx" ON "pages_blocks_project_aims_media" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_aims_media_image_idx" ON "pages_blocks_project_aims_media" USING btree ("image_id");
  CREATE INDEX "pages_blocks_project_aims_order_idx" ON "pages_blocks_project_aims" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_aims_parent_id_idx" ON "pages_blocks_project_aims" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_aims_path_idx" ON "pages_blocks_project_aims" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_team_team_members_order_idx" ON "pages_blocks_project_team_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_team_team_members_parent_id_idx" ON "pages_blocks_project_team_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_team_team_members_member_idx" ON "pages_blocks_project_team_team_members" USING btree ("member_id");
  CREATE INDEX "pages_blocks_project_team_order_idx" ON "pages_blocks_project_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_team_parent_id_idx" ON "pages_blocks_project_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_team_path_idx" ON "pages_blocks_project_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_quote_order_idx" ON "pages_blocks_blog_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_quote_parent_id_idx" ON "pages_blocks_blog_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_quote_path_idx" ON "pages_blocks_blog_quote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_items_items_order_idx" ON "_pages_v_blocks_content_items_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_items_items_parent_id_idx" ON "_pages_v_blocks_content_items_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_items_order_idx" ON "_pages_v_blocks_content_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_items_parent_id_idx" ON "_pages_v_blocks_content_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_items_path_idx" ON "_pages_v_blocks_content_items" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_project_aims_items_order_idx" ON "_pages_v_blocks_project_aims_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_aims_items_parent_id_idx" ON "_pages_v_blocks_project_aims_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_aims_media_order_idx" ON "_pages_v_blocks_project_aims_media" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_aims_media_parent_id_idx" ON "_pages_v_blocks_project_aims_media" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_aims_media_image_idx" ON "_pages_v_blocks_project_aims_media" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_project_aims_order_idx" ON "_pages_v_blocks_project_aims" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_aims_parent_id_idx" ON "_pages_v_blocks_project_aims" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_aims_path_idx" ON "_pages_v_blocks_project_aims" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_project_team_team_members_order_idx" ON "_pages_v_blocks_project_team_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_team_team_members_parent_id_idx" ON "_pages_v_blocks_project_team_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_team_team_members_member_idx" ON "_pages_v_blocks_project_team_team_members" USING btree ("member_id");
  CREATE INDEX "_pages_v_blocks_project_team_order_idx" ON "_pages_v_blocks_project_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_team_parent_id_idx" ON "_pages_v_blocks_project_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_team_path_idx" ON "_pages_v_blocks_project_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_quote_order_idx" ON "_pages_v_blocks_blog_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_quote_parent_id_idx" ON "_pages_v_blocks_blog_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_quote_path_idx" ON "_pages_v_blocks_blog_quote" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_content_items_items" CASCADE;
  DROP TABLE "pages_blocks_content_items" CASCADE;
  DROP TABLE "pages_blocks_project_aims_items" CASCADE;
  DROP TABLE "pages_blocks_project_aims_media" CASCADE;
  DROP TABLE "pages_blocks_project_aims" CASCADE;
  DROP TABLE "pages_blocks_project_team_team_members" CASCADE;
  DROP TABLE "pages_blocks_project_team" CASCADE;
  DROP TABLE "pages_blocks_blog_quote" CASCADE;
  DROP TABLE "_pages_v_blocks_content_items_items" CASCADE;
  DROP TABLE "_pages_v_blocks_content_items" CASCADE;
  DROP TABLE "_pages_v_blocks_project_aims_items" CASCADE;
  DROP TABLE "_pages_v_blocks_project_aims_media" CASCADE;
  DROP TABLE "_pages_v_blocks_project_aims" CASCADE;
  DROP TABLE "_pages_v_blocks_project_team_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_project_team" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_quote" CASCADE;`)
}
