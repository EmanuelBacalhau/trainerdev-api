import { makeAuthenticateService } from '@/services/auth/factories/make-authenticate-service'
import { AuthenticateController } from '../authenticate.controller'

export function makeAuthenticateController() {
  const authenticateService = makeAuthenticateService()
  const authenticateController = new AuthenticateController(authenticateService)
  return authenticateController
}
