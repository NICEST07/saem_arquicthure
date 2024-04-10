import { GlobalInterceptor } from '../interceptors/global-interceptor'
import { ServiceType } from '../models/services'

export interface ServicesStructure {
  [key: string]: string[]
}

interface PermitionResponse {
  success: boolean
  service: ServicesStructure
}

const adapterPermitions = (permitions: ServicesStructure) => {
  const newPermitions: ServicesStructure = {}
  for (const key in permitions) {
    newPermitions[key.toLowerCase()] = permitions[key]
  }
  return newPermitions
}

export const getPermitsService = async (service: ServiceType & 'Service') => {
  try {
    const { data } = await GlobalInterceptor.get<PermitionResponse>(`/user-info/permission-service/${service}`)
    return adapterPermitions(data.service)
  } catch (error) {
    console.error(error)
    throw error
  }
}
