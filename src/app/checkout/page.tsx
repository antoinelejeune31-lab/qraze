import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckoutButton } from './CheckoutButton'

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

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; error?: string }>
}) {
  const params = await searchParams
  const email = params.email ?? ''
  const error = params.error

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

        {/* Right — payment */}
        <div className="flex flex-col gap-6">
          <div className="border-2 border-navy/15 p-8 flex flex-col gap-6">
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40">Paiement sécurisé</p>

            {email && (
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold tracking-widest uppercase text-navy/30">Email</p>
                <p className="text-sm font-mono text-navy/70">{email}</p>
              </div>
            )}

            {error === 'unpaid' && (
              <div className="border-2 border-red-200 bg-red-50 p-4">
                <p className="text-xs font-bold text-red-600">Le paiement n'a pas pu être confirmé. Réessayez.</p>
              </div>
            )}

            <div className="flex flex-col gap-3 text-xs text-navy/50">
              <div className="flex items-center gap-3">
                <span className="text-navy font-bold">✓</span>
                Carte bancaire (Visa, Mastercard, CB)
              </div>
              <div className="flex items-center gap-3">
                <span className="text-navy font-bold">✓</span>
                Apple Pay & Google Pay
              </div>
              <div className="flex items-center gap-3">
                <span className="text-navy font-bold">✓</span>
                Paiement 3D Secure
              </div>
            </div>

            <CheckoutButton email={email} />
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
