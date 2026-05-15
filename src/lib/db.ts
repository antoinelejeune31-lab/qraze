import { neon } from '@neondatabase/serverless'

export function getDb() {
  const url = process.env.POSTGRES_URL
  if (!url) throw new Error('POSTGRES_URL non définie — Vercel → projet → Settings → Environment Variables')
  return neon(url)
}

export async function initDb() {
  const sql = getDb()
  await sql`CREATE TABLE IF NOT EXISTS download_requests (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name    TEXT NOT NULL,
    last_name     TEXT NOT NULL,
    email         TEXT NOT NULL,
    download_type TEXT NOT NULL DEFAULT 'free',
    created_at    TIMESTAMPTZ DEFAULT now()
  )`
  await sql`CREATE TABLE IF NOT EXISTS page_views (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    path       TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
  )`
  await sql`CREATE INDEX IF NOT EXISTS idx_pv_created ON page_views(created_at DESC)`
  await sql`CREATE INDEX IF NOT EXISTS idx_pv_path    ON page_views(path)`
  await sql`CREATE INDEX IF NOT EXISTS idx_dl_email   ON download_requests(email)`
  await sql`CREATE INDEX IF NOT EXISTS idx_dl_created ON download_requests(created_at DESC)`
}
