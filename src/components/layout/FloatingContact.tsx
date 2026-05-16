import Link from 'next/link'
import type { Locale } from '@/lib/translations'
import { translations } from '@/lib/translations'

export function FloatingContact({ locale }: { locale: Locale }) {
  const label = translations[locale].footer.contact
  return (
    <Link
      href="/contact"
      style={{
        position:       'fixed',
        bottom:         '24px',
        right:          '24px',
        zIndex:         9999,
        backgroundColor: '#0d1b3e',
        color:          '#ffffff',
        padding:        '12px 20px',
        fontSize:       '11px',
        fontFamily:     'Syne, sans-serif',
        fontWeight:     700,
        letterSpacing:  '0.12em',
        textTransform:  'uppercase',
        textDecoration: 'none',
        display:        'inline-block',
        boxShadow:      '0 4px 16px rgba(13,27,62,0.25)',
        border:         '2px solid #0d1b3e',
        whiteSpace:     'nowrap',
      }}
    >
      {label}
    </Link>
  )
}
