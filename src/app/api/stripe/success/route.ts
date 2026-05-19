import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

export async function GET(req: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qraze-qr-generator.vercel.app'
  const sessionId = req.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.redirect(new URL('/checkout', siteUrl))
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.redirect(new URL('/checkout?error=unpaid', siteUrl))
    }

    const res = NextResponse.redirect(new URL('/checkout/success', siteUrl))
    res.cookies.set('qr_unlocked', '1', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 48 * 3600,
    })
    return res
  } catch {
    return NextResponse.redirect(new URL('/checkout?error=invalid', siteUrl))
  }
}
