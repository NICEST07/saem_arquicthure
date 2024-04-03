import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { AuthOptions, User } from 'next-auth'
import axios from 'axios'
import { ResponseSession } from './types.d'

const maxAge = () => { // calcula cuantos segundos faltan para la media noche para cerrar la session
  const now = new Date()
  const targetTime = new Date(now)
  targetTime.setHours(24, 0, 0, 0)

  const timeDiff = targetTime.getTime() - now.getTime()
  const secondsRemaining = Math.floor(timeDiff / 1000)
  return secondsRemaining
}

export const authOptions: AuthOptions = {
  session: {
    maxAge: maxAge()// 24 hours
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        accessToken: { label: 'Token', type: 'text' }
      },
      async authorize (credentials, req) {
        try {
          const { data } = await axios.get<ResponseSession>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user-info/info-user`, {
            headers: {
              Authorization: `Bearer ${credentials?.accessToken ?? undefined}`,
              origin: req?.headers?.origin
            }
          })
          if (!data.success) throw new Error(data?.message ?? 'Error al obtener la información del usuario')
          return { id: '', ...data.infoUser, accessToken: credentials?.accessToken ?? undefined } as User
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt ({ token, user }) {
      if (user != null) return { ...token, jwt: user?.accessToken }
      return token
    },
    async session ({ session, token }) {
      if (token != null) return { ...session, jwt: token.jwt }
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
