'use client'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)
  const nav = [
    { href: '/generator', label: 'Générateur' },
    { href: '/pricing',   label: 'Tarifs' },
    { href: '/dashboard', label: 'Dashboard' },
  ]
  return (
    <header className="border-b border-navy/10 bg-cream/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-widest uppercase text-navy text-sm">QRCraft</Link>
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-navy/60">
          {nav.map(n => <Link key={n.href} href={n.href} className="hover:text-navy transition-colors">{n.label}</Link>)}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login"    className="btn-secondary text-xs px-4 py-2">Connexion</Link>
          <Link href="/register" className="btn-primary   text-xs px-4 py-2">S'inscrire</Link>
        </div>
        <button className="md:hidden text-navy" onClick={() => setOpen(!open)}>☰</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-navy/10 bg-cream px-6 py-4 flex flex-col gap-4 text-xs font-semibold tracking-widest uppercase">
          {nav.map(n => <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>)}
          <Link href="/login"    onClick={() => setOpen(false)}>Connexion</Link>
          <Link href="/register" onClick={() => setOpen(false)}>S'inscrire</Link>
        </div>
      )}
    </header>
  )
}
