import type { FindAllLessonService } from '@/services/lesson/find-all-lesson.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { FindLessonRequestSchema } from '../schemas/lesson-request-schema'

export class FindAllLessonController implements IController {
  constructor(private readonly findAllLessonService: FindAllLessonService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = FindLessonRequestSchema.parse(req.query)
      const { lessons, meta } = await this.findAllLessonService.execute(query)

      res.json({
        lessons,
        meta,
      })
    } catch (error) {
      next(error)
    }
  }
}
