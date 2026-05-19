import { Pool } from 'pg'

let pool: Pool | null = null

function getPool(): Pool {
  if (!pool) {
    const url = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING
    if (!url) throw new Error('POSTGRES_URL non définie — Vercel → projet → Settings → Environment Variables')
    pool = new Pool({ connectionString: url, ssl: true })
  }
  return pool
}

// Tagged template SQL — retourne les lignes directement
export async function sql(strings: TemplateStringsArray, ...values: unknown[]): Promise<Record<string, unknown>[]> {
  let text = ''
  const params: unknown[] = []
  strings.forEach((str, i) => {
    text += str
    if (i < values.length) {
      params.push(values[i])
      text += `$${params.length}`
    }
  })
  const res = await getPool().query(text, params)
  return res.rows
}

export async function initDb() {
  await sql`CREATE TABLE IF NOT EXISTS users (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email             TEXT UNIQUE NOT NULL,
    name              TEXT NOT NULL,
    password_hash     TEXT NOT NULL,
    verified          BOOLEAN NOT NULL DEFAULT false,
    verify_token      TEXT,
    consent_terms     BOOLEAN NOT NULL DEFAULT false,
    consent_marketing BOOLEAN NOT NULL DEFAULT false,
    created_at        TIMESTAMPTZ DEFAULT now()
  )`
  await sql`CREATE INDEX IF NOT EXISTS idx_users_email        ON users(email)`
  await sql`CREATE INDEX IF NOT EXISTS idx_users_verify_token ON users(verify_token) WHERE verify_token IS NOT NULL`

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

  await sql`CREATE TABLE IF NOT EXISTS qr_codes (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name       TEXT NOT NULL,
    content    TEXT NOT NULL,
    type       TEXT NOT NULL DEFAULT 'url',
    options    JSONB NOT NULL DEFAULT '{}',
    scan_count INTEGER NOT NULL DEFAULT 0,
    is_active  BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
  )`
  await sql`CREATE INDEX IF NOT EXISTS idx_qr_user ON qr_codes(user_id, created_at DESC)`
}
