import { HttpError } from '@/errors/HttpError'
import type { CreateLessonService } from '@/services/lesson/create-lesson.service'
import { removeFile } from '@/utils/remove-file'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { CreateLessonAttributesSchema } from '../schemas/lesson-request-schema'

export class CreateLessonController implements IController {
  constructor(private readonly createLessonService: CreateLessonService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = CreateLessonAttributesSchema.parse(req.body)

      if (!req.file) {
        throw new HttpError('Video is require', 400)
      }

      const videoUrl = req.file.filename

      const lesson = await this.createLessonService.execute({
        attributes: {
          ...body,
          videoUrl,
        },
      })

      res.status(201).json(lesson)
    } catch (error) {
      if (req.file) {
        removeFile('lessons', req.file.filename)
      }
      next(error)
    }
  }
}
