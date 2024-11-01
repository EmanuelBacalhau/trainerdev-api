import { makeCreateMatriculationService } from '@/services/matriculation/factories/make-create-matriculation-service'
import { CreateMatriculationController } from '../create-matriculation.controller'

export function makeCreateMatriculationController() {
  const createMatriculationService = makeCreateMatriculationService()
  const createMatriculationController = new CreateMatriculationController(
    createMatriculationService
  )

  return createMatriculationController
}
