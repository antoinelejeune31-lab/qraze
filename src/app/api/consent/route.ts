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
    const { analytics, ads } = body
    const now = new Date().toISOString()
    const { error } = await supabase.from('profiles').update({
      consent_terms: true,
      consent_marketing: !!ads,
      consent_date: now,
    }).eq('id', user.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Tentative d'audit: insérer une ligne dans `consent_logs` (si table présente)
    try {
      const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
      const ua = req.headers.get('user-agent') || 'unknown'
      await supabase.from('consent_logs').insert({ user_id: user.id, analytics: !!analytics, ads: !!ads, consent_date: now, ip, user_agent: ua })
    } catch (e) {
      // Si la table n'existe pas ou autre erreur, on ignore (ne bloque pas l'utilisateur)
      console.warn('Consent audit skipped or failed', e)
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
