import { PrismaLessonRepository } from '@/repositories/prisma/prisma-lesson.repository'
import { FindLessonByIdService } from '../find-lesson-by-id.service'

export function makeFindLessonByIdService() {
  const lessonRepository = new PrismaLessonRepository()
  const lessonService = new FindLessonByIdService(lessonRepository)
  return lessonService
}
