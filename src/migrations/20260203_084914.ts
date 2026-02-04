import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "team_members_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"degree" varchar NOT NULL
  );
  
  ALTER TABLE "team_members_education" ADD CONSTRAINT "team_members_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "team_members_education_order_idx" ON "team_members_education" USING btree ("_order");
  CREATE INDEX "team_members_education_parent_id_idx" ON "team_members_education" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "team_members_education" CASCADE;`)
}
