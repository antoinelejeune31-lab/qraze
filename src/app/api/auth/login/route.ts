import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ error: 'Authentification non disponible pour le moment.' }, { status: 503 })
}
