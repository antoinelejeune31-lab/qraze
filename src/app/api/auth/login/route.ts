import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })

    const supabase = createServerClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) return NextResponse.json({ error: 'Email ou mot de passe incorrect.' }, { status: 401 })

    const res = NextResponse.json({ success: true })
    res.cookies.set('sb-token', data.session.access_token, {
      httpOnly: true, secure: true, sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
