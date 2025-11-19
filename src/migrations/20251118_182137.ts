import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_contact_us_link_actions_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "footer_contact_us_link_actions_link_sublinks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"hash" varchar NOT NULL
  );
  
  CREATE TABLE "footer_contact_us_link_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_contact_us_link_actions_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_icon_id" integer,
  	"link_btn_bg_color" varchar DEFAULT '#ffffff',
  	"link_btn_text_color" varchar DEFAULT '#000000',
  	"link_btn_size" "size" DEFAULT 'md',
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "footer_contact_us_link_actions_link_sublinks" ADD CONSTRAINT "footer_contact_us_link_actions_link_sublinks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_contact_us_link_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_contact_us_link_actions" ADD CONSTRAINT "footer_contact_us_link_actions_link_icon_id_icons_id_fk" FOREIGN KEY ("link_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_contact_us_link_actions" ADD CONSTRAINT "footer_contact_us_link_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_contact_us_link_actions_link_sublinks_order_idx" ON "footer_contact_us_link_actions_link_sublinks" USING btree ("_order");
  CREATE INDEX "footer_contact_us_link_actions_link_sublinks_parent_id_idx" ON "footer_contact_us_link_actions_link_sublinks" USING btree ("_parent_id");
  CREATE INDEX "footer_contact_us_link_actions_order_idx" ON "footer_contact_us_link_actions" USING btree ("_order");
  CREATE INDEX "footer_contact_us_link_actions_parent_id_idx" ON "footer_contact_us_link_actions" USING btree ("_parent_id");
  CREATE INDEX "footer_contact_us_link_actions_link_link_icon_idx" ON "footer_contact_us_link_actions" USING btree ("link_icon_id");
  ALTER TABLE "footer" DROP COLUMN "contact_us_title";
  ALTER TABLE "footer" DROP COLUMN "contact_us_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "footer_contact_us_link_actions_link_sublinks" CASCADE;
  DROP TABLE "footer_contact_us_link_actions" CASCADE;
  ALTER TABLE "footer" ADD COLUMN "contact_us_title" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_us_description" varchar;
  DROP TYPE "public"."enum_footer_contact_us_link_actions_link_type";`)
}
