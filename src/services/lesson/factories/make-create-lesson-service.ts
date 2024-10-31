import { PrismaLessonRepository } from '@/repositories/prisma/prisma-lesson.repository'
import { CreateLessonService } from '../create-lesson.service'

export function makeCreateLessonService() {
  const lessonRepository = new PrismaLessonRepository()
  const lessonUseCase = new CreateLessonService(lessonRepository)
  return lessonUseCase
}
