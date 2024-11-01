import { makeUpdateMatriculationService } from '@/services/matriculation/factories/make-update-matriculation-service'
import { UpdateMatriculationController } from '../update-matriculation.controller'

export function makeUpdateMatriculationController() {
  const updateMatriculationService = makeUpdateMatriculationService()
  const updateMatriculationController = new UpdateMatriculationController(
    updateMatriculationService
  )

  return updateMatriculationController
}
