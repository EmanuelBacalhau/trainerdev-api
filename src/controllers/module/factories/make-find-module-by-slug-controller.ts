import { makeFindModuleByIdService } from '@/services/module/factories/make-find-module-by-id-service'
import { FindModuleByIdController } from '../find-module-by-id.controller'

export function makeFindModuleBySlugController() {
  const findModuleByIdService = makeFindModuleByIdService()
  const findModuleByIdController = new FindModuleByIdController(
    findModuleByIdService
  )
  return findModuleByIdController
}
