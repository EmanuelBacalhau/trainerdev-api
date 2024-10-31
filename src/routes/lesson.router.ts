import { makeCreateLessonController } from '@/controllers/lesson/factories/make-create-lesson-controller'
import { makeDeleteLessonController } from '@/controllers/lesson/factories/make-delete-lesson-controller'
import { makeFindAllLessonController } from '@/controllers/lesson/factories/make-find-all-lesson-controller'
import { makeFindLessonByIdController } from '@/controllers/lesson/factories/make-find-lesson-by-id-controller'
import { makeFindLessonBySlugController } from '@/controllers/lesson/factories/make-find-lesson-by-slug-controller'
import { makeUpdateLessonController } from '@/controllers/lesson/factories/make-update-lesson-controller'
import { multerUpload } from '@/libs/multerUpload'
import { isAuthenticatedMiddleware } from '@/middlewares/is-authenticated.middleware'
import { verifyUserRole } from '@/middlewares/verify-user-role.middleware'
import { Router } from 'express'

export const lessonRouter = Router()

const lessonMulterConfig = multerUpload('lessons', ['video/mp4'])

const findAllLessonController = makeFindAllLessonController()
const createLessonController = makeCreateLessonController()
const updateLessonController = makeUpdateLessonController()
const findLessonByIdController = makeFindLessonByIdController()
const findLessonBySlugController = makeFindLessonBySlugController()
const deleteLessonController = makeDeleteLessonController()

lessonRouter.get(
  '/lessons',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  findAllLessonController.execute.bind(findAllLessonController)
)
lessonRouter.get(
  '/lessons/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findLessonByIdController.execute.bind(findLessonByIdController)
)
lessonRouter.get(
  '/lessons/slug/:slug',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findLessonBySlugController.execute.bind(findLessonBySlugController)
)
lessonRouter.post(
  '/lessons',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINER']),
  lessonMulterConfig.single('video'),
  createLessonController.execute.bind(createLessonController)
)
lessonRouter.put(
  '/lessons/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINER']),
  lessonMulterConfig.single('video'),
  updateLessonController.execute.bind(updateLessonController)
)
lessonRouter.delete(
  '/lessons/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINER']),
  deleteLessonController.execute.bind(deleteLessonController)
)
