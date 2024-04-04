import React, { createContext, useContext, useState } from 'react'

interface InitialState {
  token: string | null
  userMail: string | null
  methodAuths: [string, string] | [string] | null
  failConfig: {
    resetPass?: boolean
    otpKey?: boolean
  }
}

const initialState: InitialState = {
  token: null,
  failConfig: {},
  methodAuths: null,
  userMail: null
}

interface Actions {
  setState: React.Dispatch<React.SetStateAction<InitialState>>
}

const AuthContext = createContext<InitialState & Actions | null>(null)

export function AuthProvider ({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialState)

  return (
    <AuthContext.Provider value={{ ...state, setState }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext () {
  const context = useContext(AuthContext)
  if (context == null) throw new Error('Provider indefined')
  return context
}
