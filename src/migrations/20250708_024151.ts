import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Check if enum value exists before adding
  const checkEnumQuery = `
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'oneFourth'
    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_pages_blocks_content_columns_size')
  `

  const enumExists = await payload.db.drizzle.execute(sql.raw(checkEnumQuery))

  if (enumExists.rowCount === 0) {
    await payload.db.drizzle.execute(sql`
      ALTER TYPE "public"."enum_pages_blocks_content_columns_size" ADD VALUE 'oneFourth' BEFORE 'half';
      ALTER TYPE "public"."enum__pages_v_blocks_content_columns_size" ADD VALUE 'oneFourth' BEFORE 'half';
    `)
  }

  // Check if tables exist before creating them
  const checkTablesQuery = `
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name IN ('pages_blocks_donate_list_items', 'pages_blocks_donate', 'pages_blocks_about_list_items', 'pages_blocks_about_action_items', 'pages_blocks_about')
  `

  const existingTables = await payload.db.drizzle.execute(sql.raw(checkTablesQuery))

  if (existingTables.rowCount === 0) {
    await db.execute(sql`
    CREATE TABLE "pages_blocks_donate_list_items" (
    	"_order" integer NOT NULL,
    	"_parent_id" varchar NOT NULL,
    	"id" varchar PRIMARY KEY NOT NULL,
    	"icon_class" varchar DEFAULT 'fa fa-info-circle',
    	"title" varchar,
    	"link" varchar
    );

    CREATE TABLE "pages_blocks_donate" (
    	"_order" integer NOT NULL,
    	"_parent_id" integer NOT NULL,
    	"_path" text NOT NULL,
    	"id" varchar PRIMARY KEY NOT NULL,
    	"title" varchar,
    	"rich_text" jsonb,
    	"block_name" varchar
    );

    CREATE TABLE "pages_blocks_about_list_items" (
    	"_order" integer NOT NULL,
    	"_parent_id" varchar NOT NULL,
    	"id" varchar PRIMARY KEY NOT NULL,
    	"icon_class" varchar,
    	"title" varchar,
    	"description" varchar
    );

    CREATE TABLE "pages_blocks_about_action_items" (
    	"_order" integer NOT NULL,
    	"_parent_id" varchar NOT NULL,
    	"id" varchar PRIMARY KEY NOT NULL,
    	"icon_class" varchar DEFAULT 'fa fa-info-circle',
    	"title" varchar,
    	"link" varchar
    );

    CREATE TABLE "pages_blocks_about" (
    	"_order" integer NOT NULL,
    	"_parent_id" integer NOT NULL,
    	"_path" text NOT NULL,
    	"id" varchar PRIMARY KEY NOT NULL,
    	"rich_text" jsonb,
    	"media_id" integer,
    	"block_name" varchar
    );

    CREATE TABLE "_pages_v_blocks_donate_list_items" (
    	"_order" integer NOT NULL,
    	"_parent_id" integer NOT NULL,
    	"id" serial PRIMARY KEY NOT NULL,
    	"icon_class" varchar DEFAULT 'fa fa-info-circle',
    	"title" varchar,
    	"link" varchar,
    	"_uuid" varchar
    );

    CREATE TABLE "_pages_v_blocks_donate" (
    	"_order" integer NOT NULL,
    	"_parent_id" integer NOT NULL,
    	"_path" text NOT NULL,
    	"id" serial PRIMARY KEY NOT NULL,
    	"title" varchar,
    	"rich_text" jsonb,
    	"_uuid" varchar,
    	"block_name" varchar
    );

    CREATE TABLE "_pages_v_blocks_about_list_items" (
    	"_order" integer NOT NULL,
    	"_parent_id" integer NOT NULL,
    	"id" serial PRIMARY KEY NOT NULL,
    	"icon_class" varchar,
    	"title" varchar,
    	"description" varchar,
    	"_uuid" varchar
    );

    CREATE TABLE "_pages_v_blocks_about_action_items" (
    	"_order" integer NOT NULL,
    	"_parent_id" integer NOT NULL,
    	"id" serial PRIMARY KEY NOT NULL,
    	"icon_class" varchar DEFAULT 'fa fa-info-circle',
    	"title" varchar,
    	"link" varchar,
    	"_uuid" varchar
    );

    CREATE TABLE "_pages_v_blocks_about" (
    	"_order" integer NOT NULL,
    	"_parent_id" integer NOT NULL,
    	"_path" text NOT NULL,
    	"id" serial PRIMARY KEY NOT NULL,
    	"rich_text" jsonb,
    	"media_id" integer,
    	"_uuid" varchar,
    	"block_name" varchar
    );`)
  }

  // Check if media_id column exists before adding
  const checkColumnQuery = `
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'pages_blocks_content_columns'
    AND column_name = 'media_id'
  `

  const columnExists = await payload.db.drizzle.execute(sql.raw(checkColumnQuery))

  if (columnExists.rowCount === 0) {
    await db.execute(sql`
    ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "media_id" integer;
    ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "media_id" integer;`)
  }

  // Add constraints and indexes only if tables were created or exist
  await db.execute(sql`
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_donate_list_items_parent_id_fk') THEN
      ALTER TABLE "pages_blocks_donate_list_items" ADD CONSTRAINT "pages_blocks_donate_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_donate"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_donate_parent_id_fk') THEN
      ALTER TABLE "pages_blocks_donate" ADD CONSTRAINT "pages_blocks_donate_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_about_list_items_parent_id_fk') THEN
      ALTER TABLE "pages_blocks_about_list_items" ADD CONSTRAINT "pages_blocks_about_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_about_action_items_parent_id_fk') THEN
      ALTER TABLE "pages_blocks_about_action_items" ADD CONSTRAINT "pages_blocks_about_action_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_about_media_id_media_id_fk') THEN
      ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_about_parent_id_fk') THEN
      ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_donate_list_items_parent_id_fk') THEN
      ALTER TABLE "_pages_v_blocks_donate_list_items" ADD CONSTRAINT "_pages_v_blocks_donate_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_donate"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_donate_parent_id_fk') THEN
      ALTER TABLE "_pages_v_blocks_donate" ADD CONSTRAINT "_pages_v_blocks_donate_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_about_list_items_parent_id_fk') THEN
      ALTER TABLE "_pages_v_blocks_about_list_items" ADD CONSTRAINT "_pages_v_blocks_about_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_about_action_items_parent_id_fk') THEN
      ALTER TABLE "_pages_v_blocks_about_action_items" ADD CONSTRAINT "_pages_v_blocks_about_action_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_about_media_id_media_id_fk') THEN
      ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_about_parent_id_fk') THEN
      ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_donate_list_items_order_idx" ON "pages_blocks_donate_list_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_donate_list_items_parent_id_idx" ON "pages_blocks_donate_list_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_donate_order_idx" ON "pages_blocks_donate" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_donate_parent_id_idx" ON "pages_blocks_donate" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_donate_path_idx" ON "pages_blocks_donate" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_list_items_order_idx" ON "pages_blocks_about_list_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_list_items_parent_id_idx" ON "pages_blocks_about_list_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_action_items_order_idx" ON "pages_blocks_about_action_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_action_items_parent_id_idx" ON "pages_blocks_about_action_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_media_idx" ON "pages_blocks_about" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_donate_list_items_order_idx" ON "_pages_v_blocks_donate_list_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_donate_list_items_parent_id_idx" ON "_pages_v_blocks_donate_list_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_donate_order_idx" ON "_pages_v_blocks_donate" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_donate_parent_id_idx" ON "_pages_v_blocks_donate" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_donate_path_idx" ON "_pages_v_blocks_donate" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_list_items_order_idx" ON "_pages_v_blocks_about_list_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_list_items_parent_id_idx" ON "_pages_v_blocks_about_list_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_action_items_order_idx" ON "_pages_v_blocks_about_action_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_action_items_parent_id_idx" ON "_pages_v_blocks_about_action_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_order_idx" ON "_pages_v_blocks_about" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_parent_id_idx" ON "_pages_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_path_idx" ON "_pages_v_blocks_about" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_media_idx" ON "_pages_v_blocks_about" USING btree ("media_id");

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_content_columns_media_id_media_id_fk') THEN
      ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_content_columns_media_id_media_id_fk') THEN
      ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_media_idx" ON "pages_blocks_content_columns" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_media_idx" ON "_pages_v_blocks_content_columns" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_donate_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_donate" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_action_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_donate_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_donate" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_action_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_donate_list_items" CASCADE;
  DROP TABLE "pages_blocks_donate" CASCADE;
  DROP TABLE "pages_blocks_about_list_items" CASCADE;
  DROP TABLE "pages_blocks_about_action_items" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "_pages_v_blocks_donate_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_donate" CASCADE;
  DROP TABLE "_pages_v_blocks_about_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_about_action_items" CASCADE;
  DROP TABLE "_pages_v_blocks_about" CASCADE;
  ALTER TABLE "pages_blocks_content_columns" DROP CONSTRAINT "pages_blocks_content_columns_media_id_media_id_fk";

  ALTER TABLE "_pages_v_blocks_content_columns" DROP CONSTRAINT "_pages_v_blocks_content_columns_media_id_media_id_fk";

  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::"public"."enum_pages_blocks_content_columns_size";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE "public"."enum_pages_blocks_content_columns_size" USING "size"::"public"."enum_pages_blocks_content_columns_size";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::"public"."enum__pages_v_blocks_content_columns_size";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_size" USING "size"::"public"."enum__pages_v_blocks_content_columns_size";
  DROP INDEX "pages_blocks_content_columns_media_idx";
  DROP INDEX "_pages_v_blocks_content_columns_media_idx";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "media_id";`)
}
