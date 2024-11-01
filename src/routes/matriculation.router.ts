import { makeCreateMatriculationController } from '@/controllers/matriculation/factories/make-create-matriculation-controller'
import { makeDeleteMatriculationController } from '@/controllers/matriculation/factories/make-delete-matriculation-controller'
import { makeFindAllMatriculationController } from '@/controllers/matriculation/factories/make-find-all-matriculation-controller'
import { makeUpdateMatriculationController } from '@/controllers/matriculation/factories/make-update-matriculation-controller'
import { isAuthenticatedMiddleware } from '@/middlewares/is-authenticated.middleware'
import { verifyUserRole } from '@/middlewares/verify-user-role.middleware'
import { Router } from 'express'

export const matriculationRouter = Router()

const findAllMatriculationController = makeFindAllMatriculationController()
const createMatriculationController = makeCreateMatriculationController()
const updateMatriculationController = makeUpdateMatriculationController()
const deleteMatriculationController = makeDeleteMatriculationController()

matriculationRouter.get(
  '/matriculations',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  findAllMatriculationController.execute.bind(findAllMatriculationController)
)
matriculationRouter.post(
  '/matriculations',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  createMatriculationController.execute.bind(createMatriculationController)
)
matriculationRouter.put(
  '/matriculations/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  updateMatriculationController.execute.bind(updateMatriculationController)
)
matriculationRouter.delete(
  '/matriculations/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  deleteMatriculationController.execute.bind(deleteMatriculationController)
)
