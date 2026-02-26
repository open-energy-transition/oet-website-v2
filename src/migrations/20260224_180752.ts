import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_resources_resource_type" AS ENUM('upload', 'link');
  CREATE TYPE "public"."enum__posts_v_version_resources_resource_type" AS ENUM('upload', 'link');
  CREATE TABLE "posts_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"resource_type" "enum_posts_resources_resource_type" DEFAULT 'upload',
  	"file_id" integer,
  	"external_link" varchar
  );
  
  CREATE TABLE "posts_custom_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"full_name" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "_posts_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"resource_type" "enum__posts_v_version_resources_resource_type" DEFAULT 'upload',
  	"file_id" integer,
  	"external_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_custom_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "posts_resources" ADD CONSTRAINT "posts_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_resources" ADD CONSTRAINT "posts_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_custom_authors" ADD CONSTRAINT "posts_custom_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_resources" ADD CONSTRAINT "_posts_v_version_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_resources" ADD CONSTRAINT "_posts_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_custom_authors" ADD CONSTRAINT "_posts_v_version_custom_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_resources_order_idx" ON "posts_resources" USING btree ("_order");
  CREATE INDEX "posts_resources_parent_id_idx" ON "posts_resources" USING btree ("_parent_id");
  CREATE INDEX "posts_resources_file_idx" ON "posts_resources" USING btree ("file_id");
  CREATE INDEX "posts_custom_authors_order_idx" ON "posts_custom_authors" USING btree ("_order");
  CREATE INDEX "posts_custom_authors_parent_id_idx" ON "posts_custom_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_resources_order_idx" ON "_posts_v_version_resources" USING btree ("_order");
  CREATE INDEX "_posts_v_version_resources_parent_id_idx" ON "_posts_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_resources_file_idx" ON "_posts_v_version_resources" USING btree ("file_id");
  CREATE INDEX "_posts_v_version_custom_authors_order_idx" ON "_posts_v_version_custom_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_custom_authors_parent_id_idx" ON "_posts_v_version_custom_authors" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "posts_resources" CASCADE;
  DROP TABLE "posts_custom_authors" CASCADE;
  DROP TABLE "_posts_v_version_resources" CASCADE;
  DROP TABLE "_posts_v_version_custom_authors" CASCADE;
  DROP TYPE "public"."enum_posts_resources_resource_type";
  DROP TYPE "public"."enum__posts_v_version_resources_resource_type";`)
}
