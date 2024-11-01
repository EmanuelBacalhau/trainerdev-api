import { makeFindAllMatriculationService } from '@/services/matriculation/factories/make-find-all-matriculation-service'
import { FindAllMatriculationController } from '../find-all-matriculation.controller'

export function makeFindAllMatriculationController() {
  const findAllMatriculationService = makeFindAllMatriculationService()
  const findAllMatriculationController = new FindAllMatriculationController(
    findAllMatriculationService
  )

  return findAllMatriculationController
}
