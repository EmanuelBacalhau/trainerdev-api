import type { Handler } from 'express'
import type { AuthUseCase } from '../use-cases/Auth.use-case'
import { AuthRequestSchema } from './schemas/AuthRequestSchema'

export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  execute: Handler = async (request, response, next) => {
    try {
      const body = AuthRequestSchema.parse(request.body)
      const token = await this.authUseCase.execute(body)

      response.status(200).json({ token })
    } catch (error) {
      next(error)
    }
  }
}
