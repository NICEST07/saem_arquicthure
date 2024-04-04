import { Label } from '@src/core/ui/label'
import React from 'react'

interface IconWrapperProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export function WrapperIcon ({ children, startIcon = null, endIcon = null, className }: IconWrapperProps) {
  return (
    <Label className={`w-full flex items-center justify-between bg-palette-background px-3 overflow-hidden h-14 rounded-full ${className}`}>
      {startIcon}
      {children}
      {endIcon}
    </Label>
  )
}
