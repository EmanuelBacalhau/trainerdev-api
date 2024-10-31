import type { FindLessonBySlugService } from '@/services/lesson/find-lesson-by-slug.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetLessonBySlugRequestSchema } from '../schemas/lesson-request-schema'

export class FindLessonBySlugController implements IController {
  constructor(
    private readonly findLessonBySlugService: FindLessonBySlugService
  ) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = GetLessonBySlugRequestSchema.parse(req.params)

      const lesson = await this.findLessonBySlugService.execute({ slug })

      res.json(lesson)
    } catch (error) {
      next(error)
    }
  }
}
