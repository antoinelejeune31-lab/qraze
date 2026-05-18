'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import type { Locale } from '@/lib/translations'
import { translations } from '@/lib/translations'

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const h = translations[locale].header
  const nav = [
    { href: '/generator', label: h.generator },
    { href: '/pricing',   label: h.pricing   },
  ]
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="px-6 md:px-12 lg:px-20 h-28 flex items-center justify-between">
        <Link href="/" aria-label="QRaze — Accueil">
          <Image src="/logo-qr.svg" alt="QRaze" width={1160} height={280}
            style={{ height: '72px', width: 'auto' }}
            className="animate-bounce-drop"
            priority />
        </Link>

        <nav className="hidden md:flex items-center gap-12 text-base font-bold tracking-widest uppercase text-navy/50">
          {nav.map(n => (
            <Link key={n.href} href={n.href} className="hover:text-navy transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/login"    className="btn-secondary text-sm px-7 py-3">{h.login}</Link>
          <Link href="/register" className="btn-primary   text-sm px-7 py-3">{h.register}</Link>
        </div>

        <button
          className="md:hidden text-navy p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
            {open
              ? <><line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/></>
              : <><line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="12" x2="19" y2="12"/><line x1="3" y1="18" x2="19" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-navy/10 bg-white px-6 py-6 flex flex-col gap-5 text-sm font-bold tracking-widest uppercase text-navy/50">
          {nav.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="hover:text-navy transition-colors">
              {n.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 items-center">
            <LanguageSwitcher />
            <Link href="/login"    onClick={() => setOpen(false)} className="btn-secondary text-xs px-4 py-2">{h.login}</Link>
            <Link href="/register" onClick={() => setOpen(false)} className="btn-primary   text-xs px-4 py-2">{h.register}</Link>
          </div>
        </div>
      )}
    </header>
  )
}
