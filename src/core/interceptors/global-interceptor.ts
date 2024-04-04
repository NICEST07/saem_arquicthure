import axios from 'axios'
import { CacheToken } from '../lib/cache-token'
import { authOptions } from '@src/app/backend/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { getLang } from '../utils/get-lang'

export const GlobalInterceptor = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  timeout: 10000
})

GlobalInterceptor.interceptors.request.use(async (req) => {
  const session = await getToken()
  const lang = await getLang()
  if (session != null) {
    req.headers.Authorization = `Bearer ${session}`
  }
  req.headers['X-language'] = lang
  return req
})

const cacheToken = new CacheToken()

export async function getToken () {
  const currentToken = cacheToken.getToken()
  if (currentToken != null) return currentToken

  if (typeof window !== 'undefined') {
    const token = (await getSession())?.user.accessToken
    cacheToken.setToken(token)
    return token
  }

  const token = (await getServerSession(authOptions))?.user?.accessToken
  cacheToken.setToken(token)
  return token
}
