import { PrismaModuleRepository } from '@/repositories/prisma/prisma-module.repository'
import { FindModuleBySlugService } from '../find-module-by-slug.service'

export function makeFindModuleBySlugService() {
  const moduleRepository = new PrismaModuleRepository()
  const findModuleBySlugService = new FindModuleBySlugService(moduleRepository)
  return findModuleBySlugService
}
