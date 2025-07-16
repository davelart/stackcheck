import { z } from 'zod'

export const StackCheckSchema = z.object({
  node: z.string().optional(),
  docker: z.boolean().optional(),
  env: z.array(z.string()).optional(),
  ports: z.array(z.number()).optional(),
  custom: z.array(z.string()).optional(),
  security: z.boolean().optional()
})

export type StackCheckConfig = z.infer<typeof StackCheckSchema>