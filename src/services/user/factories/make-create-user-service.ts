import { PrismaUserRepository } from '@/repositories/prisma/PrismaUser.repository'
import { CreateUserService } from '../create-user.service'

export function makeCreateUserService() {
  const userRepository = new PrismaUserRepository()
  const createUserService = new CreateUserService(userRepository)
  return createUserService
}
