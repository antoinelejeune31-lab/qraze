'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ analytics: true, ads: true, date: new Date().toISOString() }))
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ analytics: false, ads: false, date: new Date().toISOString() }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-cream border-t border-navy/20 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="text-xs text-navy/70 flex-1 leading-relaxed">
          Nous utilisons des cookies pour améliorer votre expérience et afficher des publicités personnalisées.
          Consultez notre{' '}
          <Link href="/rgpd/politique-confidentialite" className="underline hover:text-navy">
            politique de confidentialité
          </Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={reject} className="btn-secondary text-xs px-4 py-2">Refuser</button>
          <button onClick={accept} className="btn-primary  text-xs px-4 py-2">Accepter</button>
        </div>
      </div>
    </div>
  )
}
