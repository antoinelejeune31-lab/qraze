import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function DELETE(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID manquant.' }, { status: 400 })

  await sql`DELETE FROM qr_codes WHERE id = ${id} AND user_id = ${session.userId}`

  return NextResponse.json({ ok: true })
}
