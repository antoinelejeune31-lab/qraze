import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'RGPD & mentions légales' }

export default function RgpdIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose prose-sm">
      <h1 className="text-3xl font-light text-navy mb-8">RGPD & informations légales</h1>
      <div className="space-y-6 text-navy/70 text-sm leading-relaxed">
        <p>Retrouvez ici les informations légales et la politique relative aux données personnelles.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><Link href="/rgpd/mentions-legales" className="underline">Mentions légales</Link></li>
          <li><Link href="/rgpd/politique-confidentialite" className="underline">Politique de confidentialité</Link></li>
          <li><Link href="/rgpd/cgu" className="underline">CGU</Link></li>
          <li><Link href="/rgpd/consentement" className="underline">Gérer mon consentement (cookies)</Link></li>
        </ul>
      </div>
    </div>
  )
}
