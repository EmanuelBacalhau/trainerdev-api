import { PrismaModuleRepository } from '@/repositories/prisma/prisma-module.repository'
import { DeleteModuleService } from '../delete-module.service'

export function makeDeleteModuleService() {
  const moduleRepository = new PrismaModuleRepository()
  const deleteModuleService = new DeleteModuleService(moduleRepository)
  return deleteModuleService
}
