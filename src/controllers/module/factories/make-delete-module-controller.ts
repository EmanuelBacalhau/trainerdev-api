import { makeDeleteModuleService } from '@/services/module/factories/make-delete-module-service'
import { DeleteModuleController } from '../delete-module.controller'

export function makeDeleteModuleController() {
  const deleteModuleService = makeDeleteModuleService()
  const deleteModuleController = new DeleteModuleController(deleteModuleService)
  return deleteModuleController
}
