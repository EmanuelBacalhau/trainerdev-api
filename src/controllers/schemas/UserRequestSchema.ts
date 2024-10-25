import { z } from 'zod'

export const RoleSchema = z.enum(['TRAINEE', 'TRAINER', 'ADMIN'])

export const FindUsersRequestSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  perPage: z.coerce.number().int().positive().optional(),
  name: z.string().optional(),
  role: RoleSchema.optional(),
  sortBy: z.enum(['name', 'role', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
})

export const CreateUserRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: RoleSchema.optional(),
  password: z.string().min(8),
})

export const GetIdRequestSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export const UpdateUserRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: RoleSchema.optional(),
  password: z.string().min(8).optional(),
})
