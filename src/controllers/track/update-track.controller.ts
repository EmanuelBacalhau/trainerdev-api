import type { UpdateTrackService } from '@/services/track/update-track.service'
import { removeFile } from '@/utils/remove-file'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import {
  GetTrackByIdRequestSchema,
  UpdateTrackRequestSchema,
} from '../schemas/track-request-schema'

export class UpdateTrackController implements IController {
  constructor(private readonly updateTrackService: UpdateTrackService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = GetTrackByIdRequestSchema.parse(req.params)
      const body = UpdateTrackRequestSchema.parse(req.body)

      let coverUrl: string | undefined

      if (req.file) {
        coverUrl = req.file.filename
      }

      const track = await this.updateTrackService.execute({
        id,
        attributes: {
          ...body,
          coverUrl,
        },
      })

      res.status(200).json(track)
    } catch (error) {
      if (req.file) {
        removeFile('tracks', req.file.filename)
      }
      next(error)
    }
  }
}
