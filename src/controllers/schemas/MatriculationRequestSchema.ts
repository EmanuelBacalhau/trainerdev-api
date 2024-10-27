import { z } from 'zod'

export const GetMatriculationRequestSchema = z.object({
  userId: z.number().optional(),
  trackId: z.number().optional(),
  serialCode: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().int().positive().optional(),
  perPage: z.coerce.number().int().positive().optional(),
})

export const GetMatriculationByIdRequestSchema = z.object({
  id: z.coerce.number(),
})

export const CreateMatriculationRequestSchema = z.object({
  userId: z.number(),
  trackId: z.number(),
})

export const UpdateMatriculationRequestSchema = z.object({
  userId: z.number(),
  trackId: z.number(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
})
