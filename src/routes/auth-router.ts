import { makeAuthenticateController } from '@/controllers/auth/factories/make-authenticate-controller'
import { Router } from 'express'

export const authRouter = Router()

const authenticateController = makeAuthenticateController()

authRouter.post(
  '/session',
  authenticateController.execute.bind(authenticateController)
)
