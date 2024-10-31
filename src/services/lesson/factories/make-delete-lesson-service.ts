import { PrismaLessonRepository } from '@/repositories/prisma/prisma-lesson.repository'
import { DeleteLessonService } from '../delete-lesson.service'

export function makeDeleteLessonService() {
  const lessonRepository = new PrismaLessonRepository()
  const lessonService = new DeleteLessonService(lessonRepository)
  return lessonService
}
