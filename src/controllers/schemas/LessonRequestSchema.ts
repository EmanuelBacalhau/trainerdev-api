import { z } from 'zod'

export const FindLessonRequestSchema = z.object({
  name: z.string().optional(),
  moduleId: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
  perPage: z.coerce.number().int().positive().optional(),
  sortBy: z.enum(['name', 'createdAt', 'order']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
})

export const CreateLessonAttributesSchema = z.object({
  name: z.string(),
  description: z.string(),
  order: z.coerce.number(),
  moduleId: z.coerce.number(),
})

export const UpdateLessonAttributesSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  order: z.coerce.number().optional(),
  moduleId: z.coerce.number().optional(),
})

export const GetLessonByIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})
