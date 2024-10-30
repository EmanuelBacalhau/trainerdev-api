import { PrismaModuleRepository } from '@/repositories/prisma/prisma-module.repository'
import { CreateModuleService } from '../create-module.service'

export function makeCreateModuleService() {
  const moduleRepository = new PrismaModuleRepository()
  const createModuleService = new CreateModuleService(moduleRepository)
  return createModuleService
}
