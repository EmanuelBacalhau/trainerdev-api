import type { FindAllMatriculationService } from '@/services/matriculation/find-all-matriculation.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetMatriculationRequestSchema } from '../schemas/MatriculationRequestSchema'

export class FindAllMatriculationController implements IController {
  constructor(
    private readonly findAllMatriculationService: FindAllMatriculationService
  ) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = GetMatriculationRequestSchema.parse(req.query)
      const { matriculations, meta } =
        await this.findAllMatriculationService.execute(query)

      res.json({ matriculations, meta })
    } catch (error) {
      next(error)
    }
  }
}
