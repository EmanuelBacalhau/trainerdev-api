import { makeUpdateModuleService } from '@/services/module/factories/make-update-module-service'
import { UpdateModuleController } from '../update-module.controller'

export function makeUpdateModuleController() {
  const updateModuleService = makeUpdateModuleService()
  const updateModuleController = new UpdateModuleController(updateModuleService)
  return updateModuleController
}
