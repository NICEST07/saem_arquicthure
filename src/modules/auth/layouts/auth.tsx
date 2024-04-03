import { LogoReseller } from '@src/core/components/reseller-logo'
import { ReCaptchaProvider } from '@src/core/providers/google-re-captcha'
import { Toaster } from 'sonner'

export function AuthLayout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='fixed w-screen bg-palette-background h-screen grid items-center justify-items-center'>
        <div className='w-full max-w-6xl min-h-[75%] bg-palette-container shadow-2xl rounded-2xl overflow-hidden overflow-y-auto sm:grid sm:grid-cols-2 flex flex-col justify-center items-center'>
          <div className='max-w-[280px] sm:max-w-sm justify-self-center p-6 grid place-content-center'>
            <LogoReseller />
          </div>
          <ReCaptchaProvider>
            {children}
          </ReCaptchaProvider>
        </div>
      </div>
      <Toaster richColors position='top-center' duration={10000} />
    </>
  )
}
