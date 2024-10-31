import { PrismaLessonRepository } from '@/repositories/prisma/prisma-lesson.repository'
import { FindLessonBySlugService } from '../find-lesson-by-slug.service'

export function makeFindLessonBySlugService() {
  const lessonRepository = new PrismaLessonRepository()
  const lessonService = new FindLessonBySlugService(lessonRepository)
  return lessonService
}
