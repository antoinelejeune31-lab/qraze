'use client'

import { useState } from 'react'
import Link from 'next/link'

type QRCode = {
  id: string
  name: string
  content: string
  type: string
  scan_count: number
  created_at: string
}

const TYPE_LABELS: Record<string, string> = {
  url:   'URL',
  wifi:  'Wi-Fi',
  vcard: 'vCard',
  sms:   'SMS',
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
}

export function QRList({ initialCodes }: { initialCodes: QRCode[] }) {
  const [codes, setCodes] = useState<QRCode[]>(initialCodes)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce QR code ? Cette action est irréversible.')) return
    setDeleting(id)
    try {
      await fetch(`/api/qr/delete?id=${id}`, { method: 'DELETE' })
      setCodes(c => c.filter(q => q.id !== id))
    } catch {
      alert('Erreur lors de la suppression.')
    }
    setDeleting(null)
  }

  if (codes.length === 0) {
    return (
      <div className="border-2 border-dashed border-navy/15 p-12 text-center">
        <p className="text-xs font-bold tracking-widest uppercase text-navy/30 mb-2">Aucun QR code</p>
        <p className="text-xs text-navy/40">Créez votre premier QR code dans le générateur.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {codes.map(qr => (
        <div key={qr.id} className="border-2 border-navy/10 p-6 flex items-center justify-between gap-4 group hover:border-navy/25 transition-colors">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span
                className="text-xs font-black uppercase tracking-wide text-navy"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {qr.name}
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-navy/30 border border-navy/15 px-2 py-0.5">
                {TYPE_LABELS[qr.type] ?? qr.type}
              </span>
            </div>
            <p className="text-xs text-navy/40 truncate max-w-xs">{qr.content}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs font-bold text-navy/50">
                {qr.scan_count} scan{qr.scan_count !== 1 ? 's' : ''}
              </span>
              <span className="text-xs text-navy/30">·</span>
              <span className="text-xs text-navy/30">Créé le {formatDate(qr.created_at)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/generator?content=${encodeURIComponent(qr.content)}&type=${qr.type}`}
              className="text-xs font-bold tracking-widest uppercase text-navy/40 hover:text-navy transition-colors"
            >
              Éditer
            </Link>
            <button
              onClick={() => handleDelete(qr.id)}
              disabled={deleting === qr.id}
              className="text-xs font-bold tracking-widest uppercase text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
            >
              {deleting === qr.id ? '…' : 'Supprimer'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
