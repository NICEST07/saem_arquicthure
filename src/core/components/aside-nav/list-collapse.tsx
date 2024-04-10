'use client'
import { ListItem } from './list-item'
import { useTranslations } from 'next-intl'
import { Accordion, AccordionContent, AccordionItem } from '@src/core/ui/accordion'
import { useEffect, useState } from 'react'
import { RoutesType } from '../../routes/routes'

export function SubListItem ({ subRoutes, open, onClose }: { subRoutes: RoutesType['subRoutes'], open: boolean, onClose?: () => void }) {
  const t = useTranslations('aside')
  const [item, setItem] = useState('')

  useEffect(() => {
    if (!open) {
      setItem('')
      return
    }
    setItem('open')
  }, [open])

  if (subRoutes?.length === 0) return null

  return (
    <Accordion type='single' collapsible value={item} className='w-full'>
      <AccordionItem value='open' className='border-none'>
        <AccordionContent>
          <ul className='w-[92%] ml-auto flex flex-col  transition-[height] duration-300 overflow-hidden border-l-2 border-palette-secondary whitespace-nowrap'>
            {subRoutes?.map(subRoute => (
              <ListItem key={subRoute.text} {...subRoute} text={t(subRoute.text)} onClose={onClose} />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
