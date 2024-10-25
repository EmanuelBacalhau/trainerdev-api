import 'dotenv/config'
import { z } from 'zod'

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3333),
})

const { success, error, data } = EnvSchema.safeParse(process.env)

if (!success) {
  console.error(
    '❌ Invalid environment variables:',
    error.flatten().fieldErrors
  )
  throw new Error('Invalid environment variables')
}

export const env = data
