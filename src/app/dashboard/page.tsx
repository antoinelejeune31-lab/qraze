import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { LogoutButton } from './LogoutButton'

export const metadata: Metadata = { title: 'Mon espace' }

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div className="max-w-3xl">

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-16">
          <div>
            <p className="label mb-3">Mon espace</p>
            <h1
              className="font-black uppercase leading-none text-navy"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Bonjour, {session.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-navy/40 mt-2 tracking-wide">{session.email}</p>
          </div>
          <LogoutButton />
        </div>

        {/* CTA créer */}
        <div className="border-2 border-navy p-10 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40 mb-2">Générateur</p>
            <p className="font-black uppercase text-navy text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
              Créer un nouveau QR code
            </p>
            <p className="text-xs text-navy/50 mt-1">Couleurs, logo, formes — export PNG, SVG, JPEG</p>
          </div>
          <Link href="/generator" className="btn-primary shrink-0 px-8 py-3 text-xs">
            Ouvrir le générateur →
          </Link>
        </div>

        {/* Tarifs */}
        <div className="border-2 border-navy/15 p-10 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40 mb-2">Personnalisation</p>
            <p className="font-black uppercase text-navy text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
              Débloquer toutes les options
            </p>
            <p className="text-xs text-navy/50 mt-1">Couleurs, dégradés, logo, SVG — 1,99 € · paiement unique</p>
          </div>
          <Link href="/pricing" className="btn-secondary shrink-0 px-8 py-3 text-xs">
            Voir les tarifs →
          </Link>
        </div>

        {/* Suppression compte */}
        <div className="border-2 border-navy/10 p-10">
          <p className="text-xs font-bold tracking-widest uppercase text-navy/30 mb-2">Zone de danger</p>
          <p className="text-xs text-navy/50 mb-4 leading-relaxed">
            La suppression est irréversible et efface toutes vos données (RGPD — droit à l'effacement).
          </p>
          <button className="text-xs font-bold tracking-widest uppercase text-red-500 border border-red-300 px-4 py-2 hover:bg-red-50 transition-colors">
            Supprimer mon compte
          </button>
        </div>

      </div>
    </div>
  )
}
