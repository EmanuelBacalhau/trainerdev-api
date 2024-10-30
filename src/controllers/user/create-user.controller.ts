import type { CreateUserService } from '@/services/user/create-user.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { CreateUserRequestSchema } from '../schemas/UserRequestSchema'

export class CreateUserController implements IController {
  constructor(private readonly createUserService: CreateUserService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = CreateUserRequestSchema.parse(req.body)
      const user = await this.createUserService.execute({
        attributes: body,
      })

      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
}
