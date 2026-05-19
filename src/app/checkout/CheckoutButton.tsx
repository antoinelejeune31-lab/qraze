'use client'

import { useState } from 'react'

export function CheckoutButton({ email }: { email: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCheckout() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email || undefined }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Erreur lors de la création du paiement.')
        setLoading(false)
      }
    } catch {
      setError('Erreur réseau. Réessayez.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p className="text-xs text-red-500 font-mono">{error}</p>
      )}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="btn-primary w-full text-center"
        style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
      >
        {loading ? 'Redirection vers Stripe…' : 'Payer 1,99 € avec Stripe →'}
      </button>
    </div>
  )
}
