import type { CreateMatriculationService } from '@/services/matriculation/create-matriculation.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { CreateMatriculationRequestSchema } from '../schemas/MatriculationRequestSchema'

export class CreateMatriculationController implements IController {
  constructor(
    private readonly createMatriculationUseCase: CreateMatriculationService
  ) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = CreateMatriculationRequestSchema.parse(req.body)
      const matriculation = await this.createMatriculationUseCase.execute({
        attributes: body,
      })

      res.json(matriculation)
    } catch (error) {
      next(error)
    }
  }
}
