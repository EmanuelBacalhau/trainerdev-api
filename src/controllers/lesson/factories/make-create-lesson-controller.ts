import { makeCreateLessonService } from '@/services/lesson/factories/make-create-lesson-service'
import { CreateLessonController } from '../create-lesson.controller'

export function makeCreateLessonController() {
  const lessonService = makeCreateLessonService()
  const lessonController = new CreateLessonController(lessonService)
  return lessonController
}
