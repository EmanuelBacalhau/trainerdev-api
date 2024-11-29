import type { AuthenticateService } from '@/services/auth/authenticate.service'
import type { NextFunction, Request, Response } from 'express'
import type { IController } from '../controller.interface'
import { AuthRequestSchema } from '../schemas/auth-request-schema'

export class AuthenticateController implements IController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = AuthRequestSchema.parse(req.body)
      const { token } = await this.authenticateService.execute(body)

      res.status(200).json({ token })
    } catch (error) {
      next(error)
    }
  }
}
