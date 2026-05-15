import { sql } from '@vercel/postgres'

export { sql }

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS download_requests (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name    TEXT NOT NULL,
      last_name     TEXT NOT NULL,
      email         TEXT NOT NULL,
      download_type TEXT NOT NULL DEFAULT 'free',
      created_at    TIMESTAMPTZ DEFAULT now()
    )
  `
}
