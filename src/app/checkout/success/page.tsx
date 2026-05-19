import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Paiement confirmé — QRaze' }

export default function SuccessPage() {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-lg text-center flex flex-col items-center gap-8">

        <div
          className="w-16 h-16 border-2 border-navy flex items-center justify-center"
          style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 900 }}
        >
          ✓
        </div>

        <div>
          <p className="label mb-4">Paiement confirmé</p>
          <h1
            className="font-black uppercase leading-tight text-navy mb-4"
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
          >
            Merci pour<br />votre achat
          </h1>
          <p className="text-navy/50 text-sm leading-relaxed">
            Votre accès aux personnalisations est débloqué pour 48&nbsp;h.
            Retournez dans le générateur pour télécharger votre QR code.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/generator"
            className="btn-primary w-full text-center"
          >
            Retour au générateur →
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-bold tracking-widest uppercase text-navy/40 hover:text-navy transition-colors"
          >
            Mon espace
          </Link>
        </div>

        <p className="text-xs text-navy/25 leading-relaxed">
          Un reçu a été envoyé à votre adresse email par Stripe.
        </p>

      </div>
    </div>
  )
}
