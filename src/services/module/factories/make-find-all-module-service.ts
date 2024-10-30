import { PrismaModuleRepository } from '@/repositories/prisma/prisma-module.repository'
import { FindAllModuleService } from '../find-all-module.service'

export function makeFindAllModuleService() {
  const moduleRepository = new PrismaModuleRepository()
  const findAllModuleService = new FindAllModuleService(moduleRepository)
  return findAllModuleService
}
