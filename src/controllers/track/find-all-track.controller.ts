import type { FindAllTrackService } from '@/services/track/find-all-track.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { FindTracksRequestSchema } from '../schemas/track-request-schema'

export class FindAllTrackController implements IController {
  constructor(private readonly findAllTrackService: FindAllTrackService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = FindTracksRequestSchema.parse(req.query)
      const { tracks, meta } = await this.findAllTrackService.execute(query)

      res.json({ data: tracks, meta })
    } catch (error) {
      next(error)
    }
  }
}
