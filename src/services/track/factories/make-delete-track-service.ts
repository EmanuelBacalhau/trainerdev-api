import { PrismaTrackRepository } from '@/repositories/prisma/prisma-track.repository'
import { DeleteTrackService } from '../delete-track.service'

export function makeDeleteTrackService() {
  const trackRepository = new PrismaTrackRepository()
  const deleteTrackService = new DeleteTrackService(trackRepository)
  return deleteTrackService
}
