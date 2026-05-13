import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendVerificationEmail } from '@/lib/email'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  consent: z.boolean().refine((v) => v === true, 'Consentement obligatoire'),
  marketing: z.boolean(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const { email, password, name, consent, marketing } = parsed.data
    const supabase = createServerClient()

    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: {
        name,
        consent_terms: consent,
        consent_marketing: marketing,
        consent_date: new Date().toISOString(),
      },
    })

    if (error) {
      if (error.message.includes('already'))
        return NextResponse.json({ error: "Cet email est déjà utilisé." }, { status: 409 })
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Insert profile
    await supabase.from('profiles').insert({
      id: data.user.id,
      email,
      name,
      consent_terms: consent,
      consent_marketing: marketing,
      consent_date: new Date().toISOString(),
    })

    // Send verification email (generateLink requires password)
    const { data: linkData } = await supabase.auth.admin.generateLink({ type: 'signup', email, password })
    if (linkData?.properties?.email_otp) {
      await sendVerificationEmail(email, linkData.properties.email_otp)
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
