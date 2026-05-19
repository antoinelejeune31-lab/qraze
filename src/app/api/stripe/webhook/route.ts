import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sql, initDb } from '@/lib/db'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook non configuré.' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Signature invalide.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    await initDb()
    await sql`
      INSERT INTO payments (stripe_session, email, amount_cents, currency, status)
      VALUES (${session.id}, ${session.customer_email ?? null}, ${session.amount_total ?? 199}, ${session.currency ?? 'eur'}, 'paid')
      ON CONFLICT (stripe_session) DO UPDATE SET status = 'paid'
    `
  }

  return NextResponse.json({ ok: true })
}
