import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
export const locales = ['es', 'en', 'pt'] as const

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  const messages = {
    auth: { ...(await import(`@src/assets/languages/${locale}/auth.json`)).default }
    // dashboard: { ...(await import(`../languages/${locale}/dashboard.json`)).default },
    // aside: { ...(await import(`../languages/${locale}/aside-nav.json`)).default },
    // reports: { ...(await import(`../languages/${locale}/reports.json`)).default },
    // resources: { ...(await import(`../languages/${locale}/resources.json`)).default }
    // modals: { ...(await import(`../languages/${locale}/modals.json`)).default }
  }

  // const messages = (await import(`@src/assets/languages/${locale}/index.json`)).default

  return { messages }
})
