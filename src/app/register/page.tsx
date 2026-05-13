"use client"
import React, { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('error')
      setMessage('Email de confirmation envoyé')
    } catch (_) {
      setMessage('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="card">
        <h1 className="text-2xl font-light text-navy mb-4">Créer un compte</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="input" placeholder="Nom" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: (e.target as HTMLInputElement).value }))} />
          <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: (e.target as HTMLInputElement).value }))} />
          <input className="input" placeholder="Mot de passe" type="password" value={form.password} onChange={(e) => setForm((s) => ({ ...s, password: (e.target as HTMLInputElement).value }))} />
          <button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? 'Création…' : 'Créer mon compte'}</button>
        </form>
        {message && <p className="mt-4 text-sm text-navy/70">{message}</p>}
        <p className="mt-4 text-xs">Déjà un compte ? <Link href="/login">Se connecter</Link></p>
      </div>
    </div>
  )
}
