import type { Metadata } from 'next'

export const metadata: Metadata = { title: "Conditions Générales d'Utilisation" }

export default function CGUPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light text-navy mb-8">Conditions Générales d'Utilisation</h1>
      <div className="space-y-8 text-navy/70 text-sm leading-relaxed">
        <section>
          <h2 className="font-semibold text-navy text-base mb-2">Article 1 — Objet</h2>
          <p>Les présentes CGU régissent l'utilisation du service. (Version minimale)</p>
        </section>
      </div>
    </div>
  )
}
