import { makeFindAllLessonService } from '@/services/lesson/factories/make-find-all-lesson-service'
import { FindAllLessonController } from '../find-all-lesson.controller'

export function makeFindAllLessonController() {
  const lessonService = makeFindAllLessonService()
  const lessonController = new FindAllLessonController(lessonService)
  return lessonController
}
