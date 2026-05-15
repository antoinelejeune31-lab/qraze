import { Pool } from 'pg'

let pool: Pool | null = null

function getPool(): Pool {
  if (!pool) {
    const url = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING
    if (!url) throw new Error('POSTGRES_URL non définie — Vercel → projet → Settings → Environment Variables')
    pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } })
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
