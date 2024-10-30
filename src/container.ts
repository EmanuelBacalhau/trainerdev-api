import { AuthController } from './controllers/Auth.controller'
import { LessonController } from './controllers/Lesson.controller'
import { MatriculationController } from './controllers/Matriculation.controller'
import { ModuleController } from './controllers/Module.controller'
import { makeCreateModuleController } from './controllers/module/factories/make-create-module-controller'
import { makeDeleteModuleController } from './controllers/module/factories/make-delete-module-controller'
import { makeFindAllModuleController } from './controllers/module/factories/make-find-all-module-controller'
import { makeFindModuleByIdController } from './controllers/module/factories/make-find-module-by-id-controller'
import { makeFindModuleBySlugController } from './controllers/module/factories/make-find-module-by-slug-controller'
import { makeUpdateModuleController } from './controllers/module/factories/make-update-module-controller'
import { makeCreateTrackController } from './controllers/track/factories/make-create-track-controller'
import { makeDeleteTrackController } from './controllers/track/factories/make-delete-track-controller'
import { makeFindAllTrackController } from './controllers/track/factories/make-find-all-track-controller'
import { makeFindTrackByIdController } from './controllers/track/factories/make-find-track-by-id-controller'
import { makeFindTrackBySlugController } from './controllers/track/factories/make-find-track-by-slug-controller'
import { makeRemoveModuleFromTrackController } from './controllers/track/factories/make-remove-module-from-track-controller'
import { makeUpdateTrackController } from './controllers/track/factories/make-update-track-controller'
import { makeCreateUserController } from './controllers/user/factories/make-create-user-controller'
import { makeDeleteUserController } from './controllers/user/factories/make-delete-user-controller'
import { makeFindAllUserController } from './controllers/user/factories/make-find-all-user-controller'
import { makeFindUserByIdController } from './controllers/user/factories/make-find-user-by-id-controller'
import { makeGetUserDetailsController } from './controllers/user/factories/make-get-user-details-controller'
import { makeUpdateUserController } from './controllers/user/factories/make-update-user-controller'
import { PrismaLessonRepository } from './repositories/prisma/PrismaLesson.repository'
import { PrismaMatriculationRepository } from './repositories/prisma/PrismaMatriculation.repository'
import { PrismaModuleRepository } from './repositories/prisma/prisma-module.repository'
import { PrismaTrackRepository } from './repositories/prisma/prisma-track.repository'
import { PrismaUserRepository } from './repositories/prisma/prisma-user.repository'
import { AuthUseCase } from './use-cases/Auth.use-case'
import { LessonUseCase } from './use-cases/Lesson.use-case'
import { MatriculationUseCase } from './use-cases/Matriculation.use-case'
import { ModuleUseCase } from './use-cases/Module.use-case'

// User controllers
export const createUserController = makeCreateUserController()
export const updateUserController = makeUpdateUserController()
export const findAllUserController = makeFindAllUserController()
export const findUserByIdController = makeFindUserByIdController()
export const getUserByIdController = makeGetUserDetailsController()
export const deleteUserController = makeDeleteUserController()

// Track controllers
export const createTrackController = makeCreateTrackController()
export const updateTrackController = makeUpdateTrackController()
export const findAllTrackController = makeFindAllTrackController()
export const findTrackByIdController = makeFindTrackByIdController()
export const findTrackBySlugController = makeFindTrackBySlugController()
export const removeModuleFromTrackController =
  makeRemoveModuleFromTrackController()
export const deleteTrackController = makeDeleteTrackController()

// Module controllers
export const createModuleController = makeCreateModuleController()
export const updateModuleController = makeUpdateModuleController()
export const deleteModuleController = makeDeleteModuleController()
export const findAllModuleController = makeFindAllModuleController()
export const findModuleByIdController = makeFindModuleByIdController()
export const findModuleBySlugController = makeFindModuleBySlugController()

const userRepository = new PrismaUserRepository()
const trackRepository = new PrismaTrackRepository()
const moduleRepository = new PrismaModuleRepository()
const lessonRepository = new PrismaLessonRepository()
const matriculationRepository = new PrismaMatriculationRepository()

const moduleUseCase = new ModuleUseCase(moduleRepository)
const lessonUseCase = new LessonUseCase(lessonRepository)
const matriculationUseCase = new MatriculationUseCase(
  matriculationRepository,
  trackRepository,
  userRepository
)
const authUseCase = new AuthUseCase(userRepository)

export const matriculationController = new MatriculationController(
  matriculationUseCase
)
export const lessonController = new LessonController(lessonUseCase)
export const authController = new AuthController(authUseCase)
