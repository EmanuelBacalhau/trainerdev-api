import { makeFindAllModuleService } from '@/services/module/factories/make-find-all-module-service'
import { FindAllModuleController } from '../find-all-module.controller'

export function makeFindAllModuleController() {
  const findAllModuleService = makeFindAllModuleService()
  const findAllModuleController = new FindAllModuleController(
    findAllModuleService
  )
  return findAllModuleController
}
