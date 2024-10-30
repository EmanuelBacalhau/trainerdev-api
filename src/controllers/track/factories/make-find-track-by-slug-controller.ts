import { makeFindTrackBySlugService } from '@/services/track/factories/make-track-by-slug-service'
import { FindTrackBySlugController } from '../find-track-by-slug.controller'

export function makeFindTrackBySlugController() {
  const findTrackByIdService = makeFindTrackBySlugService()
  const findTrackByIdController = new FindTrackBySlugController(
    findTrackByIdService
  )
  return findTrackByIdController
}
