import { NextRequest, NextResponse } from 'next/server'
import { getDb, initDb } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json()
    if (!path || typeof path !== 'string') return NextResponse.json({ ok: false })
    await initDb()
    const sql = getDb()
    await sql`INSERT INTO page_views (path) VALUES (${path})`
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
