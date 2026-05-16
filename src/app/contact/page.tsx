import type { Metadata } from 'next'
import { getLocale } from '@/lib/locale'
import { translations } from '@/lib/translations'
import { ContactForm } from './ContactForm'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://barnabqr.fr'

export const metadata: Metadata = {
  title:      'Nous contacter',
  description: 'Une question ou suggestion sur BARNA\'B QR ? Contactez-nous, nous répondons sous 48h.',
  alternates: { canonical: `${BASE}/contact` },
  openGraph:  { url: `${BASE}/contact` },
}

export default function ContactPage() {
  const locale = getLocale()
  const c = translations[locale].contact

  return (
    <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-3xl">
      <p className="label mb-6">{c.label}</p>
      <h1
        className="font-black uppercase leading-tight text-navy mb-4"
        style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
      >
        {c.title}
      </h1>
      <p className="text-sm text-navy/50 leading-relaxed mb-12">{c.sub}</p>
      <ContactForm strings={c} />
    </div>
  )
}
