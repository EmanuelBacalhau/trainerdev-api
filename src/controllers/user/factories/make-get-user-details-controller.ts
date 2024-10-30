import { makeFindUserByIdService } from '@/services/user/factories/make-find-user-by-id-service'
import { FindUserByIdController } from '../find-user-by-id.controller'
import { GetUserDetailsController } from '../get-user-details.controller'

export function makeGetUserDetailsController() {
  const findUserByIdService = makeFindUserByIdService()
  const findUSerByIdController = new GetUserDetailsController(
    findUserByIdService
  )
  return findUSerByIdController
}
