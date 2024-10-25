import { UserController } from './controllers/User.controller'
import { PrismaUserRepository } from './repositories/prisma/PrismaUser.repository'
import { UserUseCase } from './use-cases/User.use-case'

const userRepository = new PrismaUserRepository()
const userUseCase = new UserUseCase(userRepository)
export const userController = new UserController(userUseCase)
