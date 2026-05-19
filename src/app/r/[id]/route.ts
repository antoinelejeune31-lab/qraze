import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params

  await initDb()

  const rows = await sql`
    UPDATE qr_codes
    SET scan_count = scan_count + 1
    WHERE id = ${id} AND is_active = true
    RETURNING content, type
  `

  if (!rows.length) {
    return new NextResponse('QR code introuvable.', { status: 404 })
  }

  const { content, type } = rows[0] as { content: string; type: string }

  if (type === 'url') {
    const url = content.startsWith('http') ? content : `https://${content}`
    return NextResponse.redirect(url)
  }

  return new NextResponse(content, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
