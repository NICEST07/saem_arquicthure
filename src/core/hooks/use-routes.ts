import { useMemo } from 'react'
import { RoutesType, routes } from '../routes/routes'
import useSWR from 'swr'
import { ServicesStructure, getPermitsService } from '../services/get-permits-service'

export function useRoutes ({ isReseller = true }: { isReseller: boolean }) {
  const { data: permitions } = useSWR<ServicesStructure>('services', async () => await getPermitsService('Service'))

  const newRoutes = useMemo(() => {
    let filterRoutes: RoutesType[] = routes
    if (!isReseller) {
      filterRoutes = filterRoutes.filter(route => route.id !== 'reseller')
    }
    const services = filterRoutes.find(route => route.id === 'services')

    const filterServices = services?.subRoutes?.filter((subRoute) => {
      if (subRoute.id != null) {
        return (permitions?.[subRoute.id]?.length ?? 0) > 0
      }
      return false
    })
    filterRoutes = filterRoutes.map(permition => {
      return permition.id === 'services' ? { ...permition, subRoutes: filterServices } : permition
    })

    return filterRoutes
  }, [permitions, isReseller])

  return newRoutes
}
