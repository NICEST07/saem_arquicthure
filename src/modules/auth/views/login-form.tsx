'use client'
import { useForm } from 'react-hook-form'
import { Form } from '@src/core/ui/form'
import { InputController } from '@src/core/components/fieldfs-controllers/input'
import { WrapperIcon } from '../components/ui/wrapper-icon'
import { useTranslations } from 'next-intl'
import { Eye, EyeOff, LockKeyhole, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@src/core/ui/button'
import { Link, useRouter } from '@src/core/lib/navigation'
import { Separator } from '../components/ui/separator'
import { StepProps } from '../components/step-flow'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { LoginValues, loginSchema } from '../schemas/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginUser } from '../services/login'
import { hasMessageError } from '../utils/get-message-error'
import { toast } from 'sonner'

export function LoginForm ({ onNextStep, onPrevStep }: StepProps) {
  const t = useTranslations()
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: '',
      password: ''
    }
  })
  const [seePassword, setSeePassword] = useState(false)
  const { executeRecaptcha } = useGoogleReCaptcha()
  const router = useRouter()

  const onSubmit = async (formData: LoginValues) => {
    try {
      const tokenCaptcha = await executeRecaptcha?.('login')
      if (tokenCaptcha == null) throw new Error('Algo salio mal')
      const res = await loginUser(formData, tokenCaptcha)
      console.log(res)
      if (!res.success) throw new Error('error')
      onNextStep()
    } catch (error: any) {
      const message = await hasMessageError(error?.response?.data?.errorsForm, error?.code)
      toast.error(message)
    }
  }

  return (
    <Form {...form}>
      <form className='flex flex-col max-w-lg mx-auto w-full gap-4 px-1' onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <WrapperIcon
          startIcon={<User className='w-7 h-7 text-stone-600 dark:text-white/70' />}
        >
          <InputController
            name='user'
            control={form.control}
            autoComplete='username'
            placeholder={t('username')}
            className='border-none bg-transparent h-14 py-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 '
          />
        </WrapperIcon>
        <WrapperIcon
          startIcon={<LockKeyhole className='w-7 h-7 text-stone-600 dark:text-white/70' />}
          endIcon={
            <button
              type='button'
              onClick={() => setSeePassword(!seePassword)}
              className='hover:bg-palette-primary/20 rounded-full p-1.5 text-palette-icons text-xl text-stone-600 dark:text-white/70'
            >
              {seePassword
                ? (
                  <Eye className='w-7 h-7' />
                  )
                : (
                  <EyeOff className='w-7 h-7' />
                  )}
            </button>
          }
        >
          <InputController
            name='password'
            control={form.control}
            type={seePassword ? 'password' : 'text'}
            className='border-none bg-transparent h-14 py-0'
            placeholder={t('password')}
            autoComplete='password'
          />
        </WrapperIcon>
        <Link href='/forgot-password' type='button' className='text-palette-primary block px-2 text-base ml-auto hover:underline'>{t('forgotPass')}</Link>
        <Button
          disabled={form.formState.isSubmitting}
          size='lg'
          className='rounded-full uppercase'
          type='submit'
        >
          {t('submit')}
        </Button>
        <Separator />
        <Button
          disabled={form.formState.isSubmitting}
          variant='secondary'
          type='button'
          size='lg'
          onClick={() => router.push('/register')}
          className='uppercase rounded-full border bg-transparent text-palette-secondary'
        >
          {t('register')}
        </Button>
      </form>
    </Form>

  )
}
