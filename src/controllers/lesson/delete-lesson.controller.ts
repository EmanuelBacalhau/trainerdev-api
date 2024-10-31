import type { DeleteLessonService } from '@/services/lesson/delete-lesson.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetLessonByIdParamsSchema } from '../schemas/lesson-request-schema'

export class DeleteLessonController implements IController {
  constructor(private readonly deleteLessonService: DeleteLessonService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = GetLessonByIdParamsSchema.parse(req.params)

      await this.deleteLessonService.execute({
        id,
      })

      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}
