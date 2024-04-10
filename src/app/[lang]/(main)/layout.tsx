import { HeaderMain } from '@src/core/components/header'
import React from 'react'

export default function LayoutMain ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderMain />
      {children}
    </>
  )
}
