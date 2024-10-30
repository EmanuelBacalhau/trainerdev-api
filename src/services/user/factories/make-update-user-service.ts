import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { UpdateUserServices } from '../update-user.service'

export function makeUpdateUserService() {
  const userRepository = new PrismaUserRepository()
  const updateUserService = new UpdateUserServices(userRepository)
  return updateUserService
}
