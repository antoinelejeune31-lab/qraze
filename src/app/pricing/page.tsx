import type { Metadata } from 'next'
import Link from 'next/link'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://barnabqr.fr'

const faqJsonLd = {
  '@context':  'https://schema.org',
  '@type':     'FAQPage',
  mainEntity: [
    {
      '@type':          'Question',
      name:             'Comment fonctionne le paiement unique ?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Vous payez 1,99 € via Stripe (carte bancaire, Apple Pay, Google Pay). Une fois le paiement validé, toutes les personnalisations sont débloquées pour le QR code en cours.' },
    },
    {
      '@type':          'Question',
      name:             'Dois-je créer un compte ?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Non. Le paiement unique ne nécessite aucune inscription. Votre QR code personnalisé est généré directement après paiement.' },
    },
    {
      '@type':          'Question',
      name:             'Le paiement est-il sécurisé ?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Oui. Les paiements sont gérés par Stripe, leader mondial du paiement en ligne. Vos données bancaires ne transitent jamais par nos serveurs.' },
    },
    {
      '@type':          'Question',
      name:             'Puis-je générer plusieurs QR codes personnalisés ?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Chaque session de personnalisation coûte 1,99 €. Si vous en générez souvent, contactez-nous pour une offre adaptée.' },
    },
  ],
}

export const metadata: Metadata = {
  title:       'Tarifs — QR code gratuit ou personnalisé à 1,99 €',
  description: 'Générez un QR code gratuitement. Débloquez toutes les personnalisations (couleurs, logo, SVG) pour 1,99 € — paiement unique, sans inscription, sans abonnement.',
  keywords:    ['QR code gratuit', 'QR code pas cher', 'générateur QR code prix', 'QR code 1,99', 'QR code sans abonnement'],
  alternates:  { canonical: `${BASE}/pricing` },
  openGraph: {
    title:       'Tarifs BARNA\'B QR — Gratuit ou 1,99 € sans abonnement',
    description: 'QR code gratuit ou personnalisation complète pour 1,99 €. Paiement unique, sans inscription.',
    url:         `${BASE}/pricing`,
  },
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">

      {/* Header */}
      <div className="mb-16">
        <p className="label mb-6">Tarifs</p>
        <h1
          className="font-black uppercase leading-tight text-navy mb-6"
          style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          Simple.<br />Transparent.<br />Sans abonnement.
        </h1>
        <p className="text-navy/50 text-sm leading-relaxed max-w-md">
          Générez votre QR code gratuitement. Si vous souhaitez le personnaliser,
          débloquez toutes les options pour <strong className="text-navy">1,99&nbsp;€</strong> — paiement unique, sans compte.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-navy/10 mb-20">

        {/* Free */}
        <div className="bg-white p-12 flex flex-col gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40 mb-3">Gratuit</p>
            <p
              className="font-black text-navy"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: '3rem', lineHeight: 1 }}
            >
              0&nbsp;€
            </p>
            <p className="text-xs text-navy/40 mt-1">Pour toujours</p>
          </div>

          <ul className="space-y-3 flex-1">
            {[
              'Génération de QR code instantanée',
              'Types : URL, Wi-Fi, vCard, SMS',
              'Export PNG standard',
              'Sans inscription',
              'Sans limite de génération',
            ].map(f => (
              <li key={f} className="flex items-start gap-3 text-sm text-navy/60">
                <span className="text-navy font-bold mt-0.5">✓</span>
                {f}
              </li>
            ))}
            {[
              'Couleurs & dégradés',
              'Formes de modules',
              'Logo au centre',
            ].map(f => (
              <li key={f} className="flex items-start gap-3 text-sm text-navy/25 line-through">
                <span className="mt-0.5">—</span>
                {f}
              </li>
            ))}
          </ul>

          <Link href="/generator" className="btn-secondary text-xs text-center px-6 py-3">
            Créer un QR code →
          </Link>
        </div>

        {/* Paid */}
        <div className="bg-navy text-white p-12 flex flex-col gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">Personnalisation</p>
            <p
              className="font-black"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: '3rem', lineHeight: 1 }}
            >
              1,99&nbsp;€
            </p>
            <p className="text-xs text-white/40 mt-1">Paiement unique · Sans inscription</p>
          </div>

          <ul className="space-y-3 flex-1">
            {[
              'Tout ce qui est inclus dans Gratuit',
              'Couleurs personnalisées',
              'Dégradés (linéaire, radial)',
              'Formes de modules (rond, étoile, cœur…)',
              'Style des yeux du QR',
              'Logo au centre',
              'Effet Liquid Glass',
              'Cadre décoratif',
              'Export SVG vectoriel & JPEG HD',
            ].map(f => (
              <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                <span className="text-white font-bold mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <Link href="/checkout" className="btn-white text-xs text-center px-6 py-3">
            Débloquer les personnalisations →
          </Link>
        </div>

      </div>

      {/* FAQ */}
      <div className="max-w-2xl">
        <p className="label mb-8">Questions fréquentes</p>
        <div className="divide-y-2 divide-navy/10">
          {[
            {
              q: "Comment fonctionne le paiement unique ?",
              a: "Vous payez 1,99 € via Stripe (carte bancaire, Apple Pay, Google Pay). Une fois le paiement validé, toutes les personnalisations sont débloquées pour le QR code en cours.",
            },
            {
              q: "Dois-je créer un compte ?",
              a: "Non. Le paiement unique ne nécessite aucune inscription. Votre QR code personnalisé est généré directement après paiement.",
            },
            {
              q: "Le paiement est-il sécurisé ?",
              a: "Oui. Les paiements sont gérés par Stripe, leader mondial du paiement en ligne. Vos données bancaires ne transitent jamais par nos serveurs.",
            },
            {
              q: "Puis-je générer plusieurs QR codes personnalisés ?",
              a: "Chaque session de personnalisation coûte 1,99 €. Si vous en générez souvent, contactez-nous pour une offre adaptée.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="py-7">
              <p className="text-sm font-black uppercase text-navy mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{q}</p>
              <p className="text-sm text-navy/50 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
    </>
  )
}
