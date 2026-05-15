import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

function adminToken() {
  const pwd    = process.env.ADMIN_PASSWORD ?? ''
  const secret = process.env.CRON_SECRET    ?? 'fallback'
  return createHash('sha256').update(`${pwd}:${secret}`).digest('hex')
}

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const expected = process.env.ADMIN_PASSWORD

  if (!expected || password !== expected) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin-token', adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 h
    path: '/',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('admin-token')
  return res
}
