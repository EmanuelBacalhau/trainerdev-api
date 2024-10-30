import type { DeleteModuleService } from '@/services/module/delete-module.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetModuleByIdParamsSchema } from '../schemas/ModuleRequestSchema'

export class DeleteModuleController implements IController {
  constructor(private readonly deleteModuleService: DeleteModuleService) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = GetModuleByIdParamsSchema.parse(request.params)
      await this.deleteModuleService.execute({ id })

      response.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}
