'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    setLoading(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-xs font-bold tracking-widest uppercase text-navy/40 hover:text-navy transition-colors disabled:opacity-40 shrink-0"
    >
      {loading ? '…' : 'Déconnexion'}
    </button>
  )
}
