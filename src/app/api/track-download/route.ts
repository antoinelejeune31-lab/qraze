import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, download_type } = await req.json()

    if (!first_name || !last_name || !email) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    await initDb()

    const type = download_type === 'paid' ? 'paid' : 'free'
    await sql`
      INSERT INTO download_requests (first_name, last_name, email, download_type)
      VALUES (${first_name.trim()}, ${last_name.trim()}, ${email.trim().toLowerCase()}, ${type})
    `

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('track-download error:', e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
