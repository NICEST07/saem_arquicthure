import { AdminIcon, FlagIcon, HomeIcon, SupportIcon, ToolsIcon } from '@src/core/icons'

export interface RoutesType {
  id?: string
  text?: string | any
  path?: string
  icon?: ({ className }: { className: string }) => JSX.Element
  subRoutes?: RoutesType[]
  modal: boolean
  modalName?: '' | null | undefined
}

export const routes: RoutesType[] = [
  {
    path: '/dashboard',
    text: 'dashboard',
    icon: HomeIcon,
    modal: false,
    subRoutes: []
  },
  {
    id: 'services',
    text: 'services',
    icon: FlagIcon,
    modal: false,
    subRoutes: [
      {
        id: 'c2m',
        text: 'c2m',
        path: '/service/contact2me',
        modal: false
      },
      {
        id: 'sms',
        text: 'sms',
        path: '/service/sms',
        modal: false
      },
      {
        id: 'callblasting',
        text: 'blasting',
        path: '/service/call-blasting',
        modal: false
      },
      {
        id: 'email',
        text: 'mail',
        path: '/service/email',
        modal: false
      },
      {
        id: 'hlrlookup',
        text: 'hlr',
        path: '/service/hlr-lookup',
        modal: false
      },
      {
        id: 'bots',
        text: 'bot',
        path: '/service/bots',
        modal: false
      },
      {
        id: 'api',
        text: 'api',
        path: '/service/api',
        modal: false
      }
    ]
  },
  {
    id: 'resources',
    text: 'resources',
    icon: ToolsIcon,
    subRoutes: [],
    modal: true,
    modalName: ''
  },
  {
    id: 'reseller',
    text: 'admin',
    icon: AdminIcon,
    modal: false,
    subRoutes: [
      {
        text: 'users',
        path: '/admin/users',
        modal: false
      },
      {
        text: 'rates',
        path: '/admin/rates',
        modal: false
      },
      {
        text: 'config',
        path: '/admin/configuration',
        modal: false
      }
    ]
  },
  {
    text: 'support',
    modal: false,
    icon: SupportIcon,
    subRoutes: [
      {
        text: 'newTicket',
        modal: true,
        modalName: '' //! 'CAMBIAR'
      },
      {
        text: 'tickets',
        modal: true,
        modalName: '' //! 'CAMBIAR'
      }
    ]
  }
]
