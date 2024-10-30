import { makeFindAllTrackService } from '@/services/track/factories/make-find-all-track-service'
import { FindAllTrackController } from '../find-all-track.controller'

export function makeFindAllTrackController() {
  const findAllTrackService = makeFindAllTrackService()
  const findAllTrackController = new FindAllTrackController(findAllTrackService)
  return findAllTrackController
}
