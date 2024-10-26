import { z } from 'zod'

export const FindModulesParamsSchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  perPage: z.coerce.number().int().positive().optional(),
  sortBy: z.enum(['name', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
})

export const CreateModuleAttributesSchema = z.object({
  name: z.string(),
  description: z.string(),
  order: z.coerce.number(),
})

export const UpdateModuleAttributesSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  order: z.coerce.number().optional(),
})

export const GetModuleByIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export const GetModuleBySlugParamsSchema = z.object({
  slug: z.string(),
})
