import { makeCreateUserController } from '@/controllers/user/factories/make-create-user-controller'
import { makeDeleteUserController } from '@/controllers/user/factories/make-delete-user-controller'
import { makeFindAllUserController } from '@/controllers/user/factories/make-find-all-user-controller'
import { makeFindUserByIdController } from '@/controllers/user/factories/make-find-user-by-id-controller'
import { makeGetUserDetailsController } from '@/controllers/user/factories/make-get-user-details-controller'
import { makeUpdateUserController } from '@/controllers/user/factories/make-update-user-controller'
import { multerUpload } from '@/libs/multerUpload'
import { isAuthenticatedMiddleware } from '@/middlewares/is-authenticated.middleware'
import { verifyUserRole } from '@/middlewares/verify-user-role.middleware'
import { Router } from 'express'

export const userRouter = Router()

const userMulterConfig = multerUpload('users', ['image/jpeg', 'image/png'])

export const createUserController = makeCreateUserController()
export const updateUserController = makeUpdateUserController()
export const findAllUserController = makeFindAllUserController()
export const findUserByIdController = makeFindUserByIdController()
export const getUserByIdController = makeGetUserDetailsController()
export const deleteUserController = makeDeleteUserController()

userRouter.get(
  '/users',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  findAllUserController.execute.bind(findAllUserController)
)
userRouter.get(
  '/users/me',
  isAuthenticatedMiddleware,
  getUserByIdController.execute.bind(getUserByIdController)
)
userRouter.get(
  '/users/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  findUserByIdController.execute.bind(findUserByIdController)
)
userRouter.post(
  '/users',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  createUserController.execute.bind(createUserController)
)
userRouter.put(
  '/users/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  userMulterConfig.single('avatar'),
  updateUserController.execute.bind(updateUserController)
)
userRouter.delete(
  '/users/:id',
  isAuthenticatedMiddleware,
  verifyUserRole(['ADMIN']),
  deleteUserController.execute.bind(deleteUserController)
)
