import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Débloquer les personnalisations',
  description: "Débloquez toutes les personnalisations QR code pour 1,99 € — paiement unique, sans inscription.",
}

const features = [
  'Couleurs & dégradés personnalisés',
  'Formes de modules (rond, étoile, cœur, losange…)',
  'Style des yeux du QR code',
  'Logo au centre',
  'Effet Liquid Glass',
  'Cadre décoratif',
  'Export SVG vectoriel & JPEG HD',
]

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const email = searchParams.email ?? ''
  return (
    <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start max-w-5xl">

        {/* Left — summary */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="label mb-4">Personnalisation QR code</p>
            <h1
              className="font-black uppercase leading-tight text-navy mb-4"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
            >
              Débloquer toutes<br />les options
            </h1>
            <p className="text-navy/50 text-sm leading-relaxed">
              Paiement unique de <strong className="text-navy">1,99&nbsp;€</strong>. Sans abonnement, sans compte requis.
              Accès immédiat dès la validation du paiement.
            </p>
          </div>

          <ul className="space-y-3">
            {features.map(f => (
              <li key={f} className="flex items-start gap-3 text-sm text-navy/60">
                <span className="text-navy font-bold mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="border-t-2 border-navy/10 pt-6 flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest uppercase text-navy/40">Total</span>
            <span
              className="font-black text-navy"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem' }}
            >
              1,99&nbsp;€
            </span>
          </div>

          <p className="text-xs text-navy/30 leading-relaxed">
            Paiement sécurisé par Stripe. Vos données bancaires ne sont jamais stockées sur nos serveurs.
          </p>
        </div>

        {/* Right — payment placeholder */}
        <div className="flex flex-col gap-6">
          <div className="border-2 border-navy/15 p-8 flex flex-col gap-6">
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40">Paiement sécurisé</p>

            {email && (
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold tracking-widest uppercase text-navy/30">Email</p>
                <p className="text-sm font-mono text-navy/70">{email}</p>
              </div>
            )}

            {/* Stripe placeholder — to be replaced with Stripe Elements */}
            <div className="flex flex-col gap-4">
              <div className="border-2 border-navy/10 p-4 flex flex-col gap-1">
                <p className="text-xs font-bold tracking-widest uppercase text-navy/30 mb-2">Numéro de carte</p>
                <div className="h-8 bg-navy/5 animate-pulse rounded-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-navy/10 p-4">
                  <p className="text-xs font-bold tracking-widest uppercase text-navy/30 mb-2">Expiration</p>
                  <div className="h-8 bg-navy/5 animate-pulse" />
                </div>
                <div className="border-2 border-navy/10 p-4">
                  <p className="text-xs font-bold tracking-widest uppercase text-navy/30 mb-2">CVC</p>
                  <div className="h-8 bg-navy/5 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="bg-navy/5 border-2 border-navy/10 p-4 text-center">
              <p className="text-xs font-bold tracking-widest uppercase text-navy/40 mb-1">Intégration Stripe en cours</p>
              <p className="text-xs text-navy/30">Le paiement sera disponible prochainement.</p>
            </div>

            <button
              disabled
              className="btn-primary w-full text-center opacity-40 cursor-not-allowed"
            >
              Payer 1,99 € →
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-navy/20">
            <span className="text-xs font-bold tracking-widest uppercase">Visa</span>
            <span className="text-xs font-bold tracking-widest uppercase">Mastercard</span>
            <span className="text-xs font-bold tracking-widest uppercase">Apple Pay</span>
            <span className="text-xs font-bold tracking-widest uppercase">Google Pay</span>
          </div>

          <Link href="/pricing" className="text-xs font-bold tracking-widest uppercase text-navy/30 hover:text-navy/60 transition-colors text-center">
            ← Voir les détails de l'offre
          </Link>
        </div>

      </div>
    </div>
  )
}
