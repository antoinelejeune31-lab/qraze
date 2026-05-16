import { cookies } from 'next/headers'
import { Locale, locales, defaultLocale } from './translations'

export function getLocale(): Locale {
  const cookieStore = cookies()
  const lang = cookieStore.get('lang')?.value
  return (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale
}
