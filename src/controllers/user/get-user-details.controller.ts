import type { FindUserByIdService } from '@/services/user/find-user-by-id.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'

export class GetUserDetailsController implements IController {
  constructor(private readonly findUserByIdUseCase: FindUserByIdService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await this.findUserByIdUseCase.execute({
        id: req.user.id,
      })

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}
