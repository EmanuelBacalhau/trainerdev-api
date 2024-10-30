import { PrismaModuleRepository } from '@/repositories/prisma/prisma-module.repository'
import { FindModuleByIdService } from '../find-module-by-id.service'

export function makeFindModuleByIdService() {
  const moduleRepository = new PrismaModuleRepository()
  const findModuleByIdService = new FindModuleByIdService(moduleRepository)
  return findModuleByIdService
}
