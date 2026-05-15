export function initAnalytics() {
  // Init Google Analytics 4 si la variable d'env est définie (NEXT_PUBLIC_GA_MEASUREMENT_ID)
  try {
    if (typeof window === 'undefined') return
    if ((window as any)._analyticsInitialized) return
    const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (!id) return

    // Insert GA script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    script.async = true
    document.head.appendChild(script)

  ;(window as any).dataLayer = (window as any).dataLayer || []
  const gtag = (...args: any[]) => { (window as any).dataLayer.push(args) }
  ;(window as any).gtag = gtag
  gtag('js', new Date())
  gtag('config', id, { anonymize_ip: true })

    ;(window as any)._analyticsInitialized = true
  } catch (e) {
    console.warn('Failed to init analytics', e)
  }
}
