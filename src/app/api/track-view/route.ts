import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json()
    if (!path || typeof path !== 'string') return NextResponse.json({ ok: false })
    await initDb()
    await sql`INSERT INTO page_views (path) VALUES (${path})`
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
