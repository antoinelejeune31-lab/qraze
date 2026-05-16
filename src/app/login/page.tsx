'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function LoginForm() {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPwd, setShowPwd]     = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [notice, setNotice]       = useState('')
  const [resendSent, setResendSent] = useState(false)
  const [resending, setResending] = useState(false)
  const [showResend, setShowResend] = useState(false)
  const params = useSearchParams()

  useEffect(() => {
    if (params.get('verified') === '1') setNotice('Email confirmé ! Vous pouvez maintenant vous connecter.')
    if (params.get('error') === 'lien-invalide') setError('Lien de vérification invalide ou expiré.')
  }, [params])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setShowResend(false)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Erreur de connexion')
        if (res.status === 403) setShowResend(true)
        return
      }
      window.location.href = '/dashboard'
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) { setError("Saisissez votre email pour renvoyer la confirmation."); return }
    setResending(true)
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Erreur lors de l'envoi."); return }
      setResendSent(true)
      setShowResend(false)
      setNotice('Email de confirmation renvoyé. Vérifiez votre boîte mail (et vos spams).')
      setError('')
    } catch {
      setError('Erreur réseau')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="card">
      <h1 className="text-2xl font-light text-navy mb-2">Connexion</h1>
      <p className="text-xs text-navy/50 mb-8">{"Accédez à votre espace BARNA'B QR"}</p>

      {notice && <p className="text-green-700 text-xs mb-4 p-3 bg-green-50 border border-green-200">{notice}</p>}
      {error  && <p className="text-red-600  text-xs mb-4 p-3 bg-red-50   border border-red-200">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            className="input" placeholder="vous@exemple.com" required />
        </div>
        <div>
          <label className="label">Mot de passe</label>
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input pr-12"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-navy/40 hover:text-navy transition-colors font-medium tracking-wide uppercase"
            >
              {showPwd ? 'Cacher' : 'Voir'}
            </button>
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>

      {showResend && !resendSent && (
        <div className="mt-4 p-3 bg-navy/5 border border-navy/15 text-xs text-navy/60">
          Email non confirmé.{' '}
          <button onClick={handleResend} disabled={resending}
            className="underline hover:text-navy font-medium disabled:opacity-40">
            {resending ? 'Envoi…' : 'Renvoyer l\'email de confirmation'}
          </button>
        </div>
      )}

      <p className="text-xs text-navy/50 text-center mt-6">
        Pas encore de compte ? <Link href="/register" className="underline hover:text-navy">S'inscrire</Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <Suspense fallback={<div className="card h-64" />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
