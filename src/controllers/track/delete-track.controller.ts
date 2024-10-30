import type { DeleteTrackService } from '@/services/track/delete-track.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetTrackByIdRequestSchema } from '../schemas/track-request-schema'

export class DeleteTrackController implements IController {
  constructor(private readonly deleteTrackService: DeleteTrackService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = GetTrackByIdRequestSchema.parse(req.params)
      await this.deleteTrackService.execute({
        id,
      })

      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}
