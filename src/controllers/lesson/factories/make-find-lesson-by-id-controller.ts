import { makeFindLessonByIdService } from '@/services/lesson/factories/make-find-lesson-by-id-service'
import { FindLessonByIdController } from '../find-lesson-by-id.controller'

export function makeFindLessonByIdController() {
  const lessonService = makeFindLessonByIdService()
  const lessonController = new FindLessonByIdController(lessonService)
  return lessonController
}
