import { AuthLayout } from '@src/modules/auth/layouts/auth'
import React from 'react'

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  )
}
