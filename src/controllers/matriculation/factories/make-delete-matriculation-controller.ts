import { makeDeleteMatriculationService } from '@/services/matriculation/factories/make-delete-matriculation-service'
import { DeleteMatriculationController } from '../delete-matriculation.controller'

export function makeDeleteMatriculationController() {
  const deleteMatriculationService = makeDeleteMatriculationService()
  const deleteMatriculationController = new DeleteMatriculationController(
    deleteMatriculationService
  )

  return deleteMatriculationController
}
