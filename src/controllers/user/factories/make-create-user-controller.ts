import { makeCreateUserService } from '@/services/user/factories/make-create-user-service'
import { CreateUserController } from '../create-user.controller'

export function makeCreateUserController() {
  const createUserService = makeCreateUserService()
  const createUserController = new CreateUserController(createUserService)
  return createUserController
}
