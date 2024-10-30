import { HttpError } from '@/errors/HttpError'
import type { CreateTrackService } from '@/services/track/create-track.service'
import { removeFile } from '@/utils/remove-file'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { CreateTrackRequestSchema } from '../schemas/track-request-schema'

export class CreateTrackController implements IController {
  constructor(private readonly createTrackService: CreateTrackService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = CreateTrackRequestSchema.parse(req.body)

      if (req.file === undefined) {
        throw new HttpError('Cover image is required', 400)
      }

      const coverUrl = req.file.filename

      const track = await this.createTrackService.execute({
        attributes: {
          ...body,
          coverUrl,
        },
      })

      res.status(201).json(track)
    } catch (error) {
      if (req.file) {
        removeFile('tracks', req.file.filename)
      }

      next(error)
    }
  }
}
