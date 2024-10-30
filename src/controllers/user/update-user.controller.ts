import type { UpdateUserServices } from '@/services/user/update-user.service'
import { removeFile } from '@/utils/remove-file'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import {
  GetUserIdRequestSchema,
  UpdateUserRequestSchema,
} from '../schemas/UserRequestSchema'

export class UpdateUserController implements IController {
  constructor(private readonly updateUserService: UpdateUserServices) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = UpdateUserRequestSchema.parse(req.body)
      const params = GetUserIdRequestSchema.parse(req.params)
      const avatar = req.file

      const user = await this.updateUserService.execute({
        id: params.id,
        attributes: {
          ...body,
          avatar: avatar?.filename,
        },
      })

      res.status(200).json(user)
    } catch (error) {
      if (req.file) {
        removeFile('users', req.file.filename)
      }
      next(error)
    }
  }
}
