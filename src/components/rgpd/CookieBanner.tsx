'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { initAnalytics } from '@/lib/analytics'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  // multi-tab sync: fermer la modal si un autre onglet a enregistré un consentement
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cookie_consent' && e.newValue) setVisible(false)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    if (visible) {
      previouslyFocused.current = document.activeElement as HTMLElement | null
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      setTimeout(() => { const btn = modalRef.current?.querySelector<HTMLButtonElement>('button'); btn?.focus() }, 0)
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setVisible(false); if (e.key === 'Tab') handleTabKey(e) }
      const handleTabKey = (e: KeyboardEvent) => {
        const container = modalRef.current
        if (!container) return
        const focusable = Array.from(container.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'))
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus() }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus() }
        }
      }
      window.addEventListener('keydown', onKey)
      return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
    } else {
      previouslyFocused.current?.focus()
    }
  }, [visible])

  const accept = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ analytics: true, ads: true, date: new Date().toISOString() }))
    setVisible(false)
    try { initAnalytics() } catch (e) { /* noop */ }
    // send to server (if logged in) - non bloquant
    try { fetch('/api/consent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ analytics: true, ads: true }) }) } catch (e) { /* noop */ }
  }

  const reject = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ analytics: false, ads: false, date: new Date().toISOString() }))
    setVisible(false)
    try { fetch('/api/consent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ analytics: false, ads: false }) }) } catch (e) { /* noop */ }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Bannière cookies">
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      <div ref={modalRef} className="relative bg-cream border border-navy/10 rounded-lg shadow-lg max-w-2xl w-full mx-4 p-6 text-navy/100">
        <h2 className="text-lg font-semibold text-navy mb-2">Cookies et confidentialité</h2>
        <p className="text-sm mb-4">Nous utilisons des cookies pour améliorer votre expérience et proposer des contenus et publicités personnalisés. Vous pouvez accepter ou refuser ci‑dessous.</p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-navy/70">
            <Link href="/rgpd/politique-confidentialite" className="underline mr-3">Politique de confidentialité</Link>
            <Link href="/rgpd/consentement" className="underline">Gérer mes choix</Link>
          </div>

          <div className="flex gap-3">
            <button onClick={reject} className="btn-secondary text-sm px-4 py-2">Refuser</button>
            <button onClick={accept} className="btn-primary text-sm px-4 py-2">Accepter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

