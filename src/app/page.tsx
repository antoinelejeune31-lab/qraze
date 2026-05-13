import Link from 'next/link'
import { AdBanner } from '@/components/ads/AdBanner'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-navy/40 mb-4">
          ✦ Générateur professionnel ✦
        </p>
        <h1 className="text-5xl font-light tracking-tight text-navy mb-6">
          Des QR codes qui vous<br />
          <span className="italic">ressemblent</span>
        </h1>
        <p className="text-navy/60 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
          Créez des QR codes entièrement personnalisés — couleurs, formes, logo, dégradés.
          Gratuit, sans inscription. Compte pour les fonctionnalités avancées.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/generator" className="btn-primary">
            Créer un QR code gratuit
          </Link>
          <Link href="/register" className="btn-secondary">
            Ouvrir un compte
          </Link>
        </div>
      </section>

      <AdBanner slot="homepage-top" />

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="section-title text-center mb-12">Tout ce dont vous avez besoin</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Personnalisation totale', desc: 'Couleurs, dégradés, formes, logos, effet liquid glass — votre QR code est unique.', icon: '✦' },
            { title: 'QR codes à durée limitée', desc: 'Définissez une date d\'expiration. Parfait pour les événements, promotions, campagnes.', icon: '◷' },
            { title: 'Export haute qualité', desc: 'PNG 1024px, SVG vectoriel ou JPEG. Prêt pour l\'impression et le web.', icon: '↓' },
          ].map((f) => (
            <div key={f.title} className="card">
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-navy mb-2">{f.title}</h3>
              <p className="text-sm text-navy/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <AdBanner slot="homepage-middle" />

      {/* Pricing teaser */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="section-title mb-4">Simple et transparent</h2>
        <p className="text-navy/60 mb-8">Commencez gratuitement. Passez à un compte pour débloquer les fonctionnalités avancées.</p>
        <Link href="/pricing" className="btn-secondary">Voir les offres</Link>
      </section>
    </>
  )
}
