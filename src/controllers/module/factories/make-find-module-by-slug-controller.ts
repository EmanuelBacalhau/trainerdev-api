import { makeFindModuleBySlugService } from '@/services/module/factories/make-find-module-by-slug-service'
import { FindModuleBySlugController } from '../find-module-by-slug.controller'

export function makeFindModuleBySlugController() {
  const findModuleBySlugService = makeFindModuleBySlugService()
  const findModuleBySlugController = new FindModuleBySlugController(
    findModuleBySlugService
  )
  return findModuleBySlugController
}
