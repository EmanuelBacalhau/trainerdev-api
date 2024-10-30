import { makeFindAllUserService } from '@/services/user/factories/make-find-all-user-service'
import { FindAllUserController } from '../find-all-user.controller'

export function makeFindAllUserController() {
  const findAllUserService = makeFindAllUserService()
  const findAllUserController = new FindAllUserController(findAllUserService)
  return findAllUserController
}
