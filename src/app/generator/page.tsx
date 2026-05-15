import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Générateur de QR Code',
  description: 'Créez votre QR code personnalisé gratuitement. Couleurs, formes, logo, dégradé, liquid glass.',
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
