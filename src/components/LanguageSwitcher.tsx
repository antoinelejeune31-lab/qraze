'use client'
import { useEffect, useState } from 'react'
import { Locale, locales, flags, defaultLocale } from '@/lib/translations'

export function LanguageSwitcher() {
  const [current, setCurrent] = useState<Locale>(defaultLocale)
  const [open, setOpen]       = useState(false)

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/)
    const lang  = match?.[1] as Locale
    if (locales.includes(lang)) setCurrent(lang)
  }, [])

  function switchTo(locale: Locale) {
    document.cookie = `lang=${locale};path=/;max-age=${60 * 60 * 24 * 365}`
    setCurrent(locale)
    setOpen(false)
    window.location.reload()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm border border-navy/20 hover:border-navy px-2.5 py-1.5 transition-colors"
        aria-label="Changer de langue"
      >
        <span className="text-base leading-none">{flags[current]}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 bg-white border-2 border-navy z-50 min-w-[120px]">
            {locales.map(locale => (
              <button
                key={locale}
                onClick={() => switchTo(locale)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold tracking-wide hover:bg-navy hover:text-white transition-colors ${current === locale ? 'bg-navy/5' : ''}`}
              >
                <span className="text-base leading-none">{flags[locale]}</span>
                <span className="uppercase">{locale}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
