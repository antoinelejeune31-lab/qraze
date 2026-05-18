import Link from 'next/link'
import type { Locale } from '@/lib/translations'
import { translations } from '@/lib/translations'

export function Footer({ locale }: { locale: Locale }) {
  const f = translations[locale].footer
  return (
    <footer className="border-t-2 border-navy bg-white">
      <div className="px-6 md:px-12 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 md:divide-x-2 md:divide-navy/10">
        <div className="md:pr-12">
          <p className="font-black text-navy text-sm tracking-widest mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            {"QRaze"}
          </p>
          <p className="text-xs text-navy/40 leading-relaxed">
            {f.tagline.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </p>
        </div>

        <div className="md:px-12">
          <p className="label mb-5">{f.product}</p>
          <ul className="space-y-3 text-xs font-medium text-navy/50">
            <li><Link href="/generator" className="hover:text-navy transition-colors uppercase tracking-wide">{f.generator}</Link></li>
            <li><Link href="/pricing"   className="hover:text-navy transition-colors uppercase tracking-wide">{f.pricing}</Link></li>
            <li><Link href="/dashboard" className="hover:text-navy transition-colors uppercase tracking-wide">{f.dashboard}</Link></li>
          </ul>
        </div>

        <div className="md:px-12">
          <p className="label mb-5">{f.account}</p>
          <ul className="space-y-3 text-xs font-medium text-navy/50">
            <li><Link href="/login"    className="hover:text-navy transition-colors uppercase tracking-wide">{f.login}</Link></li>
            <li><Link href="/register" className="hover:text-navy transition-colors uppercase tracking-wide">{f.register}</Link></li>
            <li className="pt-2">
              <Link href="/contact" className="inline-block bg-navy text-white text-xs font-bold tracking-widest uppercase px-4 py-2 hover:bg-navy/80 transition-colors">
                {f.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:px-12">
          <p className="label mb-5">{f.legal}</p>
          <ul className="space-y-3 text-xs font-medium text-navy/50">
            <li><Link href="/rgpd/mentions-legales"          className="hover:text-navy transition-colors uppercase tracking-wide">{f.mentions}</Link></li>
            <li><Link href="/rgpd/politique-confidentialite" className="hover:text-navy transition-colors uppercase tracking-wide">{f.privacy}</Link></li>
            <li><Link href="/rgpd/cgu"                       className="hover:text-navy transition-colors uppercase tracking-wide">{f.cgu}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-navy/10 px-6 py-5 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs font-bold tracking-widest uppercase text-navy/30">
          {"© "}{new Date().getFullYear()}{" QRaze"}
        </span>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="text-xs font-bold tracking-widest uppercase text-navy/40 hover:text-navy transition-colors">
            {f.contact}
          </Link>
          <span className="text-xs text-navy/20 tracking-wide">{f.rights}</span>
        </div>
      </div>
    </footer>
  )
}
