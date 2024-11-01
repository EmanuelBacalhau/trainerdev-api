import { PrismaLessonRepository } from '@/repositories/prisma/prisma-lesson.repository'
import { PrismaModuleRepository } from '@/repositories/prisma/prisma-module.repository'
import { CreateLessonService } from '../create-lesson.service'

export function makeCreateLessonService() {
  const lessonRepository = new PrismaLessonRepository()
  const moduleRepository = new PrismaModuleRepository()
  const lessonUseCase = new CreateLessonService(
    lessonRepository,
    moduleRepository
  )
  return lessonUseCase
}
