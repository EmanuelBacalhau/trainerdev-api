import { makeCreateModuleService } from '@/services/module/factories/make-create-module-service'
import { CreateModuleController } from '../create-module.controller'

export function makeCreateModuleController() {
  const createModuleService = makeCreateModuleService()
  const createModuleController = new CreateModuleController(createModuleService)
  return createModuleController
}
