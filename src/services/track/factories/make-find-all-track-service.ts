import { PrismaTrackRepository } from '@/repositories/prisma/prisma-track.repository'
import { FindAllTrackService } from '../find-all-track.service'

export function makeFindAllTrackService() {
  const trackRepository = new PrismaTrackRepository()
  const findAllTrackService = new FindAllTrackService(trackRepository)
  return findAllTrackService
}
