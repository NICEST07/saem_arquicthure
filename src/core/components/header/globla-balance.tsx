'use client'
import { useBalanceStore } from '@src/core/stores/balance'
import { useEffect } from 'react'

export function GlobalBalance () {
  const balance = useBalanceStore((state) => state.global)
  const fetchCreditsGlobals = useBalanceStore((state) => state.fetchCreditsGlobals)

  useEffect(() => {
    fetchCreditsGlobals()
  }, [fetchCreditsGlobals])

  return (
    <div className='flex flex-col items-center justify-between'>
      <p className='text-sm text-gray-500'>Global Balance</p>
      <p className='text-xl font-semibold text-green-600'>{balance}</p>
    </div>
  )
}
