import { lessonController } from '@/container'
import { multerUpload } from '@/libs/multerUpload'
import { isAuthenticatedMiddleware } from '@/middlewares/is-authenticated.middleware'
import { verifyUserRole } from '@/middlewares/verify-user-role.middleware'
import { Router } from 'express'

export const lessonRouter = Router()

const lessonMulterConfig = multerUpload('lessons', ['video/mp4'])

lessonRouter.get(
  '/lessons',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  lessonController.index
)
lessonRouter.get(
  '/lessons/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  lessonController.findById
)
lessonRouter.get(
  '/lessons/slug/:slug',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  lessonController.findBySlug
)
lessonRouter.post(
  '/lessons',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINER']),
  lessonMulterConfig.single('video'),
  lessonController.create
)
lessonRouter.put(
  '/lessons/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINER']),
  lessonMulterConfig.single('video'),
  lessonController.update
)
lessonRouter.delete(
  '/lessons/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINER']),
  lessonController.delete
)
