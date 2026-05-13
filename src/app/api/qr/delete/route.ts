import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('sb-token')?.value
    if (!token) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 })

    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    // Vérifier ownership avant suppression
    const { error } = await supabase
      .from('qr_codes').delete()
      .eq('id', id).eq('user_id', user.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
