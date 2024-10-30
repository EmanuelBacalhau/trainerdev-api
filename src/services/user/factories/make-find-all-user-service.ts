import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { FindAllUserService } from '../find-all-user.service'

export function makeFindAllUserService() {
  const userRepository = new PrismaUserRepository()
  const findAllUserService = new FindAllUserService(userRepository)
  return findAllUserService
}
