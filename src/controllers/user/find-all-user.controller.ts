import type { FindAllUserService } from '@/services/user/find-all-user.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { FindUsersRequestSchema } from '../schemas/UserRequestSchema'

export class FindAllUserController implements IController {
  constructor(private readonly findAllUserService: FindAllUserService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = FindUsersRequestSchema.parse(req.query)
      const { users, meta } = await this.findAllUserService.execute(query)

      res.status(200).json({ users, meta })
    } catch (error) {
      next(error)
    }
  }
}
