import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t-2 border-navy bg-white">
      <div className="px-6 md:px-12 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 md:divide-x-2 md:divide-navy/10">
        <div className="md:pr-12">
          <p
            className="font-black text-navy text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {"BARNA'B QR"}
          </p>
          <p className="text-xs text-navy/40 leading-relaxed">
            Générateur de QR codes personnalisés.<br />Gratuit, rapide, conforme RGPD.
          </p>
        </div>

        <div className="md:px-12">
          <p className="label mb-5">Produit</p>
          <ul className="space-y-3 text-xs font-medium text-navy/50">
            <li><Link href="/generator" className="hover:text-navy transition-colors uppercase tracking-wide">Générateur</Link></li>
            <li><Link href="/pricing"   className="hover:text-navy transition-colors uppercase tracking-wide">Tarifs</Link></li>
            <li><Link href="/dashboard" className="hover:text-navy transition-colors uppercase tracking-wide">Dashboard</Link></li>
          </ul>
        </div>

        <div className="md:px-12">
          <p className="label mb-5">Compte</p>
          <ul className="space-y-3 text-xs font-medium text-navy/50">
            <li><Link href="/login"    className="hover:text-navy transition-colors uppercase tracking-wide">Connexion</Link></li>
            <li><Link href="/register" className="hover:text-navy transition-colors uppercase tracking-wide">Inscription</Link></li>
          </ul>
        </div>

        <div className="md:px-12">
          <p className="label mb-5">Légal</p>
          <ul className="space-y-3 text-xs font-medium text-navy/50">
            <li><Link href="/rgpd/mentions-legales"          className="hover:text-navy transition-colors uppercase tracking-wide">Mentions légales</Link></li>
            <li><Link href="/rgpd/politique-confidentialite" className="hover:text-navy transition-colors uppercase tracking-wide">Confidentialité</Link></li>
            <li><Link href="/rgpd/cgu"                       className="hover:text-navy transition-colors uppercase tracking-wide">CGU</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-navy/10 px-6 py-5 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <span className="text-xs font-bold tracking-widest uppercase text-navy/30">
          {"© "}{new Date().getFullYear()}{" BARNA'B QR"}
        </span>
        <span className="text-xs text-navy/20 tracking-wide">Tous droits réservés</span>
      </div>
    </footer>
  )
}
