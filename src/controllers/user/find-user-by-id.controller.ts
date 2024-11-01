import type { FindUserByIdService } from '@/services/user/find-user-by-id.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetUserIdRequestSchema } from '../schemas/user-request-schema'

export class FindUserByIdController implements IController {
  constructor(private readonly findUserByIdService: FindUserByIdService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = GetUserIdRequestSchema.parse(req.params)
      const user = await this.findUserByIdService.execute({
        id: params.id,
      })

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}
