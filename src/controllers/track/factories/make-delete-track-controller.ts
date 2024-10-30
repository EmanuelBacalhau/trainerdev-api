import { makeDeleteTrackService } from '@/services/track/factories/make-delete-track-service'
import { DeleteTrackController } from '../delete-track.controller'

export function makeDeleteTrackController() {
  const deleteTrackService = makeDeleteTrackService()
  const deleteTrackController = new DeleteTrackController(deleteTrackService)
  return deleteTrackController
}
