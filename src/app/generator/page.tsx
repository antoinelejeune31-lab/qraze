import type { Metadata } from 'next'
import { AdBanner } from '@/components/ads/AdBanner'

export const metadata: Metadata = {
  title: 'Générateur de QR Code',
  description: 'Créez votre QR code personnalisé gratuitement. Couleurs, formes, logo, dégradé, liquid glass.',
}

import dynamic from 'next/dynamic'
const QRGenerator = dynamic(() => import('@/components/qr/Generator.jsx'), {
  ssr: false,
  loading: () => <div className="py-8">Chargement du générateur…</div>,
})

export default function GeneratorPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-8">
        <p className="label inline-block bg-navy/5 text-navy px-3 py-1 rounded-full text-xs">Outil gratuit</p>
        <h1 className="mt-4 text-4xl font-extralight text-navy">Générateur de QR Code</h1>
        <p className="mt-2 text-navy/60 text-sm max-w-2xl">Personnalisez entièrement votre QR code (couleurs, formes, logo, dégradé, effets) puis téléchargez-le en haute résolution pour l'utiliser sur vos supports.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          {/* Main generator card */}
          <div className="prose mb-4">
            <h2 className="text-lg font-medium text-navy">Éditeur</h2>
            <p className="text-sm text-navy/60">Modifiez les options à gauche, prévisualisez et exportez.</p>
          </div>
          <div className="w-full">
            <QRGenerator />
          </div>
        </section>

        <aside className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-sm font-semibold text-navy">Aperçu rapide</h3>
            <p className="text-xs text-navy/60 mt-2">Après génération, utilisez le bouton de téléchargement pour récupérer votre QR au format souhaité (PNG/SVG/JPEG).</p>
            <div className="mt-3">
              <AdBanner slot="generator-sidebar" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-sm font-semibold text-navy">Conseils</h3>
            <ul className="mt-2 text-xs text-navy/60 list-disc list-inside space-y-1">
              <li>Assurez-vous d'un bon contraste entre fond et modules pour une lecture fiable.</li>
              <li>Pour un logo central, préférez un ratio ≤ 25% du QR pour garder la lisibilité.</li>
              <li>Testez le QR avec plusieurs lecteurs (mobile) avant diffusion.</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  )
}
