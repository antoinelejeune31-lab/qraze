import { NextResponse } from 'next/server'

export async function DELETE() {
  return NextResponse.json({ error: 'Suppression QR non disponible pour le moment.' }, { status: 503 })
}
