import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ error: 'Dashboard non disponible pour le moment.' }, { status: 503 })
}
