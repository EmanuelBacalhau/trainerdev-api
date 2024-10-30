import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { FindUserByIdService } from '../find-user-by-id.service'

export function makeFindUserByIdService() {
  const userRepository = new PrismaUserRepository()
  const findUserByIdService = new FindUserByIdService(userRepository)
  return findUserByIdService
}
