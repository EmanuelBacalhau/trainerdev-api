import { PrismaTrackRepository } from '@/repositories/prisma/prisma-track.repository'
import { FindTrackByIdService } from '../find-track-by-id.service'

export function makeFindTrackByIdService() {
  const trackRepository = new PrismaTrackRepository()
  const trackByIdService = new FindTrackByIdService(trackRepository)
  return trackByIdService
}
