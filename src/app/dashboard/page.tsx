import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { sql, initDb } from '@/lib/db'
import { LogoutButton } from './LogoutButton'
import { QRList } from './QRList'

export const metadata: Metadata = { title: 'Mon espace' }

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  await initDb()

  const qrCodes = await sql`
    SELECT id, name, content, type, options, scan_count, created_at
    FROM qr_codes
    WHERE user_id = ${session.userId}
    ORDER BY created_at DESC
  `

  const totalScans = qrCodes.reduce((sum, q) => sum + ((q.scan_count as number) ?? 0), 0)

  return (
    <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div className="max-w-4xl">

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-12">
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

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="border-2 border-navy p-6">
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40 mb-2">QR codes</p>
            <p
              className="font-black text-navy"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', lineHeight: 1 }}
            >
              {qrCodes.length}
            </p>
          </div>
          <div className="border-2 border-navy/15 p-6">
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40 mb-2">Scans total</p>
            <p
              className="font-black text-navy"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', lineHeight: 1 }}
            >
              {totalScans}
            </p>
          </div>
        </div>

        {/* Section QR codes */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40">Mes QR codes</p>
            <Link
              href="/generator"
              className="text-xs font-bold tracking-widest uppercase text-navy border-b border-navy pb-0.5 hover:opacity-60 transition-opacity"
            >
              + Nouveau
            </Link>
          </div>

          <QRList initialCodes={qrCodes as Parameters<typeof QRList>[0]['initialCodes']} />
        </div>

        {/* Danger zone */}
        <div className="border-2 border-navy/10 p-8">
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
