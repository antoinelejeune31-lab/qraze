import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale } from '@/lib/locale'
import { translations } from '@/lib/translations'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qraze.fr'

export const metadata: Metadata = {
  title:       'Tarifs — QR code gratuit ou personnalisé à 1,99 €',
  description: 'Générez un QR code gratuitement. Débloquez toutes les personnalisations (couleurs, logo, SVG) pour 1,99 € — paiement unique, sans inscription, sans abonnement.',
  alternates:  { canonical: `${BASE}/pricing` },
  openGraph:   { url: `${BASE}/pricing` },
}

export default function PricingPage() {
  const locale = getLocale()
  const p = translations[locale].pricing

  const faqJsonLd = {
    '@context':  'https://schema.org',
    '@type':     'FAQPage',
    mainEntity:  p.faq.items.map(({ q, a }) => ({
      '@type':        'Question',
      name:           q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">

        {/* Header */}
        <div className="mb-16">
          <p className="label mb-6">{p.label}</p>
          <h1 className="font-black uppercase leading-tight text-navy mb-6" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            {p.title.split('\n').map((line, i) => <span key={i}>{line}{i < 2 && <br />}</span>)}
          </h1>
          <p className="text-navy/50 text-sm leading-relaxed max-w-md">
            {p.desc.split('1,99').map((part, i) =>
              i === 0 ? part : <span key={i}><strong className="text-navy">1,99&nbsp;€</strong>{part}</span>
            )}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-navy/10 mb-20">

          {/* Free */}
          <div className="bg-white p-12 flex flex-col gap-6">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-navy/40 mb-3">{p.free.label}</p>
              <p className="font-black text-navy" style={{ fontFamily: 'Syne, sans-serif', fontSize: '3rem', lineHeight: 1 }}>{p.free.price}</p>
              <p className="text-xs text-navy/40 mt-1">{p.free.period}</p>
            </div>
            <ul className="space-y-3 flex-1">
              {p.free.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-navy/60">
                  <span className="text-navy font-bold mt-0.5">✓</span>{f}
                </li>
              ))}
              {p.free.locked.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-navy/25 line-through">
                  <span className="mt-0.5">—</span>{f}
                </li>
              ))}
            </ul>
            <Link href="/generator" className="btn-secondary text-xs text-center px-6 py-3">{p.free.cta}</Link>
          </div>

          {/* Paid */}
          <div className="bg-navy text-white p-12 flex flex-col gap-6">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">{p.paid.label}</p>
              <p className="font-black" style={{ fontFamily: 'Syne, sans-serif', fontSize: '3rem', lineHeight: 1 }}>1,99&nbsp;€</p>
              <p className="text-xs text-white/40 mt-1">{p.paid.period}</p>
            </div>
            <ul className="space-y-3 flex-1">
              {p.paid.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="text-white font-bold mt-0.5">✓</span>{f}
                </li>
              ))}
            </ul>
            <Link href="/checkout" className="btn-white text-xs text-center px-6 py-3">{p.paid.cta}</Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl">
          <p className="label mb-8">{p.faq.label}</p>
          <div className="divide-y-2 divide-navy/10">
            {p.faq.items.map(({ q, a }) => (
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
