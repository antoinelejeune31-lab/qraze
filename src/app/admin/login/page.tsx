'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      const { error: msg } = await res.json()
      setError(msg || 'Erreur')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="bg-white border-2 border-navy w-full max-w-sm p-10 flex flex-col gap-6">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-navy/40 mb-2">
            Administration
          </p>
          <h1
            className="font-black text-navy uppercase text-xl"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {"QRaze"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            className="border-2 border-navy/20 focus:border-navy outline-none px-4 py-3 text-sm font-medium text-navy w-full transition-colors"
          />

          {error && (
            <p className="text-xs text-red-600 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-primary py-3 text-sm disabled:opacity-40"
          >
            {loading ? 'Connexion…' : 'Accéder au dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}
