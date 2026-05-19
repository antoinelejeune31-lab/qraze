import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

const schema = z.object({
  email: z.string().email().optional(),
})

export async function POST(req: Request) {
  let body: unknown
  try { body = await req.json() } catch { body = {} }

  const parsed = schema.safeParse(body)
  const email = parsed.success ? parsed.data.email : undefined

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qraze-qr-generator.vercel.app'

  const session = await getStripe().checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'QR code personnalisé',
          description: 'Couleurs, logo, formes de modules, SVG — accès immédiat',
        },
        unit_amount: 199,
      },
      quantity: 1,
    }],
    customer_email: email,
    success_url: `${siteUrl}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout`,
    locale: 'fr',
  })

  return NextResponse.json({ url: session.url })
}
