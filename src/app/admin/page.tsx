'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Request = { id: string; first_name: string; last_name: string; email: string; download_type: 'free' | 'paid'; created_at: string }
type DayDl   = { day: string; free: number; paid: number }
type DayPv   = { day: string; count: number }
type HourRow = { hour: number; count: number }
type PageRow = { path: string; count: number }

type Stats = {
  downloads: { total: number; today: number; week: number; uniqueEmails: number; conversionRate: number; byDay: DayDl[]; byHour: HourRow[] }
  pageViews: { total: number; today: number; week: number; byPage: PageRow[]; byDay: DayPv[] }
}

// ── Mini bar chart (SVG) ───────────────────────────────────────────────────
function BarChart({ bars, color = '#0d1b3e', height = 64 }: { bars: { label: string; value: number }[]; color?: string; height?: number }) {
  const max = Math.max(...bars.map(b => b.value), 1)
  const w   = Math.max(Math.floor(200 / bars.length) - 2, 4)
  return (
    <svg width="100%" viewBox={`0 0 ${bars.length * (w + 2)} ${height + 18}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      {bars.map((b, i) => {
        const bh = Math.max((b.value / max) * height, b.value > 0 ? 2 : 0)
        return (
          <g key={i}>
            <rect x={i * (w + 2)} y={height - bh} width={w} height={bh} fill={color} opacity={0.85} rx={1} />
            {bars.length <= 14 && (
              <text x={i * (w + 2) + w / 2} y={height + 13} textAnchor="middle" fontSize="7" fill="#0d1b3e" opacity={0.4}>
                {b.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────
function Stat({ label, value, sub, dark }: { label: string; value: string | number; sub?: string; dark?: boolean }) {
  return (
    <div className={`px-7 py-5 flex flex-col gap-1 ${dark ? 'bg-navy text-white' : 'bg-white border-2 border-navy/10 text-navy'}`}>
      <p className="text-2xl font-black" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</p>
      <p className={`text-xs font-bold tracking-widest uppercase ${dark ? 'text-white/40' : 'text-navy/40'}`}>{label}</p>
      {sub && <p className={`text-xs ${dark ? 'text-white/30' : 'text-navy/30'}`}>{sub}</p>}
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
const dayLabel = (iso: string) => iso.slice(5) // MM-DD

// Fill missing days in a 14-day range
function fillDays<T extends { day: string }>(rows: T[], zero: Omit<T, 'day'>): (T & { day: string })[] {
  const result: (T & { day: string })[] = []
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const found = rows.find(r => r.day?.slice(0, 10) === key)
    result.push(found ? found : { ...zero, day: key } as T & { day: string })
  }
  return result
}

export default function AdminPage() {
  const router = useRouter()
  const [requests, setRequests] = useState<Request[]>([])
  const [stats,    setStats]    = useState<Stats | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [filter,   setFilter]   = useState<'all' | 'free' | 'paid'>('all')

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/requests').then(r => { if (r.status === 401) { router.push('/admin/login'); return null } return r.json() }),
      fetch('/api/admin/stats').then(r => r.ok ? r.json() : null),
    ]).then(([req, st]) => {
      if (req?.data)  setRequests(req.data)
      if (st)         setStats(st)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [router])

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const filtered = requests.filter(r => {
    const matchType   = filter === 'all' || r.download_type === filter
    const q           = search.toLowerCase()
    const matchSearch = !q || [r.first_name, r.last_name, r.email].some(v => v.toLowerCase().includes(q))
    return matchType && matchSearch
  })

  if (loading) return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <p className="text-white/40 text-xs font-bold tracking-widest uppercase">Chargement…</p>
    </div>
  )

  const dl = stats?.downloads
  const pv = stats?.pageViews

  const dlDays  = dl ? fillDays(dl.byDay,  { free: 0, paid: 0 }) : []
  const pvDays  = pv ? fillDays(pv.byDay,  { count: 0 })         : []
  const hours   = dl ? Array.from({ length: 24 }, (_, h) => ({ label: `${h}h`, value: dl.byHour.find(r => r.hour === h)?.count ?? 0 })) : []

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      {/* Header */}
      <div className="bg-navy text-white px-8 py-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-0.5">Administration</p>
          <h1 className="font-black uppercase text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>{"BARNA'B QR"}</h1>
        </div>
        <button onClick={logout} className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors">
          Déconnexion →
        </button>
      </div>

      <div className="px-8 py-8 max-w-7xl mx-auto flex flex-col gap-8">

        {/* ── Téléchargements ── */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-navy/40 mb-3">Téléchargements</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Stat label="Total"          value={dl?.total ?? 0}          dark />
            <Stat label="Aujourd'hui"    value={dl?.today ?? 0}          />
            <Stat label="7 derniers j."  value={dl?.week  ?? 0}          />
            <Stat label="Emails uniques" value={dl?.uniqueEmails ?? 0}   />
            <Stat label="Taux payant"    value={`${dl?.conversionRate ?? 0} %`} sub={`${requests.filter(r => r.download_type === 'paid').length} payant(s)`} />
          </div>
        </div>

        {/* ── Trafic pages ── */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-navy/40 mb-3">Trafic</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Stat label="Pages vues total"   value={pv?.total ?? 0} dark />
            <Stat label="Aujourd'hui"        value={pv?.today ?? 0} />
            <Stat label="7 derniers jours"   value={pv?.week  ?? 0} />
          </div>
        </div>

        {/* ── Graphiques ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-white border-2 border-navy/10 p-6 flex flex-col gap-4">
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40">Téléchargements — 14 derniers jours</p>
            {dlDays.length > 0 ? (
              <>
                <BarChart
                  bars={dlDays.map(d => ({ label: dayLabel(d.day), value: d.free + d.paid }))}
                />
                <div className="flex gap-4 text-xs text-navy/40 font-medium">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-navy/70 inline-block" /> Gratuit</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-navy inline-block" /> Payant</span>
                </div>
              </>
            ) : <p className="text-xs text-navy/30">Pas encore de données</p>}
          </div>

          <div className="bg-white border-2 border-navy/10 p-6 flex flex-col gap-4">
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40">Pages vues — 14 derniers jours</p>
            {pvDays.length > 0
              ? <BarChart bars={pvDays.map(d => ({ label: dayLabel(d.day), value: d.count }))} color="#2563eb" />
              : <p className="text-xs text-navy/30">Pas encore de données</p>}
          </div>

          <div className="bg-white border-2 border-navy/10 p-6 flex flex-col gap-4">
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40">Heures de pointe (UTC)</p>
            {hours.some(h => h.value > 0)
              ? <BarChart bars={hours} height={48} />
              : <p className="text-xs text-navy/30">Pas encore de données</p>}
          </div>

          <div className="bg-white border-2 border-navy/10 p-6 flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest uppercase text-navy/40">Pages les plus visitées</p>
            {pv?.byPage.length ? pv.byPage.map(p => (
              <div key={p.path} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="h-1.5 bg-navy/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-navy rounded-full"
                      style={{ width: `${Math.round((p.count / (pv.byPage[0]?.count || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs font-mono text-navy/50 w-6 text-right shrink-0">{p.count}</span>
                <span className="text-xs text-navy font-medium truncate max-w-[120px]">{p.path}</span>
              </div>
            )) : <p className="text-xs text-navy/30">Pas encore de données</p>}
          </div>
        </div>

        {/* ── Tableau demandes ── */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-navy/40 mb-3">Demandes de téléchargement</p>
          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <input
              type="text" placeholder="Rechercher…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="border-2 border-navy/20 focus:border-navy outline-none px-4 py-2.5 text-sm font-medium text-navy flex-1 transition-colors bg-white"
            />
            <div className="flex gap-2">
              {(['all', 'free', 'paid'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase border-2 transition-colors ${filter === f ? 'bg-navy text-white border-navy' : 'bg-white text-navy/50 border-navy/20 hover:border-navy hover:text-navy'}`}>
                  {f === 'all' ? 'Tous' : f === 'free' ? 'Gratuits' : 'Payants'}
                </button>
              ))}
            </div>
            <a
              href={`data:text/csv;charset=utf-8,Prénom,Nom,Email,Type,Date\n${filtered.map(r => `${r.first_name},${r.last_name},${r.email},${r.download_type},${r.created_at}`).join('\n')}`}
              download="barnab-requests.csv"
              className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase bg-white border-2 border-navy/20 hover:border-navy text-navy transition-colors text-center"
            >
              ↓ CSV
            </a>
          </div>

          <div className="bg-white border-2 border-navy/10 overflow-x-auto">
            {filtered.length === 0 ? (
              <div className="px-8 py-12 text-center text-navy/30 text-sm font-bold tracking-widest uppercase">Aucune demande</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-navy/10">
                    {['Prénom', 'Nom', 'Email', 'Type', 'Date'].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-bold tracking-widest uppercase text-navy/40">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={r.id} className={`border-b border-navy/5 hover:bg-navy/[0.02] ${i % 2 ? 'bg-navy/[0.01]' : ''}`}>
                      <td className="px-5 py-3 font-medium text-navy">{r.first_name}</td>
                      <td className="px-5 py-3 font-medium text-navy">{r.last_name}</td>
                      <td className="px-5 py-3 text-navy/60 font-mono text-xs">{r.email}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 text-xs font-bold tracking-widest uppercase ${r.download_type === 'paid' ? 'bg-navy text-white' : 'bg-navy/10 text-navy'}`}>
                          {r.download_type === 'paid' ? 'Payant' : 'Gratuit'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-navy/40 text-xs font-mono">{fmtDate(r.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <p className="text-xs text-navy/30 font-medium text-right mt-2">{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</p>
        </div>

      </div>
    </div>
  )
}
