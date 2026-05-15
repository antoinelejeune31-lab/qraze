import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = { title: 'Gérer mon consentement' }

const ConsentForm = dynamic(() => import('@/components/rgpd/ConsentForm'), { ssr: false })

export default function ConsentementPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose prose-sm">
      <h1 className="text-3xl font-light text-navy mb-8">Gérer mon consentement</h1>
      <p className="text-navy/70 text-sm mb-6">Ici vous pouvez accepter ou refuser les cookies et la collecte de données.</p>
      <ConsentForm />
    </div>
  )
}
