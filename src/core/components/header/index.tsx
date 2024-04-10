import { AsideNav } from '../aside-nav'
import { LogoReseller } from '../reseller-logo'
import { GlobalBalance } from './globla-balance'
import { Notification } from './notifications'

export async function HeaderMain () {
  return (
    <header className='flex w-full fixed z-50 h-[70px] bg-background justify-end items-center p-5 gap-3 shadow-md'>
      <GlobalBalance />
      <Notification />
      <div className='w-full max-w-max h-16'>
        <LogoReseller />
      </div>
      <AsideNav />
    </header>
  )
}
