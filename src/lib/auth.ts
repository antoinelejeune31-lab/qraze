import crypto from 'crypto'
import { cookies } from 'next/headers'
import { sql } from './db'

export const SESSION_COOKIE = 'session'
const SECRET = () => process.env.SESSION_SECRET ?? 'dev-secret-change-in-production'

// ── Password hashing (scrypt) ─────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = await new Promise<Buffer>((resolve, reject) =>
    crypto.scrypt(password, salt, 64, (err, d) => (err ? reject(err) : resolve(d)))
  )
  return `${salt}:${hash.toString('hex')}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const derived = await new Promise<Buffer>((resolve, reject) =>
    crypto.scrypt(password, salt, 64, (err, d) => (err ? reject(err) : resolve(d)))
  )
  try {
    return crypto.timingSafeEqual(derived, Buffer.from(hash, 'hex'))
  } catch {
    return false
  }
}

// ── Session tokens (HMAC-SHA256) ─────────────────────────────────────────────

export function createSessionToken(userId: string): string {
  const exp     = Math.floor(Date.now() / 1000) + 30 * 24 * 3600
  const payload = Buffer.from(JSON.stringify({ userId, exp })).toString('base64url')
  const sig     = crypto.createHmac('sha256', SECRET()).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifySessionToken(token: string): { userId: string } | null {
  const dot = token.lastIndexOf('.')
  if (dot < 0) return null
  const payload  = token.slice(0, dot)
  const sig      = token.slice(dot + 1)
  const expected = crypto.createHmac('sha256', SECRET()).update(payload).digest('base64url')
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig, 'base64url'), Buffer.from(expected, 'base64url'))) return null
  } catch {
    return null
  }
  try {
    const { userId, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (typeof userId !== 'string' || exp < Math.floor(Date.now() / 1000)) return null
    return { userId }
  } catch {
    return null
  }
}

// ── Server-side session helper ───────────────────────────────────────────────

export type SessionUser = { userId: string; email: string; name: string }

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  const parsed = verifySessionToken(token)
  if (!parsed) return null
  const rows = await sql`SELECT id, email, name FROM users WHERE id = ${parsed.userId} AND verified = true LIMIT 1`
  if (!rows.length) return null
  return { userId: rows[0].id as string, email: rows[0].email as string, name: rows[0].name as string }
}

// ── Cookie options ────────────────────────────────────────────────────────────

export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path:     '/',
    maxAge,
  }
}

// ── Email verification token ─────────────────────────────────────────────────

export function generateVerifyToken(): string {
  return crypto.randomBytes(32).toString('hex')
}
