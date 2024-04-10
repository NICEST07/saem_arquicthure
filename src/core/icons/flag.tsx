
export function FlagIcon ({ className }: { className: string }) {
  return (
    <svg className={className} width='1em' height='1em' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z' />
      <path d='M5 21v-7' />
    </svg>
  )
}
