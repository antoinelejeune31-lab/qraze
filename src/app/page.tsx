import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const HeroQRGrid = dynamic(
  () => import('@/components/home/HeroQRGrid').then(m => m.HeroQRGrid),
  { ssr: false }
)

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://barnabqr.fr'

export const metadata: Metadata = {
  alternates: { canonical: BASE },
  openGraph:  { url: BASE },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'WebApplication',
  name:       "BARNA'B QR",
  url:        BASE,
  description: 'Générateur de QR codes personnalisés gratuit. Couleurs, formes, logo, dégradés. Export PNG, SVG, JPEG. Sans inscription.',
  applicationCategory: 'UtilityApplication',
  operatingSystem:     'All',
  offers: {
    '@type':      'AggregateOffer',
    lowPrice:     '0',
    highPrice:    '1.99',
    priceCurrency: 'EUR',
    offerCount:   '2',
  },
  featureList: [
    'QR code personnalisé',
    'Export PNG 1024px',
    'Export SVG vectoriel',
    'Export JPEG',
    'Logo au centre',
    'Couleurs et dégradés',
    'Sans inscription',
  ],
  inLanguage:  'fr',
  isAccessibleForFree: true,
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="border-b-2 border-navy">
        <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

            {/* Gauche — pitch */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-navy/40" />
                <span className="text-xs font-bold tracking-widest uppercase text-navy/40">
                  Générateur professionnel · Gratuit
                </span>
              </div>

              <h1
                className="font-black leading-tight tracking-tight text-navy uppercase"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
              >
                Créez des QR codes personnalisés en quelques secondes
              </h1>

              <p className="text-base text-navy/55 leading-relaxed max-w-md">
                Modules, couleurs, dégradés, logo — personnalisez chaque détail.
                Exportez en PNG, SVG ou JPEG. Sans inscription.
              </p>

              <div className="flex flex-col gap-4">
                <Link href="/generator" className="btn-primary px-10 py-4 text-sm self-start">
                  Créer un QR code gratuitement →
                </Link>
                <p className="text-xs text-navy/30 font-medium tracking-wide">
                  Sans inscription · Sans carte bancaire · 100&nbsp;% gratuit
                </p>
              </div>
            </div>

            {/* Droite — grille QR */}
            <div className="w-full">
              <HeroQRGrid />
            </div>

          </div>
        </div>
      </section>

      {/* ── Preuve sociale ───────────────────────────────── */}
      <section className="bg-navy text-white border-b-2 border-navy">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-white/10">
            {[
              { val: '100%',  label: 'Gratuit' },
              { val: '∞',     label: 'QR illimités' },
              { val: 'SVG',   label: 'Vectoriel' },
              { val: 'RGPD',  label: 'Conforme' },
            ].map((s) => (
              <div key={s.val} className="py-7 text-center">
                <p className="text-2xl font-black" style={{ fontFamily: 'Syne, sans-serif' }}>{s.val}</p>
                <p className="text-xs font-bold tracking-widest uppercase text-white/35 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ────────────────────────────── */}
      <section className="border-b-2 border-navy">
        <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <p className="label mb-12">Comment ça marche</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-navy/10">
            {[
              { num: '01', title: 'Saisissez',    desc: 'URL, réseau Wi-Fi, carte de visite ou SMS — choisissez votre type de contenu.' },
              { num: '02', title: 'Personnalisez', desc: 'Couleurs, formes de modules, logo, dégradé — tout se configure en direct.' },
              { num: '03', title: 'Téléchargez',   desc: "PNG 1024 px, SVG vectoriel ou JPEG. Prêt pour l'impression et le web." },
            ].map((step) => (
              <div key={step.num} className="bg-white px-10 py-10 flex flex-col gap-4 group hover:bg-navy transition-colors duration-200">
                <span
                  className="font-black text-navy/10 group-hover:text-white/10 transition-colors"
                  style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', lineHeight: 1 }}
                >
                  {step.num}
                </span>
                <h3 className="text-sm font-black uppercase tracking-wide text-navy group-hover:text-white transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-sm text-navy/50 group-hover:text-white/60 leading-relaxed transition-colors">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fonctionnalités bento ────────────────────────── */}
      <section className="border-b-2 border-navy">
        <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <p className="label mb-12">Ce que vous obtenez</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="md:col-span-2 border-2 border-navy/15 p-10 flex flex-col gap-5 hover:border-navy transition-colors duration-200">
              <span className="font-black text-navy/10" style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', lineHeight: 1 }}>01</span>
              <h3 className="text-lg font-black uppercase text-navy" style={{ fontFamily: 'Syne, sans-serif' }}>Personnalisation totale</h3>
              <p className="text-sm text-navy/55 leading-relaxed max-w-lg">
                Modules ronds, étoiles, losanges, cœurs. Couleurs, dégradés, logo central, effet liquid glass.
                Chaque QR code est unique et reflète votre identité.
              </p>
              <Link href="/generator" className="btn-primary mt-2 inline-flex self-start px-6 py-2.5 text-xs">
                Essayer maintenant →
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <div className="border-2 border-navy/15 p-8 flex-1 flex flex-col gap-3 hover:border-navy transition-colors duration-200">
                <span className="font-black text-navy/10" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.75rem', lineHeight: 1 }}>02</span>
                <h3 className="text-sm font-black uppercase text-navy" style={{ fontFamily: 'Syne, sans-serif' }}>Export haute qualité</h3>
                <p className="text-xs text-navy/50 leading-relaxed">PNG 1024 px, SVG vectoriel ou JPEG. Prêt pour l'impression et le numérique.</p>
              </div>
              <div className="border-2 border-navy/15 p-8 flex-1 flex flex-col gap-3 hover:border-navy transition-colors duration-200">
                <span className="font-black text-navy/10" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.75rem', lineHeight: 1 }}>03</span>
                <h3 className="text-sm font-black uppercase text-navy" style={{ fontFamily: 'Syne, sans-serif' }}>Durée limitée</h3>
                <p className="text-xs text-navy/50 leading-relaxed">Définissez une expiration. Idéal pour événements et promotions éphémères.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Cas d'usage ──────────────────────────────────── */}
      <section className="border-b-2 border-navy">
        <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="label mb-4">Pour chaque besoin</p>
              <h2
                className="font-black uppercase leading-tight text-navy"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)' }}
              >
                Un QR code pour<br />chaque situation
              </h2>
            </div>
            <Link href="/generator" className="btn-primary px-8 py-3 text-xs self-start md:self-end shrink-0">
              Créer le mien →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-navy/10">
            {[
              {
                tag:   'Restauration',
                type:  'URL',
                title: 'Menu digital',
                desc:  'QR code sur table ou vitrine. Vos clients accèdent au menu, à la carte des vins ou aux réservations en un scan.',
              },
              {
                tag:   'Networking',
                type:  'vCard',
                title: 'Carte de visite',
                desc:  'Partagez nom, téléphone et email instantanément. Votre contact s\'enregistre sans saisie.',
              },
              {
                tag:   'Événementiel',
                type:  'URL',
                title: 'Événement',
                desc:  'Programme, billetterie, plan d\'accès — tout accessible depuis le flyer ou le badge.',
              },
              {
                tag:   'Connectivité',
                type:  'Wi-Fi',
                title: 'Réseau Wi-Fi',
                desc:  'Connexion automatique sans saisie de mot de passe. Idéal en boutique, hôtel ou espace de coworking.',
              },
              {
                tag:   'Commerce',
                type:  'URL',
                title: 'Boutique & promo',
                desc:  'Redirigez vers une fiche produit, un code promo ou une page de vente depuis un emballage ou une étiquette.',
              },
              {
                tag:   'Social media',
                type:  'URL',
                title: 'Réseaux sociaux',
                desc:  'Pointez vers votre profil Instagram, LinkedIn ou Linktree depuis une affiche ou un support print.',
              },
              {
                tag:   'Communication',
                type:  'SMS',
                title: 'SMS & contact',
                desc:  'Déclenchez un SMS ou un appel pré-rempli depuis un panneau, un packaging ou une publicité.',
              },
              {
                tag:   'Portfolio',
                type:  'URL',
                title: 'Professionnel',
                desc:  'CV, portfolio, présentation d\'activité ou prise de rendez-vous — directement depuis votre carte ou signature mail.',
              },
            ].map((uc) => (
              <div
                key={uc.title}
                className="bg-white p-8 flex flex-col gap-4 group hover:bg-navy transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-navy/30 group-hover:text-white/30 transition-colors">
                    {uc.tag}
                  </span>
                  <span className="shrink-0 border border-navy/15 group-hover:border-white/15 text-navy/40 group-hover:text-white/40 text-xs font-bold tracking-widest uppercase px-2 py-0.5 transition-colors">
                    {uc.type}
                  </span>
                </div>
                <h3
                  className="font-black uppercase text-sm text-navy group-hover:text-white transition-colors"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {uc.title}
                </h3>
                <p className="text-xs text-navy/50 group-hover:text-white/55 leading-relaxed transition-colors">
                  {uc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────── */}
      <section className="bg-navy text-white">
        <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <p className="text-xs font-bold tracking-widest uppercase text-white/30">— Commencez maintenant</p>
              <h2
                className="font-black uppercase leading-tight"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
              >
                Gratuit.<br />Sans inscription.<br />Instantané.
              </h2>
              <p className="text-white/45 text-sm leading-relaxed max-w-sm">
                Aucune carte bancaire. L'offre payante débloque l'historique, les statistiques et les QR à expiration avancés.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <Link href="/generator" className="btn-white px-10 py-4 text-sm w-full md:w-auto text-center">
                Créer un QR code →
              </Link>
              <Link href="/pricing" className="text-xs font-bold tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors">
                Voir les offres →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
