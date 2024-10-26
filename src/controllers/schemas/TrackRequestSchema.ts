import { z } from 'zod'

export const TrackStatusSchema = z.enum(['ACTIVE', 'ARCHIVED', 'DRAFT'])

export const FindTracksRequestSchema = z.object({
  name: z.string().optional(),
  status: TrackStatusSchema.optional(),
  sortBy: z.enum(['name', 'status', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().positive().optional(),
  perPage: z.number().int().positive().optional(),
})

export const CreateTrackRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const GetTrackByIdRequestSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export const GetTrackBySlugRequestSchema = z.object({
  slug: z.string(),
})

export const UpdateTrackRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  status: TrackStatusSchema.optional(),
})
