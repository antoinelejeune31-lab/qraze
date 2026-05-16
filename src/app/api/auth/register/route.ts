import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sql, initDb } from '@/lib/db'
import { hashPassword, generateVerifyToken } from '@/lib/auth'
import { sendVerificationEmail } from '@/lib/email'

const schema = z.object({
  name:      z.string().min(1).max(100),
  email:     z.string().email(),
  password:  z.string().min(8).max(100),
  consent:   z.literal(true, { errorMap: () => ({ message: 'Vous devez accepter les CGU.' }) }),
  marketing: z.boolean().default(false),
})

export async function POST(req: Request) {
  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Corps invalide.' }, { status: 400 }) }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Données invalides.' }, { status: 400 })
  }

  const { name, email, password, consent, marketing } = parsed.data

  await initDb()

  const existing = await sql`SELECT id FROM users WHERE email = ${email.toLowerCase()} LIMIT 1`
  if (existing.length > 0) {
    return NextResponse.json({ error: 'Cette adresse email est déjà utilisée.' }, { status: 409 })
  }

  const password_hash  = await hashPassword(password)
  const verify_token   = generateVerifyToken()

  await sql`
    INSERT INTO users (email, name, password_hash, verify_token, consent_terms, consent_marketing)
    VALUES (${email.toLowerCase()}, ${name.trim()}, ${password_hash}, ${verify_token}, ${consent}, ${marketing})
  `

  let emailError: string | null = null
  try {
    const result = await sendVerificationEmail(email, verify_token)
    if ('error' in result && result.error) emailError = String(result.error)
  } catch (err) {
    emailError = err instanceof Error ? err.message : String(err)
    console.error('Verification email failed:', emailError)
  }

  return NextResponse.json({ ok: true, emailError })
}
