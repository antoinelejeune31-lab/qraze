import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Politique de confidentialité' }

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light text-navy mb-8">Politique de confidentialité</h1>
      <div className="space-y-8 text-navy/70 text-sm leading-relaxed">
        <p>Nous collectons uniquement les données nécessaires au fonctionnement du service.</p>
      </div>
    </div>
  )
}
