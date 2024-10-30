import { PrismaModuleRepository } from '@/repositories/prisma/prisma-module.repository'
import { PrismaTrackRepository } from '@/repositories/prisma/prisma-track.repository'
import { UpdateTrackService } from '../update-track.service'

export function makeUpdateTrackService() {
  const trackRepository = new PrismaTrackRepository()
  const moduleRepository = new PrismaModuleRepository()
  const updateTrackService = new UpdateTrackService(
    trackRepository,
    moduleRepository
  )
  return updateTrackService
}
