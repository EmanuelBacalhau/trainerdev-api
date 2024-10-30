import { PrismaUserRepository } from '@/repositories/prisma/PrismaUser.repository'
import { UpdateUserServices } from '../update-user.service'

export function makeUpdateUserService() {
  const userRepository = new PrismaUserRepository()
  const updateUserService = new UpdateUserServices(userRepository)
  return updateUserService
}
