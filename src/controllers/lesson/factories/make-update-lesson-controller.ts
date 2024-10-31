import { makeUpdateLessonService } from '@/services/lesson/factories/update-lesson-service'
import { UpdateLessonController } from '../update-lesson.controller'

export function makeUpdateLessonController() {
  const lessonService = makeUpdateLessonService()
  const lessonController = new UpdateLessonController(lessonService)
  return lessonController
}
