import { FormControl, FormField, FormItem, FormLabel } from '@src/core/ui/form'
import { Input } from '@src/core/ui/input'
import { Control } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>
  label?: string
}

export function InputController ({ className, name = '', control, label, ...props }: InputProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem className='w-full space-y-0'>
          {label != null && <FormLabel className='m-0 font-semibold'>{label}</FormLabel>}
          <FormControl>
            <Input
              className={`border-palette-primary m-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 ${className} ${invalid ? 'border border-red-600' : ''}`}
              {...field}
              {...props}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
