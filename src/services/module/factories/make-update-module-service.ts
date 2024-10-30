import { PrismaModuleRepository } from '@/repositories/prisma/prisma-module.repository'
import { UpdateModuleService } from '../update-module.service'

export function makeUpdateModuleService() {
  const moduleRepository = new PrismaModuleRepository()
  const updateModuleService = new UpdateModuleService(moduleRepository)

  return updateModuleService
}
