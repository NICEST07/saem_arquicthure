'use client'
import { NotificationIcon } from '@src/core/icons/notification'
import { Popover, PopoverContent, PopoverTrigger } from '@src/core/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@src/core/ui/tabs'

export function Notification () {
  return (
    <Popover>
      <PopoverTrigger>
        <button className='text-2xl p-1 rounded-md text-slate-900 flex items-center gap-2 outline-none'>
          <span className='relative inline-flex rounded-full'>
            {true && <span className='bg-palette-primary text-white rounded-full w-2.5 h-2.5 flex items-center justify-center absolute animate-bounce duration-1000 top-1.5 right-3.5 -mt-2 -mr-2' />}
            <div className='h-fit w-fit text-4xl text-palette-secondary'>
              <NotificationIcon className='text-current' />
            </div>
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className='p-0 pb-2 w-[95%] ml-4 sm:ml-0 sm:w-96 h-80 sm:h-96 rounded-md flex flex-col overflow-hidden'>
        <Tabs defaultValue='notification' className='w-full h-[calc(100%-25px)]'>
          <TabsList className='w-full p-0 space-y-0 m-0 outline-none bg-palette-primary/10'>
            <TabsTrigger value='notification' className='w-full outline-none data-[state=active]:bg-palette-primary data-[state=active]:text-white'>Notificaciones</TabsTrigger>
            <TabsTrigger value='news' className='w-full outline-none data-[state=active]:bg-palette-primary data-[state=active]:text-white'>Noticias</TabsTrigger>
          </TabsList>
          <TabsContent value='notification' className='m-0 h-[calc(100%-40px)] overflow-y-auto'>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </TabsContent>
          <TabsContent value='news' className='m-0 h-[calc(100%-40px)] overflow-y-auto'>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </TabsContent>
        </Tabs>
        <footer className='p-1 flex justify-end'>
          <button className='w-32 h-6 bg-palette-primary/10 text-palette-primary hover:bg-palette-primary/20 transition-colors duration-150'>Borrar</button>
        </footer>
      </PopoverContent>
    </Popover>
  )
}

function NotificationItem () {
  return (
    <article className='p-1.5 border-b border-input min-h-16 '>
      <header className='flex justify-between items-center'>
        <h3 className='text-xl font-bold'>Titulo de notificacion</h3>
        <p className='text-sm text-muted-foreground'>Hace 3 horas</p>
      </header>
      <p className='ml-2 truncate'>Descripcion de la notificacion</p>
    </article>
  )
}
