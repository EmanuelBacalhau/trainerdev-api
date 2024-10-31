import { PrismaLessonRepository } from '@/repositories/prisma/prisma-lesson.repository'
import { LessonUseCase } from '@/use-cases/Lesson.use-case'

export function makeFindLessonById() {
  const lessonRepository = new PrismaLessonRepository()
  const lessonUseCase = new LessonUseCase(lessonRepository)
  return lessonUseCase
}
