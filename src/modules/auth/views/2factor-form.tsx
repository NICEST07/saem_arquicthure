'use client'
import { Form } from '@src/core/ui/form'
import { useTranslations } from 'next-intl'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../context/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { TwoFactorValues, twoFactorSchema } from '../schemas/2factor'
import { ActionTooltip } from '@src/core/components/action-tooltip'
import { ToggleGroup, ToggleGroupItem } from '@src/core/ui/toggle-group'
import { useRef } from 'react'

export function TwoFactorForm () {
  const t = useTranslations('auth.twofactor')
  const { token, userMail, methodAuths } = useAuthContext()
  const form = useForm({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      method: methodAuths?.[0] ?? '',
      code: ''
    }
  })
  const { executeRecaptcha } = useGoogleReCaptcha()

  const onSubmit = async (data: TwoFactorValues) => {
    // const tokenCaptcha = await executeRecaptcha?.('TWOFACTOR')
    console.log(data)

    // const res = await validateCode({ ...data, tokenCaptcha }, props.state?.token)
    // if (res === false) return
    // props.saveData({ token: res.token, failConfig: res.failConfig })
    // redirect({ ...res.failConfig }, res.token)
  }

  return (
    <Form {...form}>
      <form action='' onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <h1>HOLA {token}</h1>
      </form>
    </Form>
  )
}

export enum METHODSAUTH {
  GOOGLE = 'GOOGLE',
  MAIL = 'MAIL'
}

export function MethodsAuth ({ onChangeValue, value, methoAuths, token }: { onChangeValue: (method: string) => void, value: METHODSAUTH, methoAuths: [string, string], token: string }) {
  const t = useTranslations('loginPage.twofactor')
  const sendMail = useRef(false)

  const hanldeSelected = async (value: string) => {
    if (value === '') return
    onChangeValue(value)
    if (value === METHODSAUTH.MAIL && !sendMail.current) {
      // await resendEmailCode(token)
    }
    sendMail.current = true
  }
  return (
    <ToggleGroup defaultValue={methoAuths[0]} value={value} type='single' className='flex gap-4 justify-center align-center mb-8' onValueChange={hanldeSelected}>
      {methoAuths.map((auth: string) => (
        <ActionTooltip label={t(`tooltip.${auth.toLocaleLowerCase()}`)} key={auth}>
          <ToggleGroupItem className={`${value === auth && 'bg-palette-primary/20'} rounded-lg grid place-content-center w-16 h-16 text-5xl text-palette-primary hover:text-palette-primary hover:bg-palette-primary/30`} value={auth}>
            {auth === METHODSAUTH.GOOGLE ? <AuthGoogleIcon className='text-palette-primary' /> : <AuthEmail className='text-palette-primary' />}
          </ToggleGroupItem>
        </ActionTooltip>
      ))}
    </ToggleGroup>
  )
}

export const AuthGoogleIcon = ({ className }: { className: string }) => {
  return (
    <svg width='1em' height='1em' className={className} fill='currentColor' viewBox='0 0 24 24'>
      <path d='M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z' />
    </svg>
  )
}

export function AuthEmail ({ className }: { className: string }) {
  return (
    <svg width='1em' height='1em' viewBox='0 0 65 65' className={className} fill='currentColor'>
      <path d='M22.1341 32.4996L5.85156 43.1011V21.8981L22.1341 32.4996ZM42.8691 32.4996L59.1516 43.1011V21.8981L42.8691 32.4996ZM40.4901 34.0531L33.2101 38.7916C32.9956 38.9281 32.7486 38.9996 32.5016 38.9996C32.2546 38.9996 32.0076 38.9281 31.7931 38.7916L24.5131 34.0531L6.93056 45.4996L5.91006 46.1626C6.22856 47.9956 7.82756 49.3996 9.75156 49.3996H55.2516C57.1756 49.3996 58.7746 48.0021 59.0931 46.1626L58.0661 45.4996L40.4901 34.0531ZM32.5016 36.1461L58.0661 19.4996L59.0931 18.8366C58.7746 16.9971 57.1756 15.5996 55.2516 15.5996H9.75156C7.82756 15.5996 6.22856 17.0036 5.91006 18.8366L6.93056 19.4996L32.5016 36.1461Z' />
    </svg>
  )
}
