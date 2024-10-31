import { makeCreateModuleController } from '@/controllers/module/factories/make-create-module-controller'
import { makeDeleteModuleController } from '@/controllers/module/factories/make-delete-module-controller'
import { makeFindAllModuleController } from '@/controllers/module/factories/make-find-all-module-controller'
import { makeFindModuleByIdController } from '@/controllers/module/factories/make-find-module-by-id-controller'
import { makeFindModuleBySlugController } from '@/controllers/module/factories/make-find-module-by-slug-controller'
import { makeUpdateModuleController } from '@/controllers/module/factories/make-update-module-controller'
import { multerUpload } from '@/libs/multerUpload'
import { isAuthenticatedMiddleware } from '@/middlewares/is-authenticated.middleware'
import { verifyUserRole } from '@/middlewares/verify-user-role.middleware'
import { Router } from 'express'

export const moduleRouter = Router()

const moduleMulterConfig = multerUpload('modules', ['image/jpeg', 'image/png'])

export const createModuleController = makeCreateModuleController()
export const updateModuleController = makeUpdateModuleController()
export const deleteModuleController = makeDeleteModuleController()
export const findAllModuleController = makeFindAllModuleController()
export const findModuleByIdController = makeFindModuleByIdController()
export const findModuleBySlugController = makeFindModuleBySlugController()

moduleRouter.get(
  '/modules',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  findAllModuleController.execute.bind(findAllModuleController)
)
moduleRouter.get(
  '/modules/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findModuleByIdController.execute.bind(findModuleByIdController)
)
moduleRouter.get(
  '/modules/slug/:slug',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN', 'TRAINEE', 'TRAINER']),
  findModuleBySlugController.execute.bind(findModuleBySlugController)
)
moduleRouter.post(
  '/modules',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  moduleMulterConfig.single('cover'),
  createModuleController.execute.bind(createModuleController)
)
moduleRouter.put(
  '/modules/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  moduleMulterConfig.single('cover'),
  updateModuleController.execute.bind(updateModuleController)
)
moduleRouter.delete(
  '/modules/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  deleteModuleController.execute.bind(deleteModuleController)
)
