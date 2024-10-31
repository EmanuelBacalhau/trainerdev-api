import { makeDeleteLessonService } from '@/services/lesson/factories/make-delete-lesson-service'
import { DeleteLessonController } from '../delete-lesson.controller'

export function makeDeleteLessonController() {
  const lessonService = makeDeleteLessonService()
  const lessonController = new DeleteLessonController(lessonService)
  return lessonController
}
