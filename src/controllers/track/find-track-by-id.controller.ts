import type { FindTrackByIdService } from '@/services/track/find-track-by-id.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetTrackByIdRequestSchema } from '../schemas/track-request-schema'

export class FindTrackByIdController implements IController {
  constructor(private readonly findTrackByIdService: FindTrackByIdService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = GetTrackByIdRequestSchema.parse(req.params)

      const track = await this.findTrackByIdService.execute({
        id: params.id,
      })

      res.json(track)
    } catch (error) {
      next(error)
    }
  }
}
