import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sql, initDb } from '@/lib/db'
import { generateVerifyToken } from '@/lib/auth'
import { sendVerificationEmail } from '@/lib/email'

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Corps invalide.' }, { status: 400 }) }

  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })

  await initDb()

  const rows = await sql`SELECT id, verified FROM users WHERE email = ${parsed.data.email.toLowerCase()} LIMIT 1`

  // Réponse identique que l'utilisateur existe ou non (sécurité)
  if (!rows.length || rows[0].verified) {
    return NextResponse.json({ ok: true })
  }

  const token = generateVerifyToken()
  await sql`UPDATE users SET verify_token = ${token} WHERE id = ${rows[0].id}`

  let emailError: string | null = null
  try {
    const result = await sendVerificationEmail(parsed.data.email, token)
    if ('error' in result && result.error) emailError = String(result.error)
  } catch (err) {
    emailError = err instanceof Error ? err.message : String(err)
    console.error('[resend-verification] sendVerificationEmail failed:', emailError)
  }

  if (emailError) {
    console.error('[resend-verification] returning 500:', emailError)
    return NextResponse.json({ error: emailError }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
