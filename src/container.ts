import { LessonController } from './controllers/Lesson.controller'
import { MatriculationController } from './controllers/Matriculation.controller'
import { ModuleController } from './controllers/Module.controller'
import { TrackController } from './controllers/Track.controller'
import { UserController } from './controllers/User.controller'
import { PrismaLessonRepository } from './repositories/prisma/PrismaLesson.repository'
import { PrismaMatriculationRepository } from './repositories/prisma/PrismaMatriculation.repository'
import { PrismaModuleRepository } from './repositories/prisma/PrismaModule.repository'
import { PrismaTrackRepository } from './repositories/prisma/PrismaTrack.repository'
import { PrismaUserRepository } from './repositories/prisma/PrismaUser.repository'
import { LessonUseCase } from './use-cases/Lesson.use-case'
import { MatriculationUseCase } from './use-cases/Matriculation.use-case'
import { ModuleUseCase } from './use-cases/Module.use-case'
import { TrackUseCase } from './use-cases/Track.use-case'
import { UserUseCase } from './use-cases/User.use-case'

const userRepository = new PrismaUserRepository()
const trackRepository = new PrismaTrackRepository()
const moduleRepository = new PrismaModuleRepository()
const lessonRepository = new PrismaLessonRepository()
const matriculationRepository = new PrismaMatriculationRepository()

const userUseCase = new UserUseCase(userRepository)
const trackUseCase = new TrackUseCase(trackRepository)
const moduleUseCase = new ModuleUseCase(moduleRepository)
const lessonUseCase = new LessonUseCase(lessonRepository)
const matriculationUseCase = new MatriculationUseCase(
  matriculationRepository,
  trackRepository,
  userRepository
)

export const userController = new UserController(userUseCase)
export const trackController = new TrackController(trackUseCase)
export const matriculationController = new MatriculationController(
  matriculationUseCase
)
export const moduleController = new ModuleController(moduleUseCase)
export const lessonController = new LessonController(lessonUseCase)
