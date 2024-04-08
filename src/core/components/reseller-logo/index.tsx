//! This a component use only in SSR, so it's not necessary to use the client hook
import axios from 'axios'
import { headers } from 'next/headers'

// import { headers } from 'next/headers'
// import { getLogoImage } from '../../services/get-logo-image'

async function getLogoImage (domain: string | null) {
  try {
    if (process.env.NEXT_PUBLIC_MODE === 'develoment') return await new Promise<string>((resolve) => resolve('/logos/saem.png'))
    const { data } = await axios.get<string>(`${process.env.NEXT_PUBLIC_BACKEND_RESOURCES}/reseller/image`, {
      timeout: 1000,
      headers: {
        origin: domain
      }
    })
    return data
  } catch (error) {
    return '/logos/saem.png'
  }
}

export async function LogoReseller () {
  const headersList = headers()
  const domain = headersList.get('host') // se requiere el dominio en un SSR ya que no lo agrega por defecto como si lo hace el front
  const url = await getLogoImage(domain)

  return (
    <img
      src={url}
      draggable={false}
      className='w-full h-full aspect-[5/2]'
      alt='Logo'
    />
  )
}
