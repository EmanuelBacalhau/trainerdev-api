import { HttpError } from '@/errors/HttpError'
import type { CreateModuleService } from '@/services/module/create-module.service'
import { removeFile } from '@/utils/remove-file'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { CreateModuleAttributesSchema } from '../schemas/ModuleRequestSchema'

export class CreateModuleController implements IController {
  constructor(private readonly createModuleService: CreateModuleService) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = CreateModuleAttributesSchema.parse(request.body)

      if (!request.file) {
        throw new HttpError('Cover image is required', 400)
      }

      const coverUrl = request.file.filename

      const module = await this.createModuleService.execute({
        ...body,
        coverUrl,
      })

      response.status(201).json(module)
    } catch (error) {
      if (request.file) {
        removeFile('modules', request.file.path)
      }
      next(error)
    }
  }
}
