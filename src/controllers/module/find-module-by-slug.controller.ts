import type { FindModuleBySlugService } from '@/services/module/find-module-by-slug.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetModuleBySlugParamsSchema } from '../schemas/ModuleRequestSchema'

export class FindModuleBySlugController implements IController {
  constructor(
    private readonly findModuleBySlugService: FindModuleBySlugService
  ) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = GetModuleBySlugParamsSchema.parse(request.params)
      const module = await this.findModuleBySlugService.execute({ slug })

      response.json(module)
    } catch (error) {
      next(error)
    }
  }
}
