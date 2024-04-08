import { z } from 'zod'

export const twoFactorSchema = z.object({
  code: z.string().min(6).max(7),
  method: z.enum(['MAIL', 'GOOGLE'])
})

export type TwoFactorValues = z.infer<typeof twoFactorSchema>
