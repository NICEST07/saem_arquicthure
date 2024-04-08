'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@src/core/ui/tooltip'

interface ActionTooltipProps {
  label: string | JSX.Element
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

export const ActionTooltip = ({
  label,
  children,
  side,
  align
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className='font-semibold text-sm capitalize'>
            {typeof label === 'string' ? label?.toLowerCase() : label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
