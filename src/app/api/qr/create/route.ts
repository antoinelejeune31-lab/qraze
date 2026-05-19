import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSession } from '@/lib/auth'
import { sql, initDb } from '@/lib/db'

const schema = z.object({
  name:    z.string().min(1).max(100),
  content: z.string().min(1),
  type:    z.enum(['url', 'wifi', 'vcard', 'sms']),
  options: z.record(z.unknown()).optional(),
})

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })

  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Corps invalide.' }, { status: 400 }) }

  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Données invalides.' }, { status: 400 })

  const { name, content, type, options = {} } = parsed.data

  await initDb()

  const rows = await sql`
    INSERT INTO qr_codes (user_id, name, content, type, options)
    VALUES (${session.userId}, ${name}, ${content}, ${type}, ${JSON.stringify(options)})
    RETURNING id
  `

  return NextResponse.json({ id: rows[0].id })
}
