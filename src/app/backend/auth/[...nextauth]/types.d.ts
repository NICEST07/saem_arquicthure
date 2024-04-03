export interface ResponseSession {
  infoUser: InfoUser
  message: string
  success: boolean
}

export interface InfoUser {
  changeEmail: number
  verifyEmail: number
  cellphone: string
  changeCellphone: number
  verifyCellphone: number
  country: string
  isReseller: boolean
  accessToken: string | undefined
}

declare module 'next-auth' {
  interface Session {
    user: InfoUser & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends InfoUser {
    idToken?: string
  }
}
