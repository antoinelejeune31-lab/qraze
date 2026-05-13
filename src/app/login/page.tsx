'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Erreur de connexion'); return }
      window.location.href = '/dashboard'
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="card">
        <h1 className="text-2xl font-light text-navy mb-2">Connexion</h1>
        <p className="text-xs text-navy/50 mb-8">Accédez à votre espace QRCraft</p>
        {error && <p className="text-red-600 text-xs mb-4 p-3 bg-red-50 border border-red-200">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="input" placeholder="vous@exemple.com" required />
          </div>
          <div>
            <label className="label">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="input" placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
        <p className="text-xs text-navy/50 text-center mt-6">
          Pas encore de compte ? <Link href="/register" className="underline hover:text-navy">S'inscrire</Link>
        </p>
      </div>
    </div>
  )
}
