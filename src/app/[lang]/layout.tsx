import { NextIntlClientProvider, useMessages } from 'next-intl'
import type { Metadata } from 'next'
import { roboto } from '@src/assets/fonts'
import '@src/assets/globals.css'

export const metadata: Metadata = {
  title: 'Saem',
  description: 'SMS, Envíe mensajes de texto,mensajes de audio IVR o Mail masivos a sus campañas de cobro, publicitarias,de recordatorios, alertas y promociones desde nuestra plataforma web.',
  authors: [{ name: 'Saem', url: 'https://saemcolombia.com.co' }],
  keywords: 'SMS, mensajes, masivos,masivo,comprar,paquetes,colombia,ivr,mali,voip',
  generator: 'Equipo saem colombia'
  // openGraph: {
  //   images: ['https://saemcolombia.com.co/images/logo.png'], //! CAMBIAR
  //   type: 'website',
  //   url: 'https://saemcolombia.com.co',
  //   title: 'Saem',
  //   description: 'SMS, Envíe mensajes de texto,mensajes de audio IVR o Mail masivos a sus campañas de cobro, publicitarias,de recordatorios, alertas y promociones desde nuestra plataforma web.'
  // }
}

export default function LangLayout ({ children, params, ...props }: { children: React.ReactNode, params: { lang: string } }) {
  const messages = useMessages()

  return (
    <html lang={params.lang}>
      <body className={`${roboto.className} bg-palette-background h-screen`}>
        <NextIntlClientProvider locale={params.lang} messages={messages}>
          {/* <NextAuthProvider> */}
          {children}
          {/* </NextAuthProvider> */}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
