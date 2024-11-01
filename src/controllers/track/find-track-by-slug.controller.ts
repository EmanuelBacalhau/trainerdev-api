import type { FindTrackBySlugService } from '@/services/track/find-track-by-slug.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetTrackBySlugRequestSchema } from '../schemas/track-request-schema'

export class FindTrackBySlugController implements IController {
  constructor(
    private readonly findTrackBySlugService: FindTrackBySlugService
  ) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = GetTrackBySlugRequestSchema.parse(req.params)

      const track = await this.findTrackBySlugService.execute(params)

      res.json(track)
    } catch (error) {
      next(error)
    }
  }
}
