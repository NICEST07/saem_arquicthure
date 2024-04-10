'use client'
import { Link } from '@src/core/lib/navigation'
import { RowDown } from '@src/core/icons'
import { RoutesType } from '../../routes/routes'
// import { useModalStore } from '@src/store/use-modal-store'

interface SidebarItemCollageProps extends RoutesType {
  onToggle?: () => void
  onClose?: () => void
  onClick?: () => void
}

export function ListItem ({ path, icon, text, subRoutes, modal, modalName, onToggle, onClick, onClose }: SidebarItemCollageProps) {
//   const onOpenModal = useModalStore(state => state.onOpenModal)

  const handleClick = () => {
    if ((subRoutes?.length ?? 0) > 0) {
      onToggle?.()
      return
    }
    onClose?.()

    if (modal && modalName != null) {
    //   onOpenModal(modalName, {}) //!depende
      return
    }

    onClick?.()
  }

  return (
    <>
      <WrapperLink href={path} onClick={handleClick}>
        <span className='text-2xl sm:text-4xl block text-white'>
          {icon?.({ className: 'text-background' })}
        </span>
        <span className='text-xl text-white font-medium flex-1 whitespace-nowrap truncate'>
          {text}
        </span>
        {(subRoutes?.length ?? 0) > 0 && <RowDown className='text-xl mr-2 text-palette-secondary' />}
      </WrapperLink>
    </>
  )
}

function WrapperLink ({ children, href, onClick }: any) {
  if (href == null) {
    return (
      <div onClick={onClick} className='flex w-full items-center gap-x-4 relative cursor-pointer p-1 overflow-hidden'>
        <div className='absolute inset-0 bg-black opacity-0 hover:opacity-10' />
        {children}
      </div>
    )
  }

  return (
    <Link href={href} onClick={onClick} className='flex relative w-full items-center gap-x-4 cursor-pointer p-1 overflow-hidden'>
      <div className='absolute inset-0 bg-black opacity-0 hover:opacity-10' />
      {children}
    </Link>
  )
}
