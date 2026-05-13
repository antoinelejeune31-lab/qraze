import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mentions légales' }

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose prose-sm">
      <h1 className="text-3xl font-light text-navy mb-8">Mentions légales</h1>
      <div className="space-y-6 text-navy/70 text-sm leading-relaxed">
        <section>
          <h2 className="font-semibold text-navy text-base mb-2">Éditeur du site</h2>
          <p>[Nom / Raison sociale]<br/>[Adresse]<br/>[Email de contact]<br/>[Numéro SIRET si applicable]</p>
        </section>
        <section>
          <h2 className="font-semibold text-navy text-base mb-2">Hébergement</h2>
          <p>Vercel Inc.<br/>440 N Barranca Ave #4133, Covina, CA 91723, USA<br/>https://vercel.com</p>
        </section>
        <section>
          <h2 className="font-semibold text-navy text-base mb-2">Propriété intellectuelle</h2>
          <p>L'ensemble du contenu de ce site (textes, images, code) est protégé par le droit d'auteur. Toute reproduction sans autorisation est interdite.</p>
        </section>
        <section>
          <h2 className="font-semibold text-navy text-base mb-2">Données personnelles</h2>
          <p>Voir notre <a href="/rgpd/politique-confidentialite" className="underline">politique de confidentialité</a>.</p>
        </section>
      </div>
    </div>
  )
}
