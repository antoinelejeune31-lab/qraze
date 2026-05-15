import { NextRequest, NextResponse } from 'next/server'
import { getDb, initDb } from '@/lib/db'
import { createHash } from 'crypto'

function expectedToken() {
  const pwd    = process.env.ADMIN_PASSWORD ?? ''
  const secret = process.env.CRON_SECRET    ?? 'fallback'
  return createHash('sha256').update(`${pwd}:${secret}`).digest('hex')
}

function isAuthenticated(req: NextRequest) {
  return req.cookies.get('admin-token')?.value === expectedToken()
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  await initDb()
  const sql  = getDb()
  const rows = await sql`
    SELECT id, first_name, last_name, email, download_type, created_at
    FROM download_requests
    ORDER BY created_at DESC
    LIMIT 500
  `
  return NextResponse.json({ data: rows })
}
