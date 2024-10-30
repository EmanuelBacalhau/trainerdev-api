import { makeCreateTrackService } from '@/services/track/factories/make-create-track-service'
import { CreateTrackController } from '../create-track.controller'

export function makeCreateTrackController() {
  const createTrackService = makeCreateTrackService()
  const createTrackController = new CreateTrackController(createTrackService)
  return createTrackController
}
