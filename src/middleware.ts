import { locales } from '@src/config/i18n'
import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const publicPages = ['/login', '/register', '/forgot-password']

const intlMiddleware = createIntlMiddleware({
  defaultLocale: locales[0],
  locales,
  localeDetection: true
})

const authMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token != null
  },
  pages: {
    signIn: '/login'
  }
}
)

export default async function middleware (req: NextRequest) {
  const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
