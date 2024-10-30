import { makeUpdateUserService } from '@/services/user/factories/make-update-user-service'
import { UpdateUserController } from '../update-user.controller'

export function makeUpdateUserController() {
  const updateUserService = makeUpdateUserService()
  const updateUserController = new UpdateUserController(updateUserService)
  return updateUserController
}
