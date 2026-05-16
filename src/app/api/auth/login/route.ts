import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sql, initDb } from '@/lib/db'
import { verifyPassword, createSessionToken, SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth'

const schema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
})

const DUMMY_HASH = 'deadbeef0000000000000000000000000000000000000000000000000000000000000000:' +
                   'deadbeef0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

export async function POST(req: Request) {
  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Corps invalide.' }, { status: 400 }) }

  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Données invalides.' }, { status: 400 })

  const { email, password } = parsed.data

  await initDb()

  const rows = await sql`SELECT id, password_hash, verified FROM users WHERE email = ${email.toLowerCase()} LIMIT 1`
  const user = rows[0]

  // Always run verifyPassword to prevent timing attacks
  const valid = await verifyPassword(password, (user?.password_hash as string) ?? DUMMY_HASH)

  if (!user || !valid) {
    return NextResponse.json({ error: 'Email ou mot de passe incorrect.' }, { status: 401 })
  }

  if (!user.verified) {
    return NextResponse.json({ error: 'Veuillez confirmer votre email avant de vous connecter.' }, { status: 403 })
  }

  const token = createSessionToken(user.id as string)
  const res   = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions(30 * 24 * 3600))
  return res
}
