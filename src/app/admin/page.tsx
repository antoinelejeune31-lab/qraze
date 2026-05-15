'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Request = {
  id: string
  first_name: string
  last_name: string
  email: string
  download_type: 'free' | 'paid'
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState<'all' | 'free' | 'paid'>('all')

  useEffect(() => {
    fetch('/api/admin/requests')
      .then(r => {
        if (r.status === 401) { router.push('/admin/login'); return null }
        return r.json()
      })
      .then(json => {
        if (json?.data) setRequests(json.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [router])

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const filtered = requests.filter(r => {
    const matchType  = filter === 'all' || r.download_type === filter
    const q = search.toLowerCase()
    const matchSearch = !q || [r.first_name, r.last_name, r.email].some(v => v.toLowerCase().includes(q))
    return matchType && matchSearch
  })

  const totalFree = requests.filter(r => r.download_type === 'free').length
  const totalPaid = requests.filter(r => r.download_type === 'paid').length

  const fmt = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <p className="text-white/40 text-xs font-bold tracking-widest uppercase">Chargement…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      {/* Header */}
      <div className="bg-navy text-white px-8 py-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-0.5">Administration</p>
          <h1 className="font-black uppercase text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>
            {"BARNA'B QR"}
          </h1>
        </div>
        <button
          onClick={logout}
          className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors"
        >
          Déconnexion →
        </button>
      </div>

      <div className="px-8 py-8 max-w-7xl mx-auto flex flex-col gap-8">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total demandes', val: requests.length, accent: 'bg-navy text-white' },
            { label: 'Téléchargements gratuits', val: totalFree, accent: 'bg-white text-navy border-2 border-navy/10' },
            { label: 'Paiements initiés', val: totalPaid, accent: 'bg-white text-navy border-2 border-navy/10' },
          ].map(s => (
            <div key={s.label} className={`${s.accent} px-8 py-6`}>
              <p className="text-3xl font-black" style={{ fontFamily: 'Syne, sans-serif' }}>{s.val}</p>
              <p className="text-xs font-bold tracking-widest uppercase opacity-50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Rechercher par nom, email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border-2 border-navy/20 focus:border-navy outline-none px-4 py-2.5 text-sm font-medium text-navy flex-1 transition-colors bg-white"
          />
          <div className="flex gap-2">
            {(['all', 'free', 'paid'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase border-2 transition-colors ${
                  filter === f
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-navy/50 border-navy/20 hover:border-navy hover:text-navy'
                }`}
              >
                {f === 'all' ? 'Tous' : f === 'free' ? 'Gratuits' : 'Payants'}
              </button>
            ))}
          </div>
          <a
            href={`data:text/csv;charset=utf-8,Prénom,Nom,Email,Type,Date\n${filtered.map(r => `${r.first_name},${r.last_name},${r.email},${r.download_type},${r.created_at}`).join('\n')}`}
            download="barnab-requests.csv"
            className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase bg-white border-2 border-navy/20 hover:border-navy text-navy transition-colors text-center"
          >
            ↓ Export CSV
          </a>
        </div>

        {/* Table */}
        <div className="bg-white border-2 border-navy/10 overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="px-8 py-16 text-center text-navy/30 text-sm font-bold tracking-widest uppercase">
              Aucune demande trouvée
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-navy/10">
                  {['Prénom', 'Nom', 'Email', 'Type', 'Date'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-bold tracking-widest uppercase text-navy/40">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr
                    key={r.id}
                    className={`border-b border-navy/5 hover:bg-navy/[0.02] transition-colors ${i % 2 === 0 ? '' : 'bg-navy/[0.015]'}`}
                  >
                    <td className="px-6 py-4 font-medium text-navy">{r.first_name}</td>
                    <td className="px-6 py-4 font-medium text-navy">{r.last_name}</td>
                    <td className="px-6 py-4 text-navy/70 font-mono text-xs">{r.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 text-xs font-bold tracking-widest uppercase ${
                        r.download_type === 'paid'
                          ? 'bg-navy text-white'
                          : 'bg-navy/10 text-navy'
                      }`}>
                        {r.download_type === 'paid' ? 'Payant' : 'Gratuit'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-navy/40 text-xs font-mono">{fmt(r.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="text-xs text-navy/30 font-medium text-right">
          {filtered.length} résultat{filtered.length !== 1 ? 's' : ''} · données en temps réel
        </p>
      </div>
    </div>
  )
}
