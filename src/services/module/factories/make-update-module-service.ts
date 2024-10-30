import { PrismaModuleRepository } from '@/repositories/prisma/prisma-module.repository'
import { UpdateModuleService } from '../update-module.service'

export function maleUpdateModuleService() {
  const moduleRepository = new PrismaModuleRepository()
  const updateModuleService = new UpdateModuleService(moduleRepository)

  return updateModuleService
}
