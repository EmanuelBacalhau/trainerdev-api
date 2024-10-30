import { makeDeleteUserService } from '@/services/user/factories/make-delete-user-service'
import { DeleteUserController } from '../delete-user.controller'

export function makeDeleteUserController() {
  const deleteUserService = makeDeleteUserService()
  const deleteUserController = new DeleteUserController(deleteUserService)
  return deleteUserController
}
