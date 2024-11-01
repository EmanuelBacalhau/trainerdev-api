import type { DeleteMatriculationService } from '@/services/matriculation/delete-matriculation.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetMatriculationByIdRequestSchema } from '../schemas/MatriculationRequestSchema'

export class DeleteMatriculationController implements IController {
  constructor(
    private readonly deleteMatriculationService: DeleteMatriculationService
  ) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = GetMatriculationByIdRequestSchema.parse(req.params)

      await this.deleteMatriculationService.execute({ id })

      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}
