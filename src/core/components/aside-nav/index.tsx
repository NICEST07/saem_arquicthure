'use client'
import { useState, Fragment } from 'react'
import { MenuIcon, MoonIcon, SignOutIcon, UserIcon } from '@src/core/icons'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { ListItem } from './list-item'
import { SubListItem } from './list-collapse'
import { useRoutes } from '@src/core/hooks/use-routes'

export function AsideNav () {
  const { data } = useSession()
  const newRoutes = useRoutes({ isReseller: data?.user?.isReseller ?? false })

  const t = useTranslations('aside')
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-Infinity)

  const handleToggle = () => {
    setOpen(!open)
    setSelectedIndex(-Infinity)
  }

  const onClose = () => {
    setOpen(false)
    setSelectedIndex(-Infinity)
  }

  const handleListItemClick = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(-Infinity)
      return
    }
    setOpen(true)
    setSelectedIndex(index)
  }

  return (
    <>
      {open && (<div data-state={open ? 'open' : 'close'} onClick={handleToggle} className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />)}
      <aside className={`fixed top-0 bg-palette-primary py-2 h-full z-50 ${open ? 'w-56 sm:w-64' : 'sm:w-12 w-0'} left-0 duration-300 select-none`}>
        <nav className='flex w-full h-full flex-col'>
          <header className='flex items-center absolute sm:static overflow-hidden'>
            <button onClick={handleToggle} className='text-4xl sm:text-5xl outline-none cursor-pointer mt-2'>
              <MenuIcon className={`${!open ? 'text-gray-500' : 'text-white'} duration-300 sm:text-background`} />
            </button>
          </header>
          <hr className='w-11/12 border-t-palette-secondary mx-auto my-2' />
          <ul className='flex flex-col gap-2 pt-12 flex-grow overflow-y-auto'>
            {newRoutes.map((route, index) => (
              <li key={route.text}>
                <ListItem key={route.text} {...route} onClose={onClose} text={t(route.text)} onToggle={() => handleListItemClick(index)} />
                <SubListItem subRoutes={route.subRoutes} open={selectedIndex === index} onClose={onClose} />
              </li>
            ))}
          </ul>
          <hr className='w-11/12 border-t-palette-secondary mx-auto my-2' />
          <ul className='flex flex-col gap-2'>
            <ListItem icon={MoonIcon} text={t('mode')} modal={false} />
            <ListItem icon={UserIcon} text={data?.user?.name} modal={false} path='/profile' onClose={onClose} />
            <ListItem icon={SignOutIcon} text={t('logOut')} modal={false} onClick={async () => await signOut()} />
          </ul>
        </nav>
      </aside>
    </>

  )
}
