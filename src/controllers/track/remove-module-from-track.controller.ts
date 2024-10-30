import type { RemoveModuleFromTrackService } from '@/services/track/remove-module-from-track.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import {
  GetModuleIdInTrackRequestSchema,
  GetTrackByIdRequestSchema,
} from '../schemas/track-request-schema'

export class RemoveModuleFromTrackController implements IController {
  constructor(
    private readonly removeModuleFromTrackService: RemoveModuleFromTrackService
  ) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { moduleId } = GetModuleIdInTrackRequestSchema.parse(req.params)
      const { id: trackId } = GetTrackByIdRequestSchema.parse(req.params)

      await this.removeModuleFromTrackService.execute({ trackId, moduleId })

      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}
