import { PrismaLessonRepository } from '@/repositories/prisma/prisma-lesson.repository'
import { LessonUseCase } from '@/use-cases/Lesson.use-case'
import { UpdateLessonService } from '../update-lesson.service'

export function makeUpdateLessonService() {
  const lessonRepository = new PrismaLessonRepository()
  const lessonService = new UpdateLessonService(lessonRepository)
  return lessonService
}
