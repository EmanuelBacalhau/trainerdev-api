import { makeFindLessonBySlugService } from '@/services/lesson/factories/make-find-lesson-by-slug-service'
import { FindLessonBySlugController } from '../find-lesson-by-slug.controller'

export function makeFindLessonBySlugController() {
  const lessonService = makeFindLessonBySlugService()
  const lessonController = new FindLessonBySlugController(lessonService)
  return lessonController
}
