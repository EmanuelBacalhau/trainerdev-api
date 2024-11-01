import type { UpdateMatriculationService } from '@/services/matriculation/update-matriculation.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import {
  GetMatriculationByIdRequestSchema,
  UpdateMatriculationRequestSchema,
} from '../schemas/MatriculationRequestSchema'

export class UpdateMatriculationController implements IController {
  constructor(
    private readonly updateMatriculationService: UpdateMatriculationService
  ) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = GetMatriculationByIdRequestSchema.parse(req.params)
      const body = UpdateMatriculationRequestSchema.parse(req.body)

      const matriculation = await this.updateMatriculationService.execute({
        id,
        attributes: body,
      })

      res.status(200).json(matriculation)
    } catch (error) {
      next(error)
    }
  }
}
