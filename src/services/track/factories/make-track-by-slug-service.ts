import { PrismaTrackRepository } from '@/repositories/prisma/prisma-track.repository'
import { FindTrackBySlugService } from '../find-track-by-slug.service'

export function makeFindTrackBySlugService() {
  const trackRepository = new PrismaTrackRepository()
  const trackBySlugService = new FindTrackBySlugService(trackRepository)
  return trackBySlugService
}
