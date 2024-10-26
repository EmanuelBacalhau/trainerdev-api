import { ModuleController } from './controllers/Module.controller'
import { TrackController } from './controllers/Track.controller'
import { UserController } from './controllers/User.controller'
import { PrismaModuleRepository } from './repositories/prisma/PrismaModule.repository'
import { PrismaTrackRepository } from './repositories/prisma/PrismaTrack.repository'
import { PrismaUserRepository } from './repositories/prisma/PrismaUser.repository'
import { ModuleUseCase } from './use-cases/Module.use-case'
import { TrackUseCase } from './use-cases/Track.use-case'
import { UserUseCase } from './use-cases/User.use-case'

const userRepository = new PrismaUserRepository()
const userUseCase = new UserUseCase(userRepository)
export const userController = new UserController(userUseCase)

const trackRepository = new PrismaTrackRepository()
const trackUseCase = new TrackUseCase(trackRepository)
export const trackController = new TrackController(trackUseCase)

const moduleRepository = new PrismaModuleRepository()
const moduleUseCase = new ModuleUseCase(moduleRepository)
export const moduleController = new ModuleController(moduleUseCase)
