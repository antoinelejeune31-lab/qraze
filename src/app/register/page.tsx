"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', consent: false, marketing: false })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent) {
      setMessage({ text: 'Vous devez accepter les conditions d\'utilisation.', ok: false })
      return
    }
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage({ text: data.error || 'Erreur lors de l\'inscription.', ok: false })
        return
      }
      setMessage({ text: 'Email de confirmation envoyé. Vérifiez votre boîte mail.', ok: true })
    } catch {
      setMessage({ text: 'Erreur réseau.', ok: false })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="card">
        <h1 className="text-2xl font-light text-navy mb-4">Créer un compte</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Nom</label>
            <input
              className="input" placeholder="Votre nom" value={form.name} required
              onChange={(e) => setForm(s => ({ ...s, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              className="input" placeholder="vous@exemple.com" type="email" value={form.email} required
              onChange={(e) => setForm(s => ({ ...s, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="label">Mot de passe</label>
            <input
              className="input" placeholder="8 caractères minimum" type="password" value={form.password} required minLength={8}
              onChange={(e) => setForm(s => ({ ...s, password: e.target.value }))}
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox" checked={form.consent} required
                onChange={(e) => setForm(s => ({ ...s, consent: e.target.checked }))}
                className="mt-0.5 accent-navy"
              />
              <span className="text-xs text-navy/70">
                J'accepte les <Link href="/rgpd/cgu" className="underline">CGU</Link> et la{' '}
                <Link href="/rgpd/politique-confidentialite" className="underline">politique de confidentialité</Link>. (obligatoire)
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox" checked={form.marketing}
                onChange={(e) => setForm(s => ({ ...s, marketing: e.target.checked }))}
                className="mt-0.5 accent-navy"
              />
              <span className="text-xs text-navy/70">J'accepte de recevoir des communications marketing. (facultatif)</span>
            </label>
          </div>

          <button className="btn-primary w-full" type="submit" disabled={loading}>
            {loading ? 'Création…' : 'Créer mon compte'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-sm p-3 border ${message.ok ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200'}`}>
            {message.text}
          </p>
        )}

        <p className="mt-4 text-xs text-navy/50">
          Déjà un compte ? <Link href="/login" className="underline hover:text-navy">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
