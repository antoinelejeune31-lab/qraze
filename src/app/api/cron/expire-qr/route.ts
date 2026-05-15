import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ ok: true, expired: 0, message: 'Cron non actif (pas de base QR codes).' })
}
