import { PrismaLessonRepository } from '@/repositories/prisma/prisma-lesson.repository'
import { PrismaModuleRepository } from '@/repositories/prisma/prisma-module.repository'
import { UpdateLessonService } from '../update-lesson.service'

export function makeUpdateLessonService() {
  const lessonRepository = new PrismaLessonRepository()
  const moduleRepository = new PrismaModuleRepository()

  const lessonService = new UpdateLessonService(
    lessonRepository,
    moduleRepository
  )
  return lessonService
}
