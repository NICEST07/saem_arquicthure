'use client'
import { Form } from '@src/core/ui/form'
import { useTranslations } from 'next-intl'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'

export function TwoFactorForm () {
  const t = useTranslations()
  const form = useForm()
  const { executeRecaptcha } = useGoogleReCaptcha()

  return (
    <Form {...form}>
      <form action=''>
        <h1>HOLA</h1>
      </form>
    </Form>
  )
}
