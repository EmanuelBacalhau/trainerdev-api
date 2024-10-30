import { makeFindUserByIdService } from '@/services/user/factories/make-find-user-by-id-service'
import { FindUserByIdController } from '../find-user-by-id.controller'

export function makeFindUserByIdController() {
  const findUserByIdService = makeFindUserByIdService()
  const findUserByIdController = new FindUserByIdController(findUserByIdService)
  return findUserByIdController
}
