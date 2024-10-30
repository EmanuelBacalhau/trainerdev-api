import { PrismaUserRepository } from '@/repositories/prisma/PrismaUser.repository'
import { DeleteUserService } from '../delete-user.service'

export function makeDeleteUserService() {
  const userRepository = new PrismaUserRepository()
  const deleteUserService = new DeleteUserService(userRepository)
  return deleteUserService
}
