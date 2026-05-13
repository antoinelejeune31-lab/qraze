import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="label">Mon espace</p>
          <h1 className="text-3xl font-light text-navy">Dashboard</h1>
        </div>
        <Link href="/generator" className="btn-primary text-xs">+ Nouveau QR code</Link>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'QR codes créés', value: '0' },
          { label: 'Scans totaux',   value: '0' },
          { label: 'QR actifs',      value: '0' },
        ].map(s => (
          <div key={s.label} className="card">
            <p className="text-3xl font-light text-navy mb-1">{s.value}</p>
            <p className="text-xs text-navy/50 tracking-widest uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Liste QR codes */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-navy">Mes QR codes</h2>
        </div>
        <div className="text-center py-16 text-navy/30">
          <p className="text-4xl mb-4">◻</p>
          <p className="text-sm">Aucun QR code pour l'instant.</p>
          <Link href="/generator" className="btn-primary text-xs mt-6 inline-block">Créer mon premier QR code</Link>
        </div>
      </div>

      {/* Compte & RGPD */}
      <div className="mt-8 card border-red-200">
        <h3 className="font-semibold text-navy mb-2 text-sm">Zone de danger</h3>
        <p className="text-xs text-navy/50 mb-4">La suppression de votre compte est irréversible et efface toutes vos données (RGPD — droit à l'effacement).</p>
        <button className="text-xs text-red-600 border border-red-300 px-4 py-2 hover:bg-red-50 transition-colors">
          Supprimer mon compte
        </button>
      </div>
    </div>
  )
}
