import type { FindModuleByIdService } from '@/services/module/find-module-by-id.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetModuleByIdParamsSchema } from '../schemas/ModuleRequestSchema'

export class FindModuleByIdController implements IController {
  constructor(private readonly findModuleByIdService: FindModuleByIdService) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = GetModuleByIdParamsSchema.parse(request.params)
      const module = await this.findModuleByIdService.execute({ id })

      response.json(module)
    } catch (error) {
      next(error)
    }
  }
}
