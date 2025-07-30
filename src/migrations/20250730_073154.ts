import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_our_service_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_our_service_bottom_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "pages_blocks_our_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"units_button_label" varchar,
  	"units_button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_partners_partner_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "pages_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_service_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_service_bottom_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"units_button_label" varchar,
  	"units_button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partners_partner_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "posts" ADD COLUMN "short_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_short_description" varchar;
  ALTER TABLE "team_members" ADD COLUMN "github" varchar;
  ALTER TABLE "jobs" ADD COLUMN "external_link" varchar;
  ALTER TABLE "pages_blocks_our_service_services" ADD CONSTRAINT "pages_blocks_our_service_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_service_bottom_images" ADD CONSTRAINT "pages_blocks_our_service_bottom_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_service_bottom_images" ADD CONSTRAINT "pages_blocks_our_service_bottom_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_service" ADD CONSTRAINT "pages_blocks_our_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_partner_images" ADD CONSTRAINT "pages_blocks_partners_partner_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_partner_images" ADD CONSTRAINT "pages_blocks_partners_partner_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners" ADD CONSTRAINT "pages_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service_services" ADD CONSTRAINT "_pages_v_blocks_our_service_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service_bottom_images" ADD CONSTRAINT "_pages_v_blocks_our_service_bottom_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service_bottom_images" ADD CONSTRAINT "_pages_v_blocks_our_service_bottom_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_service" ADD CONSTRAINT "_pages_v_blocks_our_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_partner_images" ADD CONSTRAINT "_pages_v_blocks_partners_partner_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_partner_images" ADD CONSTRAINT "_pages_v_blocks_partners_partner_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners" ADD CONSTRAINT "_pages_v_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tags" ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_our_service_services_order_idx" ON "pages_blocks_our_service_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_service_services_parent_id_idx" ON "pages_blocks_our_service_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_service_bottom_images_order_idx" ON "pages_blocks_our_service_bottom_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_service_bottom_images_parent_id_idx" ON "pages_blocks_our_service_bottom_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_service_bottom_images_image_idx" ON "pages_blocks_our_service_bottom_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_our_service_order_idx" ON "pages_blocks_our_service" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_service_parent_id_idx" ON "pages_blocks_our_service" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_service_path_idx" ON "pages_blocks_our_service" USING btree ("_path");
  CREATE INDEX "pages_blocks_partners_partner_images_order_idx" ON "pages_blocks_partners_partner_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_partner_images_parent_id_idx" ON "pages_blocks_partners_partner_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_partner_images_image_idx" ON "pages_blocks_partners_partner_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_partners_order_idx" ON "pages_blocks_partners" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_parent_id_idx" ON "pages_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_path_idx" ON "pages_blocks_partners" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_our_service_services_order_idx" ON "_pages_v_blocks_our_service_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_service_services_parent_id_idx" ON "_pages_v_blocks_our_service_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_service_bottom_images_order_idx" ON "_pages_v_blocks_our_service_bottom_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_service_bottom_images_parent_id_idx" ON "_pages_v_blocks_our_service_bottom_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_service_bottom_images_image_idx" ON "_pages_v_blocks_our_service_bottom_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_our_service_order_idx" ON "_pages_v_blocks_our_service" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_service_parent_id_idx" ON "_pages_v_blocks_our_service" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_service_path_idx" ON "_pages_v_blocks_our_service" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_partners_partner_images_order_idx" ON "_pages_v_blocks_partners_partner_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partners_partner_images_parent_id_idx" ON "_pages_v_blocks_partners_partner_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_partner_images_image_idx" ON "_pages_v_blocks_partners_partner_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_partners_order_idx" ON "_pages_v_blocks_partners" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partners_parent_id_idx" ON "_pages_v_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_path_idx" ON "_pages_v_blocks_partners" USING btree ("_path");
  CREATE INDEX "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_tags_order_idx" ON "_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tags_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_our_service_services" CASCADE;
  DROP TABLE "pages_blocks_our_service_bottom_images" CASCADE;
  DROP TABLE "pages_blocks_our_service" CASCADE;
  DROP TABLE "pages_blocks_partners_partner_images" CASCADE;
  DROP TABLE "pages_blocks_partners" CASCADE;
  DROP TABLE "_pages_v_blocks_our_service_services" CASCADE;
  DROP TABLE "_pages_v_blocks_our_service_bottom_images" CASCADE;
  DROP TABLE "_pages_v_blocks_our_service" CASCADE;
  DROP TABLE "_pages_v_blocks_partners_partner_images" CASCADE;
  DROP TABLE "_pages_v_blocks_partners" CASCADE;
  DROP TABLE "posts_tags" CASCADE;
  DROP TABLE "_posts_v_version_tags" CASCADE;
  ALTER TABLE "posts" DROP COLUMN "short_description";
  ALTER TABLE "_posts_v" DROP COLUMN "version_short_description";
  ALTER TABLE "team_members" DROP COLUMN "github";
  ALTER TABLE "jobs" DROP COLUMN "external_link";`)
}
