import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// RGPD — Droit à l'effacement
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('sb-token')?.value
    if (!token) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    // Supprimer les données utilisateur (cascade via FK en base)
    await supabase.from('qr_codes').delete().eq('user_id', user.id)
    await supabase.from('profiles').delete().eq('id', user.id)
    await supabase.auth.admin.deleteUser(user.id)

    const res = NextResponse.json({ success: true })
    res.cookies.delete('sb-token')
    return res
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
