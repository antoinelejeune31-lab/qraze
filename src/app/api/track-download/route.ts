import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, download_type } = await req.json()

    if (!first_name || !last_name || !email) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    const supabase = createServerClient()
    const { error } = await supabase.from('download_requests').insert({
      first_name: first_name.trim(),
      last_name:  last_name.trim(),
      email:      email.trim().toLowerCase(),
      download_type: download_type === 'paid' ? 'paid' : 'free',
    })

    if (error) {
      console.error('track-download insert error:', error.message)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
