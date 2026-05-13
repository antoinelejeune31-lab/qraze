'use client'
import { useEffect } from 'react'

interface AdBannerProps {
  slot: string
  className?: string
}

export function AdBanner({ slot, className = '' }: AdBannerProps) {
  useEffect(() => {
    try { (window as any).adsbygoogle?.push({}) } catch {}
  }, [])

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  if (!clientId) return null

  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
