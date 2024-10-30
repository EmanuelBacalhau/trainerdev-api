import { AuthController } from './controllers/Auth.controller'
import { LessonController } from './controllers/Lesson.controller'
import { MatriculationController } from './controllers/Matriculation.controller'
import { ModuleController } from './controllers/Module.controller'
import { TrackController } from './controllers/Track.controller'
import { makeCreateUserController } from './controllers/user/factories/make-create-user-controller'
import { makeDeleteUserController } from './controllers/user/factories/make-delete-user-controller'
import { makeFindAllUserController } from './controllers/user/factories/make-find-all-user-controller'
import { makeFindUserByIdController } from './controllers/user/factories/make-find-user-by-id-controller'
import { makeGetUserDetailsController } from './controllers/user/factories/make-get-user-details-controller'
import { makeUpdateUserController } from './controllers/user/factories/make-update-user-controller'
import { PrismaLessonRepository } from './repositories/prisma/PrismaLesson.repository'
import { PrismaMatriculationRepository } from './repositories/prisma/PrismaMatriculation.repository'
import { PrismaModuleRepository } from './repositories/prisma/PrismaModule.repository'
import { PrismaTrackRepository } from './repositories/prisma/PrismaTrack.repository'
import { PrismaUserRepository } from './repositories/prisma/prisma-user.repository'
import { AuthUseCase } from './use-cases/Auth.use-case'
import { LessonUseCase } from './use-cases/Lesson.use-case'
import { MatriculationUseCase } from './use-cases/Matriculation.use-case'
import { ModuleUseCase } from './use-cases/Module.use-case'
import { TrackUseCase } from './use-cases/Track.use-case'

// User controllers
export const createUserController = makeCreateUserController()
export const updateUserController = makeUpdateUserController()
export const findAllUserController = makeFindAllUserController()
export const findUserByIdController = makeFindUserByIdController()
export const getUserByIdController = makeGetUserDetailsController()
export const deleteUserController = makeDeleteUserController()

const userRepository = new PrismaUserRepository()
const trackRepository = new PrismaTrackRepository()
const moduleRepository = new PrismaModuleRepository()
const lessonRepository = new PrismaLessonRepository()
const matriculationRepository = new PrismaMatriculationRepository()

const moduleUseCase = new ModuleUseCase(moduleRepository)
const trackUseCase = new TrackUseCase(trackRepository, moduleRepository)
const lessonUseCase = new LessonUseCase(lessonRepository)
const matriculationUseCase = new MatriculationUseCase(
  matriculationRepository,
  trackRepository,
  userRepository
)
const authUseCase = new AuthUseCase(userRepository)

export const trackController = new TrackController(trackUseCase)
export const matriculationController = new MatriculationController(
  matriculationUseCase
)
export const moduleController = new ModuleController(moduleUseCase)
export const lessonController = new LessonController(lessonUseCase)
export const authController = new AuthController(authUseCase)
