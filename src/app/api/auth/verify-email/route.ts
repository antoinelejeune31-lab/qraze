import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(`${BASE}/login?error=lien-invalide`)
  }

  const rows = await sql`
    UPDATE users
    SET verified = true, verify_token = NULL
    WHERE verify_token = ${token} AND verified = false
    RETURNING id
  `

  if (!rows.length) {
    return NextResponse.redirect(`${BASE}/login?error=lien-invalide`)
  }

  return NextResponse.redirect(`${BASE}/login?verified=1`)
}
