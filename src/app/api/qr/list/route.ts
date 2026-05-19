import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { sql, initDb } from '@/lib/db'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })

  await initDb()

  const qrCodes = await sql`
    SELECT id, name, content, type, options, scan_count, created_at
    FROM qr_codes
    WHERE user_id = ${session.userId}
    ORDER BY created_at DESC
  `

  return NextResponse.json({
    user: { name: session.name, email: session.email },
    qrCodes,
  })
}
