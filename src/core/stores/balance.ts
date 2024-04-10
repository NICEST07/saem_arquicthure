import { create } from 'zustand'
import { GlobalInterceptor } from '../interceptors/global-interceptor'

interface BalanceState {
  global: number
  sms: number | null
  callblasting: number | null
  email: number | null
  hlrlookup: number | null
  c2me: number | null
}

const initialState: BalanceState = {
  global: 0,
  sms: null,
  callblasting: null,
  email: null,
  hlrlookup: null,
  c2me: null
}
interface BalanceActions {
  updateBalance: (key: string, value: number) => void
  editBalance: (key: string, value: number) => void
  fetchCreditsGlobals: () => Promise<void>
}

export const useBalanceStore = create<BalanceState & BalanceActions>((set, get) => ({
  ...initialState,
  fetchCreditsGlobals: async () => set({ global: await getCreditsGlobals() }),
  updateBalance: (key, value) => set(({ [key]: value })),
  editBalance: (key, value) => {
    const globalValue = get().global
    const currentValue = get()[key as keyof BalanceState] ?? 0
    if (value > (Number(globalValue) + Number(currentValue))) {
      set(({ [key]: Number(globalValue) + Number(currentValue), global: 0 }))
      return
    }

    set(({ [key]: value, global: (Number(globalValue) + Number(currentValue)) - value }))
  },

  reset: () => set(initialState)
}))

const getCreditsGlobals = async () => {
  try {
    const { data } = await GlobalInterceptor.get('/dashboard/credit-global')
    return data['credit-global']
  } catch (error) {
    return 0
  }
}
