import type { UpdateLessonService } from '@/services/lesson/update-lesson.service'
import { removeFile } from '@/utils/remove-file'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import {
  GetLessonByIdParamsSchema,
  UpdateLessonAttributesSchema,
} from '../schemas/lesson-request-schema'

export class UpdateLessonController implements IController {
  constructor(private readonly updateLessonService: UpdateLessonService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = UpdateLessonAttributesSchema.parse(req.body)
      const { id } = GetLessonByIdParamsSchema.parse(req.params)

      let videoUrl: string | undefined

      if (req.file) {
        videoUrl = req.file.filename
      }

      const lesson = await this.updateLessonService.execute({
        id,
        attributes: { ...body, videoUrl },
      })

      res.json(lesson)
    } catch (error) {
      if (req.file) {
        removeFile('lessons', req.file.filename)
      }
      next(error)
    }
  }
}
