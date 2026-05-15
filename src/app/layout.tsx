import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/rgpd/CookieBanner'
import { TrackPageView } from '@/components/TrackPageView'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: { default: "BARNA'B QR – Générateur de QR codes personnalisés", template: "%s | BARNA'B QR" },
  description: 'Créez des QR codes personnalisés, stylisés et à durée limitée. Gratuit, sans inscription.',
  keywords: ['QR code', 'générateur', 'personnalisé', 'gratuit'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: "BARNA'B QR",
  },
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
