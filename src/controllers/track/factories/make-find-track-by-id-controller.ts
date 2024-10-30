import { makeFindTrackByIdService } from '@/services/track/factories/make-track-by-id-service'
import { FindTrackByIdController } from '../find-track-by-id.controller'

export function makeFindTrackByIdController() {
  const findTrackByIdService = makeFindTrackByIdService()
  const findTrackByIdController = new FindTrackByIdController(
    findTrackByIdService
  )
  return findTrackByIdController
}
