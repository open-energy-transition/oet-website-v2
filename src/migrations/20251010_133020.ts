import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_name = 'team_members' AND column_name = 'email'
      ) THEN
        ALTER TABLE "team_members" ADD COLUMN "email" varchar;
      END IF;
    END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_name = 'team_members' AND column_name = 'email'
      ) THEN
        ALTER TABLE "team_members" DROP COLUMN "email";
      END IF;
    END $$;
  `)
}
