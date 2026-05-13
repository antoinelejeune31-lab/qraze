import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-cream mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <p className="font-semibold tracking-widest uppercase text-navy text-sm mb-3">QRCraft</p>
          <p className="text-xs text-navy/50 leading-relaxed">Générateur de QR codes personnalisés. Gratuit, rapide, conforme RGPD.</p>
        </div>
        <div>
          <p className="label mb-3">Produit</p>
          <ul className="space-y-2 text-xs text-navy/60">
            <li><Link href="/generator" className="hover:text-navy">Générateur</Link></li>
            <li><Link href="/pricing"   className="hover:text-navy">Tarifs</Link></li>
            <li><Link href="/dashboard" className="hover:text-navy">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <p className="label mb-3">Compte</p>
          <ul className="space-y-2 text-xs text-navy/60">
            <li><Link href="/login"    className="hover:text-navy">Connexion</Link></li>
            <li><Link href="/register" className="hover:text-navy">Inscription</Link></li>
          </ul>
        </div>
        <div>
          <p className="label mb-3">Légal</p>
          <ul className="space-y-2 text-xs text-navy/60">
            <li><Link href="/rgpd/mentions-legales"          className="hover:text-navy">Mentions légales</Link></li>
            <li><Link href="/rgpd/politique-confidentialite" className="hover:text-navy">Politique de confidentialité</Link></li>
            <li><Link href="/rgpd/cgu"                       className="hover:text-navy">CGU</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy/10 px-6 py-4 text-center text-xs text-navy/40">
        © {new Date().getFullYear()} QRCraft — Tous droits réservés
      </div>
    </footer>
  )
}
