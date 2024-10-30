import type { UpdateModuleService } from '@/services/module/update-module.service'
import { removeFile } from '@/utils/remove-file'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import {
  GetModuleByIdParamsSchema,
  UpdateModuleAttributesSchema,
} from '../schemas/ModuleRequestSchema'

export class UpdateModuleController implements IController {
  constructor(private readonly updateModuleService: UpdateModuleService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = GetModuleByIdParamsSchema.parse(req.params)
      const body = UpdateModuleAttributesSchema.parse(req.body)

      let coverUrl: string | undefined

      if (req.file) {
        coverUrl = req.file.filename
      }

      const module = await this.updateModuleService.execute({
        id: id,
        attributes: {
          ...body,
          coverUrl,
        },
      })

      res.status(200).json(module)
    } catch (error) {
      if (req.file) {
        removeFile('modules', req.file.path)
      }
      next(error)
    }
  }
}
