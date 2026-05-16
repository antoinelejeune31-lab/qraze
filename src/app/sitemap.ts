import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://barnabqr.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/generator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pricing`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE}/rgpd`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/rgpd/mentions-legales`,          lastModified: new Date(), changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE}/rgpd/politique-confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE}/rgpd/cgu`,                       lastModified: new Date(), changeFrequency: 'yearly', priority: 0.1 },
  ]
}
