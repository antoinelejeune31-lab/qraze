import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/rgpd/CookieBanner'
import { TrackPageView } from '@/components/TrackPageView'
import { Analytics } from '@vercel/analytics/next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://barnabqr.fr'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default:  "BARNA'B QR – Générateur de QR codes personnalisés gratuit",
    template: "%s | BARNA'B QR",
  },
  description:
    'Créez des QR codes personnalisés gratuitement : couleurs, formes, logo, dégradés, liquid glass. Export PNG, SVG, JPEG haute qualité. Sans inscription.',
  keywords: [
    'QR code', 'générateur QR code', 'QR code gratuit', 'QR code personnalisé',
    'créer QR code', 'QR code logo', 'QR code couleur', 'QR code vectoriel',
    'QR code sans inscription', 'QR code URL', 'QR code vCard', 'QR code WiFi',
    'générateur QR code gratuit', 'QR code français',
  ],
  authors:  [{ name: "BARNA'B QR" }],
  creator:  "BARNA'B QR",
  robots:   { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type:        'website',
    locale:      'fr_FR',
    url:         BASE,
    siteName:    "BARNA'B QR",
    title:       "BARNA'B QR – Générateur de QR codes personnalisés gratuit",
    description: 'Créez des QR codes personnalisés gratuitement : couleurs, formes, logo, dégradés. Export PNG, SVG, JPEG. Sans inscription.',
    images: [{
      url:    `${BASE}/og-image.png`,
      width:  1200,
      height: 630,
      alt:    "BARNA'B QR – Générateur de QR codes personnalisés",
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       "BARNA'B QR – Générateur de QR codes personnalisés gratuit",
    description: 'Créez des QR codes personnalisés gratuitement. Couleurs, formes, logo, export SVG. Sans inscription.',
    images:      [`${BASE}/og-image.png`],
  },
  alternates: { canonical: BASE },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=Syne:wght@700;800&family=DM+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-navy min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 pt-40">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <TrackPageView />
        <Analytics />
      </body>
    </html>
  )
}
