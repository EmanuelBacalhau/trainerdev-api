import type { FindAllModuleService } from '@/services/module/find-all-module.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { FindModulesParamsSchema } from '../schemas/ModuleRequestSchema'

export class FindAllModuleController implements IController {
  constructor(private readonly findAllModuleService: FindAllModuleService) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = FindModulesParamsSchema.parse(request.query)
      const { modules, meta } = await this.findAllModuleService.execute(query)

      response.json({
        modules,
        meta,
      })
    } catch (error) {
      next(error)
    }
  }
}
