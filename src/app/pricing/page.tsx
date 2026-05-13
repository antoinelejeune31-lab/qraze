import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tarifs',
  description: 'Offres QRCraft — Gratuit, Compte et Premium.',
}

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    description: 'Pour découvrir',
    features: ['QR code basique', 'Personnalisation limitée', 'Export PNG', 'Avec publicités'],
    cta: 'Commencer',
    href: '/generator',
    highlight: false,
  },
  {
    name: 'Compte',
    price: 'Gratuit',
    description: 'Avec inscription',
    features: ['Personnalisation complète', 'QR codes à durée limitée', 'Export SVG & PNG HD', 'Tableau de bord', 'Avec publicités'],
    cta: 'Créer un compte',
    href: '/register',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '4,99€/mois',
    description: 'Pour les professionnels',
    features: ['Tout du compte gratuit', 'Statistiques de scans', 'Sans publicités', 'Support prioritaire', 'API access'],
    cta: 'Bientôt disponible',
    href: '#',
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light text-navy mb-4">Tarifs simples</h1>
        <p className="text-navy/60">Commencez gratuitement. Évoluez selon vos besoins.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.name} className={p.highlight ? 'card border-navy' : 'card border-navy/30'}>
            {p.highlight && <p className="text-xs font-semibold tracking-widest uppercase text-navy/50 mb-4">Recommandé</p>}
            <h2 className="text-xl font-semibold text-navy mb-1">{p.name}</h2>
            <p className="text-2xl font-light text-navy mb-1">{p.price}</p>
            <p className="text-xs text-navy/50 mb-6">{p.description}</p>
            <ul className="space-y-2 mb-8">
              {p.features.map(f => (
                <li key={f} className="text-sm text-navy/70 flex items-start gap-2">
                  <span className="text-navy mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href={p.href} className={p.highlight ? 'btn-primary w-full text-center block' : 'btn-secondary w-full text-center block'}>
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
