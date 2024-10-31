import { matriculationController } from '@/container'
import { isAuthenticatedMiddleware } from '@/middlewares/is-authenticated.middleware'
import { verifyUserRole } from '@/middlewares/verify-user-role.middleware'
import { Router } from 'express'

export const matriculationRouter = Router()

matriculationRouter.get(
  '/matriculations',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  matriculationController.index
)
matriculationRouter.post(
  '/matriculations',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  matriculationController.create
)
matriculationRouter.put(
  '/matriculations/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  matriculationController.update
)
matriculationRouter.delete(
  '/matriculations/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  matriculationController.delete
)
