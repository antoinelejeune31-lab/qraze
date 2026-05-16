import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://barnabqr.fr'

export const metadata: Metadata = {
  title:       'Générateur de QR Code gratuit en ligne',
  description: 'Créez votre QR code personnalisé gratuitement en ligne : couleurs, formes de modules, logo, dégradé, effet liquid glass. Export PNG 1024px, SVG vectoriel, JPEG. Sans inscription.',
  keywords:    ['générateur QR code en ligne', 'QR code gratuit', 'QR code personnalisé', 'créer QR code logo', 'QR code couleur', 'QR code SVG', 'QR code PNG', 'outil QR code'],
  alternates:  { canonical: `${BASE}/generator` },
  openGraph: {
    title:       'Générateur de QR Code gratuit en ligne — BARNA\'B QR',
    description: 'Personnalisez chaque détail : couleurs, formes, logo, dégradés. Export PNG, SVG, JPEG. Sans inscription.',
    url:         `${BASE}/generator`,
  },
}

const QRGenerator = dynamic(() => import('@/components/qr/Generator.jsx'), {
  ssr: false,
  loading: () => (
    <div className="border border-navy/10 p-12 text-center text-sm text-navy/40 tracking-widest uppercase">
      Chargement…
    </div>
  ),
})

export default function GeneratorPage() {
  return (
    <>
      <div className="border-b-2 border-navy">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="label">Outil gratuit</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-3">
            <h1
              className="font-black uppercase leading-none text-navy"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Générateur<br className="hidden md:block" /> de QR Code
            </h1>
            <p className="text-navy/50 text-sm leading-relaxed max-w-xs md:text-right">
              Couleurs, formes, logo, dégradés.<br />
              Exportez en PNG, SVG ou JPEG.
            </p>
          </div>
        </div>
      </div>

      <QRGenerator />
    </>
  )
}
