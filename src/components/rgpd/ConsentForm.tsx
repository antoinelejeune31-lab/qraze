"use client"
import { useState, useEffect } from 'react'

type Consent = { analytics: boolean; ads: boolean; date: string }

export default function ConsentForm() {
  const [consent, setConsent] = useState<Consent | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cookie_consent')
      if (raw) setConsent(JSON.parse(raw))
    } catch (e) { /* ignore */ }
  }, [])

  function save(c: Consent) {
    try {
      localStorage.setItem('cookie_consent', JSON.stringify(c))
      setConsent(c)
    } catch (e) { console.warn('Failed to save consent', e) }
  }

  if (consent) {
    return (
      <div className="bg-cream border border-navy/10 p-6 rounded-md text-sm text-navy/70">
        <p className="mb-4">Votre choix a été enregistré le <strong>{new Date(consent.date).toLocaleString()}</strong>.</p>
        <div className="flex gap-3">
          <button className="btn-secondary" onClick={() => save({ ...consent, analytics: false, ads: false, date: new Date().toISOString() })}>Révoquer tout</button>
          <button className="btn-primary" onClick={() => save({ ...consent, analytics: true, ads: true, date: new Date().toISOString() })}>Tout accepter</button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream border border-navy/10 p-6 rounded-md text-sm text-navy/70">
      <p className="mb-4">Nous utilisons des cookies pour améliorer votre expérience et analyser l'usage. Vous pouvez choisir ci‑dessous.</p>
      <div className="flex flex-col md:flex-row gap-3">
        <button className="btn-secondary" onClick={() => save({ analytics: false, ads: false, date: new Date().toISOString() })}>Refuser</button>
        <button className="btn-primary" onClick={() => save({ analytics: true, ads: true, date: new Date().toISOString() })}>Accepter</button>
      </div>
    </div>
  )
}
