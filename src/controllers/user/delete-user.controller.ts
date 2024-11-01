import type { DeleteUserService } from '@/services/user/delete-user.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { GetUserIdRequestSchema } from '../schemas/user-request-schema'

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = GetUserIdRequestSchema.parse(req.params)
      await this.deleteUserService.execute({
        id: params.id,
      })

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
