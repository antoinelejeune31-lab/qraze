import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('sb-token')?.value
    if (!token) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const supabase = createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Session invalide' }, { status: 401 })

    const body = await req.json()
    const { name, url, type, options, expires_at } = body

    if (!name || !url) return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })

    const { data, error } = await supabase.from('qr_codes').insert({
      user_id: user.id,
      name, url, type: type || 'url',
      options: options || {},
      expires_at: expires_at || null,
      is_active: true,
      scan_count: 0,
    }).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
