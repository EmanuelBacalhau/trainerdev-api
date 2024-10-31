import { PrismaLessonRepository } from '@/repositories/prisma/prisma-lesson.repository'
import { FindAllLessonService } from '../find-all-lesson.service'

export function makeFindAllLessonService() {
  const lessonRepository = new PrismaLessonRepository()
  const lessonService = new FindAllLessonService(lessonRepository)
  return lessonService
}
