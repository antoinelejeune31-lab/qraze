import { NextRequest, NextResponse } from 'next/server'

// ── Admin auth ────────────────────────────────────────────────────────────────

async function expectedAdminToken(): Promise<string> {
  const pwd    = process.env.ADMIN_PASSWORD ?? ''
  const secret = process.env.CRON_SECRET    ?? 'fallback'
  const data   = new TextEncoder().encode(`${pwd}:${secret}`)
  const hash   = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

// ── User session (Edge-compatible HMAC verify) ────────────────────────────────

async function verifyUserSession(token: string): Promise<boolean> {
  const secret = process.env.SESSION_SECRET ?? 'dev-secret-change-in-production'
  const dot    = token.lastIndexOf('.')
  if (dot < 0) return false
  const payload = token.slice(0, dot)
  const sig     = token.slice(dot + 1)

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    // base64url → Uint8Array
    const pad     = sig.length % 4 === 0 ? 0 : 4 - (sig.length % 4)
    const b64     = sig.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad)
    const sigBytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0))

    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(payload))
    if (!valid) return false

    const padP    = payload.length % 4 === 0 ? 0 : 4 - (payload.length % 4)
    const b64p    = payload.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padP)
    const { exp } = JSON.parse(atob(b64p))
    return typeof exp === 'number' && exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

// ── Middleware ────────────────────────────────────────────────────────────────

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Admin protection
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token    = req.cookies.get('admin-token')?.value
    const expected = await expectedAdminToken()
    if (token !== expected) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // User dashboard protection
  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('session')?.value
    if (!token || !(await verifyUserSession(token))) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
