import { makeUpdateTrackService } from '@/services/track/factories/make-update-track-service'
import { UpdateTrackController } from '../update-track.controller'

export function makeUpdateTrackController() {
  const updateTrackService = makeUpdateTrackService()
  const updateTrackController = new UpdateTrackController(updateTrackService)
  return updateTrackController
}
