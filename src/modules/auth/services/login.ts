import { toast } from 'sonner'
import { GlobalInterceptor } from '@src/core/interceptors/global-interceptor'
import { ServicesResponse } from '../models/api-common-response'
import { getIPUser } from './get-ip'
import { LoginValues } from '../schemas/login'

export interface LoginServiceResponse extends ServicesResponse {
  securityMail: string
  token: string
  typesAuth: [string, string]
  message: string
}

export interface LoginServiceProps extends LoginValues {
  ip: string
  tokenCaptcha: string
}

export const adaptLoginService = (data: LoginServiceResponse) => ({
  success: data.success,
  token: data.token,
  userMail: data.securityMail,
  methoAuths: data.typesAuth
})

export async function loginUser (dataForm: LoginValues, tokenCaptcha: string) {
  try {
    const ip = await getIPUser()
    const { data } = await GlobalInterceptor.post<LoginServiceResponse>('/login/user-validation', {
      ...dataForm,
      tokenCaptcha,
      ip
    })
    if (data?.message != null) toast.warning(data?.message ?? '')
    return adaptLoginService(data)
  } catch (error) {
    console.error('Se produjo un error:', error)
    throw error
    return {
      success: true,
      securityMail: 'este******@gm**.com',
      typesAuth: ['google', 'mail'],
      token: 'TYOKEN'
    }
    // return false
  }
}
