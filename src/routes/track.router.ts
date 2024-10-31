import { makeCreateTrackController } from '@/controllers/track/factories/make-create-track-controller'
import { makeDeleteTrackController } from '@/controllers/track/factories/make-delete-track-controller'
import { makeFindAllTrackController } from '@/controllers/track/factories/make-find-all-track-controller'
import { makeFindTrackByIdController } from '@/controllers/track/factories/make-find-track-by-id-controller'
import { makeFindTrackBySlugController } from '@/controllers/track/factories/make-find-track-by-slug-controller'
import { makeRemoveModuleFromTrackController } from '@/controllers/track/factories/make-remove-module-from-track-controller'
import { makeUpdateTrackController } from '@/controllers/track/factories/make-update-track-controller'
import { multerUpload } from '@/libs/multerUpload'
import { isAuthenticatedMiddleware } from '@/middlewares/is-authenticated.middleware'
import { verifyUserRole } from '@/middlewares/verify-user-role.middleware'
import { Router } from 'express'

export const trackRouter = Router()

const trackMulterConfig = multerUpload('tracks', ['image/jpeg', 'image/png'])

export const createTrackController = makeCreateTrackController()
export const updateTrackController = makeUpdateTrackController()
export const findAllTrackController = makeFindAllTrackController()
export const findTrackByIdController = makeFindTrackByIdController()
export const findTrackBySlugController = makeFindTrackBySlugController()
export const removeModuleFromTrackController =
  makeRemoveModuleFromTrackController()
export const deleteTrackController = makeDeleteTrackController()

trackRouter.get(
  '/tracks',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findAllTrackController.execute.bind(findAllTrackController)
)
trackRouter.get(
  '/tracks/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findTrackByIdController.execute.bind(findTrackByIdController)
)
trackRouter.get(
  '/tracks/slug/:slug',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findTrackBySlugController.execute.bind(findTrackBySlugController)
)
trackRouter.post(
  '/tracks',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  trackMulterConfig.single('cover'),
  createTrackController.execute.bind(createTrackController)
)
trackRouter.put(
  '/tracks/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  trackMulterConfig.single('cover'),
  updateTrackController.execute.bind(updateTrackController)
)
trackRouter.delete(
  '/tracks/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  deleteTrackController.execute.bind(deleteTrackController)
)
trackRouter.delete(
  '/tracks/:id/modules/:moduleId',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  removeModuleFromTrackController.execute.bind(removeModuleFromTrackController)
)
