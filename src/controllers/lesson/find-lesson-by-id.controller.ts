import type { FindLessonByIdService } from '@/services/lesson/find-lesson-by-id.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetLessonByIdParamsSchema } from '../schemas/lesson-request-schema'

export class FindLessonByIdController implements IController {
  constructor(private readonly findLessonByIdService: FindLessonByIdService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = GetLessonByIdParamsSchema.parse(req.params)

      const lesson = await this.findLessonByIdService.execute({
        id,
      })

      res.json(lesson)
    } catch (error) {
      next(error)
    }
  }
}
